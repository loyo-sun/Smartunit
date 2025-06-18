document.addEventListener('DOMContentLoaded', function() {
    // 抽屉相关元素
    const detailDrawer = document.querySelector('.detail-drawer');
    const drawerMask = document.querySelector('.drawer-mask');
    const closeButtons = document.querySelectorAll('.btn-close');
    const cancelButtons = document.querySelectorAll('.drawer-footer .btn-default');

    // 主TAB元素
    const mainTabBtns = document.querySelectorAll('.main-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 车辆筛选元素
    const vehicleTimeRange = document.getElementById('vehicleTimeRange');
    const vehicleStartMonth = document.getElementById('vehicleStartMonth');
    const vehicleEndMonth = document.getElementById('vehicleEndMonth');
    const vehicleFilter = document.getElementById('vehicleFilter');
    const vehicleResetBtn = document.getElementById('vehicleResetBtn');
    const vehicleExportBtn = document.getElementById('vehicleExportBtn');

    // 司机筛选元素
    const driverTimeRange = document.getElementById('driverTimeRange');
    const driverStartMonth = document.getElementById('driverStartMonth');
    const driverEndMonth = document.getElementById('driverEndMonth');
    const driverFilter = document.getElementById('driverFilter');
    const driverResetBtn = document.getElementById('driverResetBtn');
    const driverExportBtn = document.getElementById('driverExportBtn');

    // 演示数据
    const demoData = {
        vehicles: [
            {
                id: '京A12345',
                monthlyVolume: [3200, 2800, 3500, 3100, 3400, 3200],
                status: 'working',
                statusText: '执行中'
            },
            {
                id: '京B67890',
                monthlyVolume: [2800, 2600, 3000, 2900, 3200, 2800],
                status: 'working',
                statusText: '执行中'
            },
            {
                id: '京C12345',
                monthlyVolume: [2400, 2200, 2600, 2500, 2800, 2400],
                status: 'free',
                statusText: '空闲'
            },
            {
                id: '京D67890',
                monthlyVolume: [3600, 3400, 3800, 3500, 3700, 3600],
                status: 'working',
                statusText: '执行中'
            },
            {
                id: '京E12345',
                monthlyVolume: [2000, 1800, 2200, 2100, 2400, 2000],
                status: 'maintenance',
                statusText: '维护中'
            }
        ],
        drivers: [
            {
                name: '张师傅',
                monthlyVolume: [3200, 2800, 3500, 3100, 3400, 3200],
                status: 'working',
                statusText: '执行中'
            },
            {
                name: '王师傅',
                monthlyVolume: [2800, 2600, 3000, 2900, 3200, 2800],
                status: 'working',
                statusText: '执行中'
            },
            {
                name: '李师傅',
                monthlyVolume: [2400, 2200, 2600, 2500, 2800, 2400],
                status: 'free',
                statusText: '空闲'
            },
            {
                name: '赵师傅',
                monthlyVolume: [3600, 3400, 3800, 3500, 3700, 3600],
                status: 'working',
                statusText: '执行中'
            },
            {
                name: '钱师傅',
                monthlyVolume: [2000, 1800, 2200, 2100, 2400, 2000],
                status: 'maintenance',
                statusText: '维护中'
            }
        ]
    };

    // 获取当前日期并计算最近半年
    function getLast6Months() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 0-11 -> 1-12
        
        // 计算6个月前的年月
        let startYear = currentYear;
        let startMonth = currentMonth - 5;
        
        if (startMonth <= 0) {
            startMonth += 12;
            startYear -= 1;
        }
        
        // 格式化年月为 YYYY-MM 格式
        const startDate = `${startYear}-${startMonth.toString().padStart(2, '0')}`;
        const endDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
        
        return { startDate, endDate };
    }

    // 初始化页面
    function initPage() {
        // 设置默认的最近半年日期
        const { startDate, endDate } = getLast6Months();
        vehicleStartMonth.value = startDate;
        vehicleEndMonth.value = endDate;
        driverStartMonth.value = startDate;
        driverEndMonth.value = endDate;
        
        // 隐藏月份选择器（默认选择近半年）
        vehicleStartMonth.style.display = 'none';
        vehicleEndMonth.style.display = 'none';
        driverStartMonth.style.display = 'none';
        driverEndMonth.style.display = 'none';
        
        updateStatsCards();
        renderTables();
        bindEvents();
    }

    // 更新统计卡片
    function updateStatsCards() {
        // 计算车辆总方量（取最近一个月的数据作为今日方量，所有月份总和作为本月累计）
        const vehicleTotalVolume = demoData.vehicles.reduce((sum, v) => sum + v.monthlyVolume[5], 0); // 6月数据
        const vehicleAllVolume = demoData.vehicles.reduce((sum, v) => sum + v.monthlyVolume.reduce((a, b) => a + b, 0), 0); // 所有月份总和
        const activeVehicles = demoData.vehicles.filter(v => v.status === 'working').length;
        const activeDrivers = demoData.drivers.filter(d => d.status === 'working').length;

        document.getElementById('todayVolume').innerHTML = vehicleTotalVolume + '<span class="unit">m³</span>';
        document.getElementById('monthVolume').innerHTML = vehicleAllVolume + '<span class="unit">m³</span>';
        document.getElementById('activeVehicles').innerHTML = activeVehicles + '<span class="unit">台</span>';
        document.getElementById('activeDrivers').innerHTML = activeDrivers + '<span class="unit">人</span>';
    }

    // 渲染表格
    function renderTables() {
        renderVehicleTable();
        renderDriverTable();
    }

    // 渲染车辆表格
    function renderVehicleTable() {
        const tbody = document.getElementById('vehicleTableBody');
        tbody.innerHTML = '';

        demoData.vehicles.forEach(vehicle => {
            const totalVolume = vehicle.monthlyVolume.reduce((sum, volume) => sum + volume, 0);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.id}</td>
                <td>${vehicle.monthlyVolume[0]}<span class="unit">m³</span></td>
                <td>${vehicle.monthlyVolume[1]}<span class="unit">m³</span></td>
                <td>${vehicle.monthlyVolume[2]}<span class="unit">m³</span></td>
                <td>${vehicle.monthlyVolume[3]}<span class="unit">m³</span></td>
                <td>${vehicle.monthlyVolume[4]}<span class="unit">m³</span></td>
                <td>${vehicle.monthlyVolume[5]}<span class="unit">m³</span></td>
                <td>${totalVolume}<span class="unit">m³</span></td>
                <td>
                    <button class="btn btn-default btn-sm" onclick="showDetail('vehicle', '${vehicle.id}')">查看详情</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // 渲染司机表格
    function renderDriverTable() {
        const tbody = document.getElementById('driverTableBody');
        tbody.innerHTML = '';

        demoData.drivers.forEach(driver => {
            const totalVolume = driver.monthlyVolume.reduce((sum, volume) => sum + volume, 0);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${driver.monthlyVolume[0]}<span class="unit">m³</span></td>
                <td>${driver.monthlyVolume[1]}<span class="unit">m³</span></td>
                <td>${driver.monthlyVolume[2]}<span class="unit">m³</span></td>
                <td>${driver.monthlyVolume[3]}<span class="unit">m³</span></td>
                <td>${driver.monthlyVolume[4]}<span class="unit">m³</span></td>
                <td>${driver.monthlyVolume[5]}<span class="unit">m³</span></td>
                <td>${totalVolume}<span class="unit">m³</span></td>
                <td>
                    <button class="btn btn-default btn-sm" onclick="showDetail('driver', '${driver.name}')">查看详情</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // 绑定事件
    function bindEvents() {
        // 主TAB切换
        mainTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tab = this.dataset.tab;
                
                // 更新TAB状态
                mainTabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 更新内容显示
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tab + 'Tab') {
                        content.classList.add('active');
                    }
                });
            });
        });

        // 车辆筛选事件
        vehicleTimeRange.addEventListener('change', function() {
            if (this.value === 'custom') {
                vehicleStartMonth.style.display = 'inline-block';
                vehicleEndMonth.style.display = 'inline-block';
            } else {
                vehicleStartMonth.style.display = 'none';
                vehicleEndMonth.style.display = 'none';
                updateVehicleData();
            }
        });

        vehicleFilter.addEventListener('change', updateVehicleData);
        vehicleResetBtn.addEventListener('click', function() {
            vehicleTimeRange.value = 'last6months';
            vehicleFilter.value = '';
            vehicleStartMonth.style.display = 'none';
            vehicleEndMonth.style.display = 'none';
            updateVehicleData();
        });

        vehicleExportBtn.addEventListener('click', function() {
            exportReport('vehicle');
        });

        // 司机筛选事件
        driverTimeRange.addEventListener('change', function() {
            if (this.value === 'custom') {
                driverStartMonth.style.display = 'inline-block';
                driverEndMonth.style.display = 'inline-block';
            } else {
                driverStartMonth.style.display = 'none';
                driverEndMonth.style.display = 'none';
                updateDriverData();
            }
        });

        driverFilter.addEventListener('change', updateDriverData);
        driverResetBtn.addEventListener('click', function() {
            driverTimeRange.value = 'last6months';
            driverFilter.value = '';
            driverStartMonth.style.display = 'none';
            driverEndMonth.style.display = 'none';
            updateDriverData();
        });

        driverExportBtn.addEventListener('click', function() {
            exportReport('driver');
        });

        // 抽屉关闭
        closeButtons.forEach(btn => {
            btn.addEventListener('click', closeDetailDrawer);
        });

        cancelButtons.forEach(btn => {
            btn.addEventListener('click', closeDetailDrawer);
        });

        drawerMask.addEventListener('click', closeDetailDrawer);
    }

    // 更新车辆数据
    function updateVehicleData() {
        // 这里可以根据筛选条件重新获取数据
        updateStatsCards();
        renderVehicleTable();
    }

    // 更新司机数据
    function updateDriverData() {
        // 这里可以根据筛选条件重新获取数据
        renderDriverTable();
    }

    // 显示详情
    window.showDetail = function(type, id) {
        const detailTitle = document.getElementById('detailTitle');
        const detailInfo = document.getElementById('detailInfo');
        
        let data = null;
        let title = '';
        
        if (type === 'vehicle') {
            data = demoData.vehicles.find(v => v.id === id);
            title = `车辆详情 - ${id}`;
        } else if (type === 'driver') {
            data = demoData.drivers.find(d => d.name === id);
            title = `司机详情 - ${id}`;
        }

        if (data) {
            detailTitle.textContent = title;
            
            // 生成详情信息
            let infoHtml = '';
            if (type === 'vehicle') {
                const totalVolume = data.monthlyVolume.reduce((sum, volume) => sum + volume, 0);
                infoHtml = `
                    <div class="info-item">
                        <span class="label">车辆编号</span>
                        <span class="value">${data.id}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">1月</span>
                        <span class="value">${data.monthlyVolume[0]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">2月</span>
                        <span class="value">${data.monthlyVolume[1]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">3月</span>
                        <span class="value">${data.monthlyVolume[2]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">4月</span>
                        <span class="value">${data.monthlyVolume[3]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">5月</span>
                        <span class="value">${data.monthlyVolume[4]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">6月</span>
                        <span class="value">${data.monthlyVolume[5]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">总方量</span>
                        <span class="value">${totalVolume}<span class="unit">m³</span></span>
                    </div>
                `;
            } else if (type === 'driver') {
                const totalVolume = data.monthlyVolume.reduce((sum, volume) => sum + volume, 0);
                infoHtml = `
                    <div class="info-item">
                        <span class="label">司机姓名</span>
                        <span class="value">${data.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">1月</span>
                        <span class="value">${data.monthlyVolume[0]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">2月</span>
                        <span class="value">${data.monthlyVolume[1]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">3月</span>
                        <span class="value">${data.monthlyVolume[2]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">4月</span>
                        <span class="value">${data.monthlyVolume[3]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">5月</span>
                        <span class="value">${data.monthlyVolume[4]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">6月</span>
                        <span class="value">${data.monthlyVolume[5]}<span class="unit">m³</span></span>
                    </div>
                    <div class="info-item">
                        <span class="label">总方量</span>
                        <span class="value">${totalVolume}<span class="unit">m³</span></span>
                    </div>
                `;
            }
            
            detailInfo.innerHTML = infoHtml;
            
            // 显示抽屉
            drawerMask.style.display = 'block';
            detailDrawer.classList.add('active');
        }
    };

    // 关闭详情抽屉
    function closeDetailDrawer() {
        drawerMask.style.display = 'none';
        detailDrawer.classList.remove('active');
    }

    // 导出报表
    function exportReport(type) {
        const typeText = type === 'vehicle' ? '车辆' : '司机';
        alert(`${typeText}统计报表导出功能开发中...`);
    }

    // 初始化页面
    initPage();
}); 
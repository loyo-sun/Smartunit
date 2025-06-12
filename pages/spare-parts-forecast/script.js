document.addEventListener('DOMContentLoaded', function() {
    // 初始化抽屉
    const drawer = document.getElementById('detailDrawer');
    const drawerMask = document.getElementById('drawerMask');
    const detailButtons = document.querySelectorAll('.btn-detail');
    const closeButton = document.querySelector('.btn-close');

    // 打开抽屉
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const partData = {
                code: row.querySelector('.code').textContent,
                name: row.querySelector('td:nth-child(2)').textContent,
                model: row.querySelector('td:nth-child(3)').textContent,
                unit: row.querySelector('td:nth-child(4)').textContent,
                type: row.querySelector('.tag').textContent,
                forecast: row.querySelector('.forecast').textContent,
                forecastType: row.querySelector('td:nth-child(7)').textContent
            };
            
            loadDetailData(partData);
            drawer.classList.add('active');
            drawerMask.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });

    // 关闭抽屉
    function closeDrawer() {
        drawer.classList.remove('active');
        drawerMask.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    }

    closeButton.addEventListener('click', closeDrawer);

    // 点击遮罩层关闭抽屉
    drawerMask.addEventListener('click', closeDrawer);

    // 筛选功能
    const monthSelector = document.querySelector('.month-selector');
    const searchInput = document.querySelector('.search-input');
    const typeSelector = document.querySelector('.type-selector');
    const forecastTypeSelector = document.querySelector('.forecast-type-selector');
    const resetButton = document.querySelector('.btn-reset');

    // 监听筛选条件变化
    [monthSelector, searchInput, typeSelector, forecastTypeSelector].forEach(element => {
        element.addEventListener('change', updateTable);
    });

    // 重置按钮
    resetButton.addEventListener('click', () => {
        monthSelector.value = '';
        searchInput.value = '';
        typeSelector.value = 'all';
        forecastTypeSelector.value = 'all';
        updateTable();
    });

    // 导出按钮
    const exportButton = document.querySelector('.btn-export');
    exportButton.addEventListener('click', exportData);
});

// 更新表格数据
function updateTable() {
    // 这里添加实际的API调用逻辑
    console.log('更新表格数据');
}

// 加载详情数据
function loadDetailData(partData) {
    const drawerBody = document.querySelector('.drawer-body');
    
    // 构建详情内容
    const detailContent = `
        <div class="info-section">
            <h2 class="part-name">${partData.name}</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">配件编码</span>
                    <span class="value">${partData.code}</span>
                </div>
                <div class="info-item">
                    <span class="label">型号</span>
                    <span class="value">${partData.model}</span>
                </div>
                <div class="info-item">
                    <span class="label">单位</span>
                    <span class="value">${partData.unit}</span>
                </div>
                <div class="info-item">
                    <span class="label">配件类型</span>
                    <span class="value"><span class="tag ${getTypeClass(partData.type)}">${partData.type}</span></span>
                </div>
                <div class="info-item">
                    <span class="label">预测数量</span>
                    <span class="value forecast">${partData.forecast}</span>
                </div>
            </div>
        </div>
        <div class="trend-section">
            <h3>使用与预测趋势</h3>
            <div class="chart-container">
                <div id="trendChart" style="width: 100%; height: 300px;"></div>
            </div>
        </div>
        ${partData.forecastType === '模型预测' ? `
        <div class="equipment-section">
            <h3>设备分布</h3>
            <table class="equipment-table">
                <thead>
                    <tr>
                        <th>设备编码</th>
                        <th>设备名称</th>
                        <th>所属项目</th>
                        <th>预计用量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>EQ001</td>
                        <td>注塑机A</td>
                        <td>项目A</td>
                        <td>2.5</td>
                    </tr>
                    <tr>
                        <td>EQ002</td>
                        <td>注塑机B</td>
                        <td>项目B</td>
                        <td>1.8</td>
                    </tr>
                    <tr>
                        <td>EQ003</td>
                        <td>注塑机C</td>
                        <td>项目A</td>
                        <td>0.7</td>
                    </tr>
                </tbody>
            </table>
        </div>
        ` : ''}
    `;
    
    drawerBody.innerHTML = detailContent;
    
    // 初始化图表
    initChart();
}

// 获取配件类型对应的CSS类
function getTypeClass(type) {
    const typeMap = {
        '易损件': 'consumable',
        '关键件': 'critical',
        '常备件': 'regular'
    };
    return typeMap[type] || 'regular';
}

// 初始化趋势图表
function initChart() {
    const chartDom = document.getElementById('trendChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    // 获取当前月份
    const now = new Date();
    const currentMonth = now.getMonth();
    const months = [];
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    
    // 生成7个月的标签（前3个月、当前月、后3个月）
    for (let i = -3; i <= 3; i++) {
        let monthIndex = (currentMonth + i + 12) % 12;
        months.push(monthNames[monthIndex]);
    }
    
    // 模拟数据
    const actualData = [12, 15, 18, 14, null, null, null]; // 实际使用量
    const forecastData = [10, 13, 16, 14, 17, 20, 22]; // 预测使用量
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                let result = params[0].axisValue + '<br/>';
                params.forEach(param => {
                    if (param.value !== null) {
                        const color = param.color;
                        const value = param.value;
                        const name = param.seriesName;
                        result += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
                        result += `${name}：${value}<br/>`;
                    }
                });
                return result;
            }
        },
        legend: {
            data: ['历史使用量', '预测使用量'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: months,
            axisLine: {
                lineStyle: {
                    color: '#E5E5E5'
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#E5E5E5',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '历史使用量',
                type: 'bar',
                data: actualData,
                itemStyle: {
                    color: '#1890FF'
                },
                barWidth: '40%',
                barGap: '30%'
            },
            {
                name: '预测使用量',
                type: 'line',
                data: forecastData,
                itemStyle: {
                    color: '#FFB800'
                },
                lineStyle: {
                    type: 'dashed',
                    width: 2
                },
                symbol: 'circle',
                symbolSize: 6,
                connectNulls: true
            }
        ]
    };
    
    myChart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 导出数据
function exportData() {
    // 这里添加实际的导出逻辑
    console.log('导出数据');
} 
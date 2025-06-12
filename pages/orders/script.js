document.addEventListener('DOMContentLoaded', function() {
    // 抽屉相关元素
    const detailDrawer = document.querySelector('.detail-drawer');
    const newOrderDrawer = document.querySelector('.new-order-drawer');
    const dispatchDrawer = document.querySelector('.dispatch-drawer');
    const drawerMasks = document.querySelectorAll('.drawer-mask');
    const closeButtons = document.querySelectorAll('.btn-close');
    const cancelButtons = document.querySelectorAll('.drawer-footer .btn-default');

    // 快捷筛选标签
    const quickFilterTags = document.querySelectorAll('.quick-filter-tag');

    // 新增订单按钮
    const newOrderBtn = document.querySelector('.filter-right .btn-primary');
    
    // 查看详情和调度设备按钮
    const detailBtns = document.querySelectorAll('.btn-default[data-id]');
    const dispatchBtns = document.querySelectorAll('.btn-primary[data-id]');

    // 表单元素
    const newOrderForm = document.getElementById('newOrderForm');
    const dispatchForm = document.getElementById('dispatchForm');

    // 演示数据
    const demoOrders = [
        {
            id: 'ORD20240315001',
            customer: '示例客户A',
            location: '北京市朝阳区',
            volume: '100m³',
            status: 'new',
            planTime: '2024-03-15 09:00',
            vehicle: '-',
            driver: '-',
            otherRoles: '-',
            project: '某小区地下车库',
            position: 'B区负一层',
            remark: '暂无备注信息',
            timeline: []
        },
        {
            id: 'ORD20240315002',
            customer: '示例客户B',
            location: '北京市海淀区',
            volume: '150m³',
            status: 'scheduled',
            planTime: '2024-03-15 14:00',
            vehicle: '京A12345',
            driver: '张师傅',
            otherRoles: '李师傅、赵师傅',
            project: '某商业中心',
            position: '地下二层',
            remark: '需要提前到达现场',
            timeline: []
        },
        {
            id: 'ORD20240314001',
            customer: '示例客户C',
            location: '北京市丰台区',
            volume: '80m³',
            status: 'completed',
            planTime: '2024-03-14 10:00',
            vehicle: '京B67890',
            driver: '王师傅',
            otherRoles: '钱师傅、孙师傅',
            project: '某住宅小区',
            position: '1号楼',
            remark: '现场有特殊要求',
            timeline: [
                { time: '2024-03-14 09:30', type: 'arrival', desc: '司机到达现场' },
                { time: '2024-03-14 10:00', type: 'start', desc: '开始施工' },
                { time: '2024-03-14 11:30', type: 'fuel', desc: '加油 200L' },
                { time: '2024-03-14 12:30', type: 'complete', desc: '施工完成' }
            ]
        },
        {
            id: 'ORD20240315003',
            customer: '示例客户D',
            location: '北京市西城区',
            volume: '200m³',
            status: 'in-progress',
            planTime: '2024-03-15 08:00',
            vehicle: '京C12345',
            driver: '李师傅',
            otherRoles: '周师傅、吴师傅',
            project: '某写字楼',
            position: '地下三层',
            remark: '需要夜间施工',
            timeline: [
                { time: '2024-03-15 07:45', type: 'arrival', desc: '司机到达现场' },
                { time: '2024-03-15 08:00', type: 'start', desc: '开始施工' }
            ]
        },
        {
            id: 'ORD20240315004',
            customer: '示例客户E',
            location: '北京市东城区',
            volume: '120m³',
            status: 'settled',
            planTime: '2024-03-14 15:00',
            vehicle: '京D67890',
            driver: '赵师傅',
            otherRoles: '郑师傅、王师傅',
            project: '某商场',
            position: '地下四层',
            remark: '已完成结算',
            timeline: [
                { time: '2024-03-14 14:45', type: 'arrival', desc: '司机到达现场' },
                { time: '2024-03-14 15:00', type: 'start', desc: '开始施工' },
                { time: '2024-03-14 16:30', type: 'fuel', desc: '加油 150L' },
                { time: '2024-03-14 18:00', type: 'complete', desc: '施工完成' }
            ]
        },
        {
            id: 'ORD20240315005',
            customer: '示例客户F',
            location: '北京市石景山区',
            volume: '90m³',
            status: 'cancelled',
            planTime: '2024-03-15 10:00',
            vehicle: '-',
            driver: '-',
            otherRoles: '-',
            project: '某医院',
            position: '地下二层',
            remark: '客户临时取消',
            timeline: []
        },
        {
            id: 'ORD20240315006',
            customer: '示例客户G',
            location: '北京市通州区',
            volume: '180m³',
            status: 'new',
            planTime: '2024-03-16 09:00',
            vehicle: '-',
            driver: '-',
            otherRoles: '-',
            project: '某学校',
            position: '操场',
            remark: '需要提前准备',
            timeline: []
        },
        {
            id: 'ORD20240315007',
            customer: '示例客户H',
            location: '北京市大兴区',
            volume: '160m³',
            status: 'scheduled',
            planTime: '2024-03-16 14:00',
            vehicle: '京E12345',
            driver: '钱师傅',
            otherRoles: '孙师傅、周师傅',
            project: '某工厂',
            position: '车间',
            remark: '需要特殊设备',
            timeline: []
        },
        {
            id: 'ORD20240315008',
            customer: '示例客户I',
            location: '北京市昌平区',
            volume: '140m³',
            status: 'in-progress',
            planTime: '2024-03-15 13:00',
            vehicle: '京F67890',
            driver: '孙师傅',
            otherRoles: '吴师傅、郑师傅',
            project: '某物流园',
            position: '仓库',
            remark: '正在施工中',
            timeline: [
                { time: '2024-03-15 12:45', type: 'arrival', desc: '司机到达现场' },
                { time: '2024-03-15 13:00', type: 'start', desc: '开始施工' }
            ]
        },
        {
            id: 'ORD20240315009',
            customer: '示例客户J',
            location: '北京市顺义区',
            volume: '110m³',
            status: 'completed',
            planTime: '2024-03-15 11:00',
            vehicle: '京G12345',
            driver: '周师傅',
            otherRoles: '吴师傅、王师傅',
            project: '某体育场',
            position: '看台',
            remark: '施工完成',
            timeline: [
                { time: '2024-03-15 10:45', type: 'arrival', desc: '司机到达现场' },
                { time: '2024-03-15 11:00', type: 'start', desc: '开始施工' },
                { time: '2024-03-15 12:30', type: 'fuel', desc: '加油 180L' },
                { time: '2024-03-15 14:00', type: 'complete', desc: '施工完成' }
            ]
        }
    ];

    // 渲染订单列表
    function renderOrders(orders) {
        const tbody = document.querySelector('.order-table tbody');
        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.location}</td>
                <td>${order.volume}</td>
                <td><span class="status-tag status-${order.status}">${getStatusText(order.status)}</span></td>
                <td>${order.planTime}</td>
                <td>${order.vehicle}</td>
                <td>${order.driver}</td>
                <td>${order.otherRoles}</td>
                <td>
                    <button class="btn btn-default" data-id="${order.id}">详情</button>
                    <button class="btn btn-primary" data-id="${order.id}">调度</button>
                </td>
            </tr>
        `).join('');

        // 重新绑定按钮事件
        bindButtonEvents();
    }

    // 获取状态文本
    function getStatusText(status) {
        const statusMap = {
            'new': '新建',
            'scheduled': '已排班',
            'in-progress': '执行中',
            'completed': '已完工',
            'settled': '已结算',
            'cancelled': '已取消'
        };
        return statusMap[status] || status;
    }

    // 绑定按钮事件
    function bindButtonEvents() {
        // 查看详情按钮
        document.querySelectorAll('.btn-default[data-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = btn.dataset.id;
                const order = demoOrders.find(o => o.id === orderId);
                if (order) {
                    showOrderDetail(order);
                }
            });
        });

        // 调度设备按钮
        document.querySelectorAll('.btn-primary[data-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = btn.dataset.id;
                const order = demoOrders.find(o => o.id === orderId);
                if (order) {
                    showDispatchForm(order);
                }
            });
        });
    }

    // 显示订单详情
    function showOrderDetail(order) {
        const detailContent = detailDrawer.querySelector('.drawer-body');
        if (!detailContent) return;

        detailContent.innerHTML = `
            <div class="info-section">
                <h4 class="info-title">基本信息</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">订单编号</span>
                        <span class="value">${order.id}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">客户名称</span>
                        <span class="value">${order.customer}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">施工项目</span>
                        <span class="value">${order.project}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">施工位置</span>
                        <span class="value">${order.location}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">施工部位</span>
                        <span class="value">${order.position}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">预计方量</span>
                        <span class="value">${order.volume}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">计划时间</span>
                        <span class="value">${order.planTime}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">订单状态</span>
                        <span class="value"><span class="status-tag status-${order.status}">${getStatusText(order.status)}</span></span>
                    </div>
                </div>
            </div>

            <div class="info-section">
                <h4 class="info-title">调度信息</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">车辆</span>
                        <span class="value">${order.vehicle}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">司机</span>
                        <span class="value">${order.driver}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">其他角色</span>
                        <span class="value">${order.otherRoles}</span>
                    </div>
                </div>
            </div>

            ${order.timeline.length > 0 ? `
                <div class="info-section">
                    <h4 class="info-title">时间轴</h4>
                    <div class="timeline">
                        ${order.timeline.map(item => `
                            <div class="timeline-item ${item.type}">
                                <div class="timeline-time">${item.time}</div>
                                <div class="timeline-content">${item.desc}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="info-section">
                <h4 class="info-title">备注信息</h4>
                <div class="info-content">
                    ${order.remark}
                </div>
            </div>
        `;

        detailDrawer.classList.add('active');
        drawerMasks[0].classList.add('active');
    }

    // 显示调度表单
    function showDispatchForm(order) {
        const form = document.getElementById('dispatchForm');
        if (!form) return;

        // 设置订单ID
        form.querySelector('[name="orderId"]').value = order.id;
        
        // 设置车辆
        const vehicleSelect = form.querySelector('[name="vehicle"]');
        if (vehicleSelect) {
            vehicleSelect.value = order.vehicle === '-' ? '' : order.vehicle;
        }
        
        // 设置司机
        const driverSelect = form.querySelector('[name="driver"]');
        if (driverSelect) {
            driverSelect.value = order.driver === '-' ? '' : order.driver;
        }
        
        // 设置其他角色
        const otherRolesSelect = form.querySelector('[name="otherRoles"]');
        if (otherRolesSelect && order.otherRoles && order.otherRoles !== '-') {
            const roles = order.otherRoles.split('、');
            Array.from(otherRolesSelect.options).forEach(option => {
                option.selected = roles.includes(option.value);
            });
        }
        
        // 设置备注
        const remarkTextarea = form.querySelector('[name="remark"]');
        if (remarkTextarea) {
            remarkTextarea.value = order.remark || '';
        }
        
        dispatchDrawer.classList.add('active');
        drawerMasks[2].classList.add('active');
    }

    // 打开新增订单抽屉
    newOrderBtn.addEventListener('click', () => {
        newOrderDrawer.classList.add('active');
        drawerMasks[1].classList.add('active');
    });

    // 关闭抽屉
    function closeDrawer(drawer, mask) {
        drawer.classList.remove('active');
        mask.classList.remove('active');
    }

    // 关闭按钮事件
    closeButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            closeDrawer(
                index === 0 ? detailDrawer : 
                index === 1 ? newOrderDrawer : dispatchDrawer,
                drawerMasks[index]
            );
        });
    });

    // 取消按钮事件
    cancelButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            closeDrawer(
                index === 0 ? detailDrawer : 
                index === 1 ? newOrderDrawer : dispatchDrawer,
                drawerMasks[index]
            );
        });
    });

    // 点击遮罩层关闭抽屉
    drawerMasks.forEach((mask, index) => {
        mask.addEventListener('click', () => {
            closeDrawer(
                index === 0 ? detailDrawer : 
                index === 1 ? newOrderDrawer : dispatchDrawer,
                mask
            );
        });
    });

    // 快捷筛选标签点击事件
    quickFilterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            quickFilterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            // 根据标签筛选订单
            const filterText = tag.textContent;
            let filteredOrders = [...demoOrders];
            
            if (filterText === '今日作业') {
                filteredOrders = demoOrders.filter(order => order.date === '2024-03-15');
            } else if (filterText === '待排班') {
                filteredOrders = demoOrders.filter(order => order.status === 'new');
            } else if (filterText === '本周已完工') {
                filteredOrders = demoOrders.filter(order => order.status === 'completed');
            }
            
            renderOrders(filteredOrders);
        });
    });

    // 新增订单表单提交
    newOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(newOrderForm);
        const newOrder = {
            id: `ORD${new Date().getTime()}`,
            customer: formData.get('customer'),
            project: formData.get('project'),
            location: formData.get('location'),
            position: formData.get('position'),
            volume: formData.get('volume') + 'm³',
            planTime: formData.get('planTime'),
            status: 'new',
            vehicle: formData.get('vehicle'),
            driver: formData.get('driver'),
            otherRoles: Array.from(formData.getAll('otherRoles')).join('、') || '-',
            remark: formData.get('remark') || '暂无备注信息',
            timeline: []
        };
        
        demoOrders.unshift(newOrder);
        renderOrders(demoOrders);
        
        alert('订单创建成功！');
        closeDrawer(newOrderDrawer, drawerMasks[1]);
        newOrderForm.reset();
    });

    // 调度表单提交
    dispatchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(dispatchForm);
        const orderId = formData.get('orderId');
        const order = demoOrders.find(o => o.id === orderId);
        
        if (order) {
            order.vehicle = formData.get('vehicle');
            order.driver = formData.get('driver');
            
            // 处理其他角色
            const otherRoles = Array.from(formData.getAll('otherRoles'));
            order.otherRoles = otherRoles.length > 0 ? otherRoles.join('、') : '-';
            
            order.status = 'scheduled';
            order.remark = formData.get('remark') || order.remark;
            renderOrders(demoOrders);
        }
        
        alert('调度成功！');
        closeDrawer(dispatchDrawer, drawerMasks[2]);
        dispatchForm.reset();
    });

    // 重置筛选条件
    const resetBtn = document.querySelector('.filter-right .btn-default');
    resetBtn.addEventListener('click', () => {
        const filterInputs = document.querySelectorAll('.filter-left select, .filter-left input');
        filterInputs.forEach(input => {
            input.value = '';
        });
        renderOrders(demoOrders);
    });

    // 初始化渲染
    renderOrders(demoOrders);
}); 
// 模拟数据
const mockData = {
    // 统计卡片数据
    stats: {
        todayOrders: 12,
        weekOrders: 68,
        monthOrders: 245,
        completionRate: 85
    },
    
    // 客户统计数据
    customerStats: [
        {
            customerName: '示例客户A',
            orderCount: 25,
            totalVolume: 320,
            completed: 20,
            inProgress: 3,
            pending: 2,
            completionRate: 80
        },
        {
            customerName: '示例客户B',
            orderCount: 18,
            totalVolume: 280,
            completed: 15,
            inProgress: 2,
            pending: 1,
            completionRate: 83
        },
        {
            customerName: '示例客户C',
            orderCount: 32,
            totalVolume: 450,
            completed: 28,
            inProgress: 3,
            pending: 1,
            completionRate: 88
        },
        {
            customerName: '示例客户D',
            orderCount: 15,
            totalVolume: 220,
            completed: 12,
            inProgress: 2,
            pending: 1,
            completionRate: 80
        },
        {
            customerName: '示例客户E',
            orderCount: 28,
            totalVolume: 380,
            completed: 24,
            inProgress: 3,
            pending: 1,
            completionRate: 86
        }
    ],
    
    // 订单状态分布数据
    statusDistribution: [
        { status: '已完工', count: 45, percentage: 45 },
        { status: '执行中', count: 15, percentage: 15 },
        { status: '已排班', count: 25, percentage: 25 },
        { status: '新建', count: 10, percentage: 10 },
        { status: '已取消', count: 5, percentage: 5 }
    ],
    
    // 订单量趋势数据
    trendData: [
        { date: '2024-01', count: 180 },
        { date: '2024-02', count: 195 },
        { date: '2024-03', count: 210 },
        { date: '2024-04', count: 225 },
        { date: '2024-05', count: 240 },
        { date: '2024-06', count: 245 }
    ]
};

// 客户详情数据
const customerDetails = {
    '示例客户A': {
        contactPerson: '张三',
        phone: '13800138001',
        address: '北京市朝阳区示例街道123号',
        totalOrders: 25,
        totalVolume: 320,
        avgOrderVolume: 12.8,
        firstOrderDate: '2024-01-15',
        lastOrderDate: '2024-06-20',
        orders: [
            { orderNumber: 'ORD-2024-001', status: '已完工', volume: 15, date: '2024-06-20' },
            { orderNumber: 'ORD-2024-002', status: '已完工', volume: 12, date: '2024-06-18' },
            { orderNumber: 'ORD-2024-003', status: '执行中', volume: 18, date: '2024-06-22' },
            { orderNumber: 'ORD-2024-004', status: '已排班', volume: 20, date: '2024-06-25' },
            { orderNumber: 'ORD-2024-005', status: '新建', volume: 16, date: '2024-06-26' }
        ]
    },
    '示例客户B': {
        contactPerson: '李四',
        phone: '13800138002',
        address: '上海市浦东新区示例路456号',
        totalOrders: 18,
        totalVolume: 280,
        avgOrderVolume: 15.6,
        firstOrderDate: '2024-02-10',
        lastOrderDate: '2024-06-19',
        orders: [
            { orderNumber: 'ORD-2024-006', status: '已完工', volume: 14, date: '2024-06-19' },
            { orderNumber: 'ORD-2024-007', status: '已完工', volume: 16, date: '2024-06-17' },
            { orderNumber: 'ORD-2024-008', status: '执行中', volume: 18, date: '2024-06-21' },
            { orderNumber: 'ORD-2024-009', status: '已排班', volume: 22, date: '2024-06-24' }
        ]
    }
};

// 图表实例
let statusChart = null;
let trendChart = null;

// DOM 元素
const elements = {
    // 统计卡片
    todayOrders: document.getElementById('todayOrders'),
    weekOrders: document.getElementById('weekOrders'),
    monthOrders: document.getElementById('monthOrders'),
    completionRate: document.getElementById('completionRate'),
    
    // 筛选器
    timeRange: document.getElementById('timeRange'),
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    customerFilter: document.getElementById('customerFilter'),
    statusFilter: document.getElementById('statusFilter'),
    resetBtn: document.getElementById('resetBtn'),
    
    // 表格
    statisticsTableBody: document.getElementById('statisticsTableBody'),
    refreshBtn: document.getElementById('refreshBtn'),
    
    // 抽屉
    drawerMask: document.querySelector('.drawer-mask'),
    detailDrawer: document.querySelector('.detail-drawer'),
    detailTitle: document.getElementById('detailTitle'),
    detailInfo: document.getElementById('detailInfo'),
    orderList: document.getElementById('orderList'),
    
    // 按钮
    exportBtn: document.getElementById('exportBtn'),
    closeBtn: document.querySelector('.btn-close'),
    drawerCloseBtn: document.querySelector('.drawer-footer .btn')
};

// 初始化页面
function initPage() {
    updateStatsCards();
    renderStatisticsTable();
    initCharts();
    setupEventListeners();
    setupDateRange();
}

// 更新统计卡片
function updateStatsCards() {
    elements.todayOrders.textContent = mockData.stats.todayOrders;
    elements.weekOrders.textContent = mockData.stats.weekOrders;
    elements.monthOrders.textContent = mockData.stats.monthOrders;
    elements.completionRate.textContent = mockData.stats.completionRate;
}

// 初始化图表
function initCharts() {
    initStatusChart();
    initTrendChart();
}

// 初始化订单状态分布饼图
function initStatusChart() {
    const ctx = document.getElementById('statusChart').getContext('2d');
    
    // 销毁现有图表
    if (statusChart) {
        statusChart.destroy();
    }
    
    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: mockData.statusDistribution.map(item => item.status),
            datasets: [{
                data: mockData.statusDistribution.map(item => item.count),
                backgroundColor: [
                    '#52c41a', // 已完工 - 绿色
                    '#1890ff', // 执行中 - 蓝色
                    '#faad14', // 已排班 - 橙色
                    '#722ed1', // 新建 - 紫色
                    '#f5222d'  // 已取消 - 红色
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value}单 (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 初始化订单量趋势折线图
function initTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // 销毁现有图表
    if (trendChart) {
        trendChart.destroy();
    }
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.trendData.map(item => item.date),
            datasets: [{
                label: '订单数量',
                data: mockData.trendData.map(item => item.count),
                borderColor: '#1890ff',
                backgroundColor: 'rgba(24, 144, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1890ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#1890ff',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#8c8c8c',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#8c8c8c',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// 渲染统计表格
function renderStatisticsTable() {
    const tbody = elements.statisticsTableBody;
    tbody.innerHTML = '';
    
    mockData.customerStats.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.customerName}</td>
            <td>${customer.orderCount}</td>
            <td>${customer.totalVolume}<span class="unit">m³</span></td>
            <td>${customer.completed}</td>
            <td>${customer.inProgress}</td>
            <td>${customer.pending}</td>
            <td>${customer.completionRate}<span class="unit">%</span></td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="showCustomerDetail('${customer.customerName}')">
                    查看详情
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 筛选器事件
    elements.timeRange.addEventListener('change', handleTimeRangeChange);
    elements.customerFilter.addEventListener('change', handleFilterChange);
    elements.statusFilter.addEventListener('change', handleFilterChange);
    elements.resetBtn.addEventListener('click', resetFilters);
    
    // 表格刷新
    elements.refreshBtn.addEventListener('click', refreshData);
    
    // 导出功能
    elements.exportBtn.addEventListener('click', exportReport);
    
    // 抽屉关闭
    elements.closeBtn.addEventListener('click', closeDrawer);
    elements.drawerCloseBtn.addEventListener('click', closeDrawer);
    elements.drawerMask.addEventListener('click', closeDrawer);
    
    // 日期选择器
    elements.startDate.addEventListener('change', handleDateChange);
    elements.endDate.addEventListener('change', handleDateChange);
}

// 设置日期范围
function setupDateRange() {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    elements.startDate.value = sixMonthsAgo.toISOString().split('T')[0];
    elements.endDate.value = today.toISOString().split('T')[0];
}

// 处理时间范围变化
function handleTimeRangeChange() {
    const timeRange = elements.timeRange.value;
    const today = new Date();
    let startDate, endDate;
    
    switch (timeRange) {
        case 'today':
            startDate = endDate = today;
            break;
        case 'week':
            startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            endDate = today;
            break;
        case 'month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = today;
            break;
        case 'quarter':
            const quarter = Math.floor(today.getMonth() / 3);
            startDate = new Date(today.getFullYear(), quarter * 3, 1);
            endDate = today;
            break;
        case 'year':
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = today;
            break;
        case 'custom':
            return; // 保持当前日期选择
    }
    
    elements.startDate.value = startDate.toISOString().split('T')[0];
    elements.endDate.value = endDate.toISOString().split('T')[0];
    
    // 触发数据刷新
    refreshData();
}

// 处理筛选器变化
function handleFilterChange() {
    refreshData();
}

// 处理日期变化
function handleDateChange() {
    if (elements.startDate.value && elements.endDate.value) {
        elements.timeRange.value = 'custom';
        refreshData();
    }
}

// 重置筛选器
function resetFilters() {
    elements.timeRange.value = 'week';
    elements.customerFilter.value = '';
    elements.statusFilter.value = '';
    setupDateRange();
    refreshData();
}

// 刷新数据
function refreshData() {
    // 这里可以添加实际的API调用
    // 目前使用模拟数据
    console.log('刷新数据...');
    console.log('筛选条件:', {
        timeRange: elements.timeRange.value,
        startDate: elements.startDate.value,
        endDate: elements.endDate.value,
        customer: elements.customerFilter.value,
        status: elements.statusFilter.value
    });
    
    // 模拟数据加载延迟
    setTimeout(() => {
        updateStatsCards();
        renderStatisticsTable();
        updateCharts();
    }, 500);
}

// 更新图表
function updateCharts() {
    // 这里可以根据筛选条件更新图表数据
    // 目前重新初始化图表
    initCharts();
}

// 显示客户详情
function showCustomerDetail(customerName) {
    const customer = customerDetails[customerName];
    if (!customer) {
        alert('客户信息不存在');
        return;
    }
    
    // 更新抽屉标题
    elements.detailTitle.textContent = `${customerName} - 客户详情`;
    
    // 更新基本信息
    elements.detailInfo.innerHTML = `
        <div class="info-item">
            <div class="info-label">联系人</div>
            <div class="info-value">${customer.contactPerson}</div>
        </div>
        <div class="info-item">
            <div class="info-label">联系电话</div>
            <div class="info-value">${customer.phone}</div>
        </div>
        <div class="info-item">
            <div class="info-label">地址</div>
            <div class="info-value">${customer.address}</div>
        </div>
        <div class="info-item">
            <div class="info-label">总订单数</div>
            <div class="info-value">${customer.totalOrders}<span class="unit">单</span></div>
        </div>
        <div class="info-item">
            <div class="info-label">总方量</div>
            <div class="info-value">${customer.totalVolume}<span class="unit">m³</span></div>
        </div>
        <div class="info-item">
            <div class="info-label">平均方量</div>
            <div class="info-value">${customer.avgOrderVolume}<span class="unit">m³</span></div>
        </div>
        <div class="info-item">
            <div class="info-label">首次订单</div>
            <div class="info-value">${customer.firstOrderDate}</div>
        </div>
        <div class="info-item">
            <div class="info-label">最近订单</div>
            <div class="info-value">${customer.lastOrderDate}</div>
        </div>
    `;
    
    // 更新订单列表
    elements.orderList.innerHTML = customer.orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <div class="order-number">${order.orderNumber}</div>
                <div class="order-status ${getStatusClass(order.status)}">${order.status}</div>
            </div>
            <div class="order-details">
                <div>方量: ${order.volume}<span class="unit">m³</span></div>
                <div>日期: ${order.date}</div>
            </div>
        </div>
    `).join('');
    
    // 显示抽屉
    openDrawer();
}

// 获取状态样式类
function getStatusClass(status) {
    switch (status) {
        case '已完工':
            return 'completed';
        case '执行中':
            return 'in-progress';
        case '已排班':
        case '新建':
            return 'pending';
        default:
            return 'pending';
    }
}

// 打开抽屉
function openDrawer() {
    elements.drawerMask.classList.add('show');
    elements.detailDrawer.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 关闭抽屉
function closeDrawer() {
    elements.drawerMask.classList.remove('show');
    elements.detailDrawer.classList.remove('show');
    document.body.style.overflow = '';
}

// 导出报表
function exportReport() {
    const data = {
        stats: mockData.stats,
        customerStats: mockData.customerStats,
        filters: {
            timeRange: elements.timeRange.value,
            startDate: elements.startDate.value,
            endDate: elements.endDate.value,
            customer: elements.customerFilter.value,
            status: elements.statusFilter.value
        },
        exportTime: new Date().toISOString()
    };
    
    // 创建CSV内容
    const csvContent = generateCSV(data);
    
    // 下载文件
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `订单统计报表_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 生成CSV内容
function generateCSV(data) {
    const headers = ['客户名称', '订单数量', '总方量(m³)', '已完成', '进行中', '待排班', '完成率(%)'];
    const rows = data.customerStats.map(customer => [
        customer.customerName,
        customer.orderCount,
        customer.totalVolume,
        customer.completed,
        customer.inProgress,
        customer.pending,
        customer.completionRate
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage); 
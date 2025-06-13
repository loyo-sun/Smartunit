// 从URL获取资产ID
const urlParams = new URLSearchParams(window.location.search);
const assetId = urlParams.get('id');

// 模拟资产详情数据
const mockAssetDetail = {
    id: 'CMI-DT-026',
    type: '自卸车',
    model: 'SYZ320C-8',
    brand: '中联重科',
    project: '台州项目部',
    department: '设备中心A组',
    source: '自有',
    operationStatus: '经营',
    stopStatus: '停机',
    iotStatus: 'online',
    location: '浙江省台州市路桥区金清镇',
    workHours: 1248,
    maintenance: {
        lastMaintenance: '2025-06-10',
        nextMaintenance: '2025-07-10',
        maintenanceCount: 6,
        lastRepair: '2025-06-03',
        currentFault: '无',
        repairCount: 4,
        stopDuration: 43
    },
    assetInfo: {
        purchaseDate: '2021-09-15',
        startDate: '2021-10-01',
        expectedYears: 10,
        currentYears: '3年8个月',
        currentValue: 328000
    },
    costInfo: {
        repairCost: 45000,
        maintenanceCost: 28000,
        depreciationCost: 120000,
        insuranceCost: 15000
    },
    documents: [
        {
            name: '采购合同.pdf',
            type: 'pdf'
        }
    ],
    photos: [
        { url: 'images/image.svg', alt: '设备照片1' },
        { url: 'images/image.svg', alt: '设备照片2' },
        { url: 'images/image.svg', alt: '设备照片3' }
    ],
    history: [
        { date: '2025-03-01', content: '调拨至台州项目部' },
        { date: '2024-08-10', content: '完成年度保养' },
        { date: '2023-12-01', content: '维修更换液压系统' }
    ]
};

// 初始化页面
function initPage() {
    // 获取资产详情数据
    const assetDetail = getAssetDetail(assetId);
    if (!assetDetail) {
        showError('未找到资产信息');
        return;
    }

    // 更新页面内容
    updateBasicInfo(assetDetail);
    updateStatusInfo(assetDetail);
    updateMaintenanceInfo(assetDetail);
    updateAssetInfo(assetDetail);
    updateCostInfo(assetDetail);
    updateAttachmentsInfo(assetDetail);
    updateHistoryInfo(assetDetail);

    // 绑定事件
    bindEvents();
}

// 获取资产详情
function getAssetDetail(id) {
    // 实际项目中应该从服务器获取数据
    // 这里使用模拟数据
    return mockAssetDetail;
}

// 更新基本信息
function updateBasicInfo(asset) {
    const basicInfo = document.querySelector('.basic-info');
    if (!basicInfo) return;

    const infoItems = basicInfo.querySelectorAll('.info-item');
    infoItems[0].querySelector('.info-value').textContent = asset.id;
    infoItems[1].querySelector('.info-value').textContent = asset.type;
    infoItems[2].querySelector('.info-value').textContent = `${asset.type} / ${asset.model}`;
    infoItems[3].querySelector('.info-value').textContent = asset.brand;
    infoItems[4].querySelector('.info-value').textContent = asset.project;
    infoItems[5].querySelector('.info-value').textContent = asset.department;
    infoItems[6].querySelector('.info-value').textContent = asset.source;
}

// 更新状态信息
function updateStatusInfo(asset) {
    const statusInfo = document.querySelector('.status-info');
    if (!statusInfo) return;

    // 更新状态标签
    const statusTags = statusInfo.querySelector('.status-tags');
    statusTags.innerHTML = `
        <span class="tag ${asset.operationStatus === '经营' ? 'operating' : 'idle'}">${asset.operationStatus}</span>
        <span class="tag stopped">${asset.stopStatus}</span>
    `;

    // 更新物联网状态
    const iotStatus = statusInfo.querySelector('.iot-status');
    iotStatus.innerHTML = `
        <span class="status-dot ${asset.iotStatus}"></span>
        <span class="status-text">${asset.iotStatus === 'online' ? '在线' : '离线'}</span>
    `;

    // 更新位置信息
    const locationInfo = statusInfo.querySelector('.location-info');
    locationInfo.querySelector('.address').textContent = asset.location;

    // 更新工时信息
    const workHours = statusInfo.querySelector('.work-hours');
    workHours.querySelector('.hours-value').textContent = `${asset.workHours}h`;
}

// 更新维保信息
function updateMaintenanceInfo(asset) {
    const maintenanceInfo = document.querySelector('.maintenance-info');
    if (!maintenanceInfo) return;

    const infoItems = maintenanceInfo.querySelectorAll('.info-item');
    const maintenance = asset.maintenance;

    infoItems[0].querySelector('.info-value').textContent = maintenance.lastMaintenance;
    infoItems[1].querySelector('.info-value').textContent = maintenance.nextMaintenance;
    infoItems[2].querySelector('.info-value').textContent = `${maintenance.maintenanceCount}次`;
    infoItems[3].querySelector('.info-value').textContent = maintenance.lastRepair;
    infoItems[4].querySelector('.info-value').textContent = maintenance.currentFault;
    infoItems[5].querySelector('.info-value').textContent = `${maintenance.repairCount}次`;
    infoItems[6].querySelector('.info-value').textContent = `${maintenance.stopDuration}小时`;
}

// 更新资产信息
function updateAssetInfo(asset) {
    const assetInfo = document.querySelector('.lifecycle-info');
    if (!assetInfo) return;

    const infoItems = assetInfo.querySelectorAll('.info-item');
    const assetInfoData = asset.assetInfo;

    infoItems[0].querySelector('.info-value').textContent = assetInfoData.purchaseDate;
    infoItems[1].querySelector('.info-value').textContent = assetInfoData.startDate;
    infoItems[2].querySelector('.info-value').textContent = `${assetInfoData.expectedYears}年`;
    infoItems[3].querySelector('.info-value').textContent = assetInfoData.currentYears;
    infoItems[4].querySelector('.info-value').textContent = `¥ ${assetInfoData.currentValue.toLocaleString()}`;
}

// 更新成本信息
function updateCostInfo(asset) {
    const costInfo = document.querySelector('.cost-info');
    if (!costInfo) return;

    const infoItems = costInfo.querySelectorAll('.info-item');
    const costInfoData = asset.costInfo;

    infoItems[0].querySelector('.info-value').textContent = `¥ ${costInfoData.repairCost.toLocaleString()}`;
    infoItems[1].querySelector('.info-value').textContent = `¥ ${costInfoData.maintenanceCost.toLocaleString()}`;
    infoItems[2].querySelector('.info-value').textContent = `¥ ${costInfoData.depreciationCost.toLocaleString()}`;
    infoItems[3].querySelector('.info-value').textContent = `¥ ${costInfoData.insuranceCost.toLocaleString()}`;
}

// 更新附件与图片信息
function updateAttachmentsInfo(asset) {
    const attachmentsInfo = document.querySelector('.attachments-info');
    if (!attachmentsInfo) return;

    // 更新文档列表
    const docList = attachmentsInfo.querySelector('.doc-list');
    docList.innerHTML = asset.documents.map(doc => `
        <div class="doc-item">
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <span>${doc.name}</span>
        </div>
    `).join('');

    // 更新照片列表
    const photoScroll = attachmentsInfo.querySelector('.photo-scroll');
    photoScroll.innerHTML = asset.photos.map(photo => `
        <div class="photo-item">
            <img src="${photo.url}" alt="${photo.alt}">
        </div>
    `).join('');
}

// 更新附件与历史信息
function updateHistoryInfo(asset) {
    const historyInfo = document.querySelector('.history-info');
    if (!historyInfo) return;

    // 更新历史记录
    const historyList = historyInfo.querySelector('.history-list');
    historyList.innerHTML = asset.history.map(item => `
        <div class="history-item">
            <div class="history-date">${item.date}</div>
            <div class="history-content">${item.content}</div>
        </div>
    `).join('');
}

// 绑定事件
function bindEvents() {
    // 返回按钮
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', () => {
        window.history.back();
    });

    // 更多按钮
    const moreBtn = document.querySelector('.more-btn');
    moreBtn.addEventListener('click', () => {
        showActionMenu();
    });

    // 查看地图按钮
    const mapBtn = document.querySelector('.map-btn');
    mapBtn.addEventListener('click', () => {
        // 实际项目中应该跳转到地图页面
        alert('查看地图功能开发中');
    });

    // 文档点击
    const docItems = document.querySelectorAll('.doc-item');
    docItems.forEach(item => {
        item.addEventListener('click', () => {
            // 实际项目中应该打开文档预览
            alert('文档预览功能开发中');
        });
    });

    // 照片点击
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            // 实际项目中应该打开图片预览
            alert('图片预览功能开发中');
        });
    });
}

// 显示操作菜单
function showActionMenu() {
    const actions = [
        { text: '编辑信息', action: () => alert('编辑功能开发中') },
        { text: '标记停机', action: () => alert('标记停机功能开发中') },
        { text: '查看轨迹', action: () => alert('轨迹查看功能开发中') }
    ];

    // 实际项目中应该使用UI组件库的菜单组件
    const menu = document.createElement('div');
    menu.className = 'action-menu';
    menu.innerHTML = actions.map(action => `
        <div class="menu-item">${action.text}</div>
    `).join('');

    document.body.appendChild(menu);

    // 绑定菜单项点击事件
    const menuItems = menu.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            actions[index].action();
            document.body.removeChild(menu);
        });
    });

    // 点击其他区域关闭菜单
    document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && e.target !== moreBtn) {
            document.body.removeChild(menu);
            document.removeEventListener('click', closeMenu);
        }
    });
}

// 显示错误信息
function showError(message) {
    // 实际项目中应该使用UI组件库的消息组件
    alert(message);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage); 
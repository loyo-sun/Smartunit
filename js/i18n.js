let currentLanguage = 'zh-CN';
let translations = {};

// 获取缓存的语言设置
function getStoredLanguage() {
    return localStorage.getItem('preferredLanguage') || 'zh-CN';
}

// 设置语言并保存到缓存
function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    currentLanguage = lang;
    loadLanguage(lang);
}

const languageData = {
    'zh-CN': {
        title: 'Smartunit系统原型演示',
        subtitle: '智能维修费控，降低因缺件造成的停机损失',
        desktop: '电脑端',
        mobile: '移动端',
        about: '关于Smartunit',
        copyright: '© 2025 Smartunit原型演示',
        // 桌面端菜单项
        repairOrderPro: {
            title: '工单详情Pro',
            description: '智能分析工单数据，提供专业维修建议',
            features: [
                '工单全生命周期管理',
                '设备工况实时监控',
                '配件使用智能分析',
                'AI辅助决策支持'
            ]
        },
        forecast: {
            title: '配件预测',
            description: '智能预测配件需求，优化库存管理',
            features: [
                '支持均值预测和模型预测',
                '可视化趋势分析',
                '设备使用分布展示',
                '灵活的筛选和导出功能'
            ]
        },
        parts: {
            title: '配件管理',
            description: '全面管理配件信息，提升管理效率',
            features: [
                '配件基础信息管理',
                '支持批量导入导出',
                '灵活的筛选和搜索',
                '预测方式灵活配置'
            ]
        },
        assets: {
            title: '资产列表',
            description: '全面管理设备资产，提升资产管理效率',
            features: [
                '资产基础信息管理',
                '多维度筛选和搜索',
                '批量编辑功能',
                '资产状态实时监控'
            ]
        },
        orders: {
            title: '订单管理',
            description: '高效管理维修订单，提升服务响应速度',
            features: [
                '订单全生命周期管理',
                '实时订单状态追踪',
                '智能派单和分配',
                '订单数据统计分析'
            ]
        },
        // 移动端菜单项
        mobileOrders: {
            title: '订单管理',
            description: '移动端订单管理，随时随地处理订单',
            features: [
                '订单列表快速查看',
                '订单状态实时更新',
                '便捷的订单处理',
                '移动端优化体验'
            ]
        },
        maintenance: {
            title: '保养管理',
            description: '移动端保养管理，确保设备定期维护',
            features: [
                '保养计划智能提醒',
                '保养记录实时更新',
                '保养任务快速处理',
                '设备健康状态监控'
            ]
        },
        repair: {
            title: '维修管理',
            description: '移动端维修管理，快速响应设备故障',
            features: [
                '维修工单快速处理',
                '故障诊断辅助支持',
                '维修进度实时追踪',
                '维修记录完整保存'
            ]
        },
        mobileAssets: {
            title: '资产管理',
            description: '移动端资产管理，随时随地管理资产',
            features: [
                '资产信息快速查看',
                '资产状态实时更新',
                '便捷的资产编辑',
                '移动端优化体验'
            ]
        }
    },
    'en-US': {
        title: 'Smartunit System Prototype Demo',
        subtitle: 'Smart maintenance cost control, reducing downtime losses due to parts shortage',
        desktop: 'Desktop',
        mobile: 'Mobile',
        about: 'About Smartunit',
        copyright: '© 2025 Smartunit Prototype Demo',
        // Desktop menu items
        repairOrderPro: {
            title: 'Work Order Detail Pro',
            description: 'Intelligent work order data analysis with professional maintenance suggestions',
            features: [
                'Full lifecycle work order management',
                'Real-time equipment condition monitoring',
                'Smart parts usage analysis',
                'AI-assisted decision support'
            ]
        },
        forecast: {
            title: 'Parts Forecast',
            description: 'Smart parts demand prediction for optimized inventory management',
            features: [
                'Mean and model-based prediction support',
                'Visual trend analysis',
                'Equipment usage distribution display',
                'Flexible filtering and export functions'
            ]
        },
        parts: {
            title: 'Parts Management',
            description: 'Comprehensive parts information management for improved efficiency',
            features: [
                'Basic parts information management',
                'Batch import/export support',
                'Flexible filtering and search',
                'Configurable prediction methods'
            ]
        },
        assets: {
            title: 'Asset List',
            description: 'Comprehensive equipment asset management for improved efficiency',
            features: [
                'Basic asset information management',
                'Multi-dimensional filtering and search',
                'Batch editing functionality',
                'Real-time asset status monitoring'
            ]
        },
        orders: {
            title: 'Order Management',
            description: 'Efficient maintenance order management for improved service response',
            features: [
                'Full lifecycle order management',
                'Real-time order status tracking',
                'Smart order dispatching and assignment',
                'Order data statistical analysis'
            ]
        },
        // Mobile menu items
        mobileOrders: {
            title: 'Order Management',
            description: 'Mobile order management for anytime, anywhere order processing',
            features: [
                'Quick order list viewing',
                'Real-time order status updates',
                'Convenient order processing',
                'Mobile-optimized experience'
            ]
        },
        maintenance: {
            title: 'Maintenance Management',
            description: 'Mobile maintenance management for regular equipment maintenance',
            features: [
                'Smart maintenance plan reminders',
                'Real-time maintenance record updates',
                'Quick maintenance task processing',
                'Equipment health status monitoring'
            ]
        },
        repair: {
            title: 'Repair Management',
            description: 'Mobile repair management for quick response to equipment failures',
            features: [
                'Quick repair work order processing',
                'Fault diagnosis support',
                'Real-time repair progress tracking',
                'Complete repair record preservation'
            ]
        },
        mobileAssets: {
            title: 'Asset Management',
            description: 'Mobile asset management for anytime, anywhere asset management',
            features: [
                'Quick asset information viewing',
                'Real-time asset status updates',
                'Convenient asset editing',
                'Mobile-optimized experience'
            ]
        }
    }
};

function loadLanguage(lang) {
    try {
        console.log('Loading language:', lang);
        translations = languageData[lang];
        console.log('Translations loaded:', translations);
        updateContent();
    } catch (error) {
        console.error('Error loading language:', error);
    }
}

function updateContent() {
    console.log('Updating content with translations:', translations);
    
    // 更新页面标题和副标题
    const title = document.querySelector('.header h1');
    const subtitle = document.querySelector('.header p');
    if (title) title.textContent = translations.title;
    if (subtitle) subtitle.textContent = translations.subtitle;

    // 更新标签页
    const tabs = document.querySelectorAll('.tab');
    if (tabs[0]) tabs[0].textContent = translations.desktop;
    if (tabs[1]) tabs[1].textContent = translations.mobile;

    // 更新页脚
    const aboutLink = document.querySelector('.footer a');
    const copyright = document.querySelector('.footer p:last-child');
    if (aboutLink) aboutLink.textContent = translations.about;
    if (copyright) copyright.textContent = translations.copyright;

    // 更新桌面端内容
    updateDesktopContent();
    
    // 更新移动端内容
    updateMobileContent();
}

// 更新桌面端内容
function updateDesktopContent() {
    // 工单详情Pro
    const repairOrderPro = document.querySelector('#desktop .menu-item:nth-child(1)');
    if (repairOrderPro) {
        repairOrderPro.querySelector('h2').textContent = translations.repairOrderPro.title;
        repairOrderPro.querySelector('p').textContent = translations.repairOrderPro.description;
        updateFeatures(repairOrderPro, translations.repairOrderPro.features);
    }

    // 配件预测
    const forecast = document.querySelector('#desktop .menu-item:nth-child(2)');
    if (forecast) {
        forecast.querySelector('h2').textContent = translations.forecast.title;
        forecast.querySelector('p').textContent = translations.forecast.description;
        updateFeatures(forecast, translations.forecast.features);
    }

    // 配件管理
    const parts = document.querySelector('#desktop .menu-item:nth-child(3)');
    if (parts) {
        parts.querySelector('h2').textContent = translations.parts.title;
        parts.querySelector('p').textContent = translations.parts.description;
        updateFeatures(parts, translations.parts.features);
    }

    // 资产列表
    const assets = document.querySelector('#desktop .menu-item:nth-child(4)');
    if (assets) {
        assets.querySelector('h2').textContent = translations.assets.title;
        assets.querySelector('p').textContent = translations.assets.description;
        updateFeatures(assets, translations.assets.features);
    }

    // 订单管理
    const orders = document.querySelector('#desktop .menu-item:nth-child(5)');
    if (orders) {
        orders.querySelector('h2').textContent = translations.orders.title;
        orders.querySelector('p').textContent = translations.orders.description;
        updateFeatures(orders, translations.orders.features);
    }
}

// 更新移动端内容
function updateMobileContent() {
    // 订单管理
    const mobileOrders = document.querySelector('#mobile .menu-item:nth-child(1)');
    if (mobileOrders) {
        mobileOrders.querySelector('h2').textContent = translations.mobileOrders.title;
        mobileOrders.querySelector('p').textContent = translations.mobileOrders.description;
        updateFeatures(mobileOrders, translations.mobileOrders.features);
    }

    // 保养管理
    const maintenance = document.querySelector('#mobile .menu-item:nth-child(2)');
    if (maintenance) {
        maintenance.querySelector('h2').textContent = translations.maintenance.title;
        maintenance.querySelector('p').textContent = translations.maintenance.description;
        updateFeatures(maintenance, translations.maintenance.features);
    }

    // 维修管理
    const repair = document.querySelector('#mobile .menu-item:nth-child(3)');
    if (repair) {
        repair.querySelector('h2').textContent = translations.repair.title;
        repair.querySelector('p').textContent = translations.repair.description;
        updateFeatures(repair, translations.repair.features);
    }

    // 资产管理
    const mobileAssets = document.querySelector('#mobile .menu-item:nth-child(4)');
    if (mobileAssets) {
        mobileAssets.querySelector('h2').textContent = translations.mobileAssets.title;
        mobileAssets.querySelector('p').textContent = translations.mobileAssets.description;
        updateFeatures(mobileAssets, translations.mobileAssets.features);
    }
}

// 更新特性列表
function updateFeatures(element, features) {
    const featuresList = element.querySelector('.features');
    if (featuresList) {
        featuresList.innerHTML = '';
        features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }
}

function changeLanguage(lang) {
    console.log('Changing language to:', lang);
    setLanguage(lang);
}

// 初始化加载默认语言
document.addEventListener('DOMContentLoaded', () => {
    // 获取缓存的语言设置
    const storedLang = getStoredLanguage();
    
    // 设置语言选择器的初始值
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = storedLang;
    }
    
    // 加载缓存的语言
    loadLanguage(storedLang);
}); 
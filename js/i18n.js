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
    
    // 如果是forecast页面，手动触发一次更新
    if (window.location.pathname.includes('/forecast/')) {
        setTimeout(() => {
            if (typeof updateI18nStatic === 'function') {
                updateI18nStatic();
            }
            if (typeof updateDynamicContent === 'function') {
                updateDynamicContent();
            }
        }, 300);
    }
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
        },
        // repair-order-detail页面翻译
        repairOrderDetail: {
            title: '维修工单详情',
            workOrder: {
                title: '工单信息',
                equipmentCode: '设备编码',
                creator: '创建人',
                repairDate: '维修日期',
                completionTime: '完工时间',
                faultDescription: '故障描述',
                rootCause: '故障根因',
                laborCost: '工时成本',
                partsCost: '配件成本',
                partsDetail: '配件明细',
                operationConditions: '设备工况信息',
                engineHours: '发动机小时',
                mileage: '行驶里程',
                fuelConsumption: '总油耗',
                volume: '方量'
            },
            parts: {
                code: '配件编码',
                name: '名称',
                unit: '单位',
                quantity: '数量',
                subtotal: '小计',
                unitValue: '个'
            },
            ai: {
                inspectorAssistant: 'AI识别助手',
                analysisComplete: 'AI分析完成！发现3个问题，快来看看吧~',
                riskLevel: {
                    high: '严重',
                    medium: '中等',
                    low: '一般'
                },
                reviewNote: '由AI模型初审，请结合人工作业复核'
            },
            risks: {
                partReplacement: '异常换件提醒',
                partReplacementDesc: '液压泵更换寿命仅 52 天，远低于行业均值 180 天',
                repeatedRepair: '重复维修识别',
                repeatedRepairDesc: '同部件两次更换间隔仅 12 天，维修人相同',
                repairScore: '维修合理性评分',
                repairScoreDesc: '故障现象与原因匹配度仅 45%，建议复审'
            },
            actions: {
                downloadReport: '一键导出报告'
            },
            fault: {
                description: '液压系统压力异常',
                cause: '液压泵密封圈损坏',
                parts: {
                    main: '液压泵',
                    detail: '密封圈'
                },
                analysis: {
                    title: '匹配分析',
                    content: '故障描述与维修方案存在偏差，建议补充故障现象描述'
                },
                history: {
                    title: '维修历史',
                    content: '近30天内维修3次，建议进行设备全面检查'
                },
                suggestion: {
                    title: '建议操作',
                    content: '检查设备使用情况，评估是否需要更换其他部件'
                },
                score: '风险评分: 75分'
            }
        },
        // forecast页面多语言
        forecastPage: {
            title: '配件预测',
            filter: {
                month: '选择月份',
                search: '搜索配件编码/名称',
                type: '全部配件类型',
                typeOptions: {
                    all: '全部配件类型',
                    consumable: '易损件',
                    critical: '关键件',
                    regular: '常备件'
                },
                forecastType: '全部预测方式',
                forecastTypeOptions: {
                    all: '全部预测方式',
                    mean: '均值预测',
                    model: '模型预测'
                },
                reset: '重置',
                export: '导出'
            },
            table: {
                code: '配件编码',
                name: '配件名称',
                model: '型号',
                unit: '单位',
                price: '价格',
                type: '配件类型',
                forecastType: '预测方式',
                forecastQty: '预测数量',
                action: '操作',
                detail: '详情'
            },
            pagination: {
                prev: '上一页',
                next: '下一页'
            },
            drawer: {
                title: '配件预测详情',
                close: '关闭',
                info: {
                    code: '配件编码',
                    model: '型号',
                    unit: '单位',
                    type: '配件类型',
                    forecastQty: '预测数量'
                },
                trend: '使用与预测趋势',
                equipment: '设备分布',
                equipmentTable: {
                    code: '设备编码',
                    name: '设备名称',
                    project: '所属项目',
                    qty: '预计用量'
                }
            },
            tag: {
                consumable: '易损件',
                critical: '关键件',
                regular: '常备件'
            }
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
        },
        // repair-order-detail page translations
        repairOrderDetail: {
            title: 'Repair Work Order Detail',
            workOrder: {
                title: 'Work Order Information',
                equipmentCode: 'Equipment Code',
                creator: 'Creator',
                repairDate: 'Repair Date',
                completionTime: 'Completion Time',
                faultDescription: 'Fault Description',
                rootCause: 'Root Cause',
                laborCost: 'Labor Cost',
                partsCost: 'Parts Cost',
                partsDetail: 'Parts Detail',
                operationConditions: 'Equipment Operation Data',
                engineHours: 'Engine Hours',
                mileage: 'Mileage',
                fuelConsumption: 'Total Fuel Consumption',
                volume: 'Volume'
            },
            parts: {
                code: 'Part Code',
                name: 'Name',
                unit: 'Unit',
                quantity: 'Quantity',
                subtotal: 'Subtotal',
                unitValue: 'pcs'
            },
            ai: {
                inspectorAssistant: 'AI Inspector Assistant',
                analysisComplete: 'AI analysis complete! Found 3 issues, check them out~',
                riskLevel: {
                    high: 'High',
                    medium: 'Medium',
                    low: 'Low'
                },
                reviewNote: 'Preliminary review by AI model, please verify with manual inspection'
            },
            risks: {
                partReplacement: 'Abnormal Part Replacement Alert',
                partReplacementDesc: 'Hydraulic pump replacement life only 52 days, far below industry average of 180 days',
                repeatedRepair: 'Repeated Repair Detection',
                repeatedRepairDesc: 'Same part replaced twice within 12 days, same repair person',
                repairScore: 'Repair Reasonableness Score',
                repairScoreDesc: 'Fault phenomenon and cause match rate only 45%, review recommended'
            },
            actions: {
                downloadReport: 'Download Report'
            },
            fault: {
                description: 'Hydraulic System Pressure Abnormal',
                cause: 'Hydraulic Pump Seal Ring Damaged',
                parts: {
                    main: 'Hydraulic Pump',
                    detail: 'Seal Ring'
                },
                analysis: {
                    title: 'Matching Analysis',
                    content: 'Fault description and repair solution have deviation, suggest to supplement fault phenomenon description'
                },
                history: {
                    title: 'Repair History',
                    content: '3 repairs in the last 30 days, suggest comprehensive equipment inspection'
                },
                suggestion: {
                    title: 'Suggested Actions',
                    content: 'Check equipment usage and evaluate if other parts need replacement'
                },
                score: 'Risk Score: 75 points'
            }
        },
        // forecast页面多语言
        forecastPage: {
            title: 'Parts Forecast',
            filter: {
                month: 'Select Month',
                search: 'Search Part Code/Name',
                type: 'All Types',
                typeOptions: {
                    all: 'All Types',
                    consumable: 'Consumable',
                    critical: 'Critical',
                    regular: 'Regular'
                },
                forecastType: 'All Forecast Methods',
                forecastTypeOptions: {
                    all: 'All Forecast Methods',
                    mean: 'Mean Forecast',
                    model: 'Model Forecast'
                },
                reset: 'Reset',
                export: 'Export'
            },
            table: {
                code: 'Part Code',
                name: 'Part Name',
                model: 'Model',
                unit: 'Unit',
                price: 'Price',
                type: 'Type',
                forecastType: 'Forecast Method',
                forecastQty: 'Forecast Qty',
                action: 'Action',
                detail: 'Detail'
            },
            pagination: {
                prev: 'Prev',
                next: 'Next'
            },
            drawer: {
                title: 'Part Forecast Detail',
                close: 'Close',
                info: {
                    code: 'Part Code',
                    model: 'Model',
                    unit: 'Unit',
                    type: 'Type',
                    forecastQty: 'Forecast Qty'
                },
                trend: 'Usage & Forecast Trend',
                equipment: 'Equipment Distribution',
                equipmentTable: {
                    code: 'Equipment Code',
                    name: 'Equipment Name',
                    project: 'Project',
                    qty: 'Forecast Qty'
                }
            },
            tag: {
                consumable: 'Consumable',
                critical: 'Critical',
                regular: 'Regular'
            }
        }
    }
};

function loadLanguage(lang) {
    try {
        translations = languageData[lang];
        // 确保translations设置为全局变量
        window.translations = translations;
        updateContent();
    } catch (error) {
        console.error('Error loading language:', error);
    }
}

function updateContent() {
    // 检查当前页面类型
    const isForecastPage = window.location.pathname.includes('/forecast/');
    const isRepairOrderDetailPage = window.location.pathname.includes('/repair-order-detail/');
    
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

    // 根据页面类型更新内容
    if (isForecastPage) {
        updateForecastContent();
    } else if (isRepairOrderDetailPage) {
        updateRepairOrderDetailContent();
    } else {
        // 更新桌面端内容
        updateDesktopContent();
        
        // 更新移动端内容
        updateMobileContent();
    }
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

// 更新repair-order-detail页面内容
function updateRepairOrderDetailContent() {
    if (!translations.repairOrderDetail) return;
    
    // 更新页面标题
    const title = document.querySelector('title[data-i18n="repairOrderDetail.title"]');
    if (title) title.textContent = translations.repairOrderDetail.title;
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let value = translations.repairOrderDetail;
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // 尝试从根级别查找
                value = translations;
                for (const rootKey of keys) {
                    if (value && value[rootKey]) {
                        value = value[rootKey];
                    } else {
                        return;
                    }
                }
                break;
            }
        }
        
        if (element.tagName === 'INPUT') {
            element.placeholder = value;
        } else {
            element.textContent = value;
        }
    });
}

// 更新forecast页面内容
function updateForecastContent() {
    if (!translations.forecastPage) {
        return;
    }
    
    // 更新页面标题
    const title = document.querySelector('title[data-i18n="forecastPage.title"]');
    if (title) title.textContent = translations.forecastPage.title;
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let value = translations.forecastPage;
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // 尝试从根级别查找
                value = translations;
                for (const rootKey of keys) {
                    if (value && value[rootKey]) {
                        value = value[rootKey];
                    } else {
                        return;
                    }
                }
                break;
            }
        }
        
        if (element.tagName === 'INPUT') {
            element.placeholder = value;
        } else {
            element.textContent = value;
        }
    });
    
    // 更新placeholder属性
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = translations.forecastPage;
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return;
            }
        }
        
        element.placeholder = value;
    });
    
    // 更新动态内容（如果存在updateDynamicContent函数）
    if (typeof updateDynamicContent === 'function') {
        updateDynamicContent();
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
    
    // 确保translations设置为全局变量
    if (!window.translations) {
        window.translations = translations;
    }
}); 
// 语言数据
const languageData = {
    'zh-CN': {
        "title": "关于我们 - Smartunit",
        "slogan": "数据驱动智慧运营",
        "about": {
            "title": "关于产品",
            "description1": "Smartunit 是一款以\"数据驱动优化\"为核心的设备智能管理平台，帮助工程设备企业实现从\"被动响应\"到\"主动优化\"的转型。",
            "description2": "Smartunit不仅是一个设备管理系统，更是一套围绕设备全生命周期运行的优化引擎，通过数字化手段、数据模型和智能识别，实现从设备资产、维修流程、配件使用到运营成本的全面优化。"
        },
        "optimization": {
            "title": "我们在优化什么？",
            "cards": {
                "asset": {
                    "title": "资产数智优化",
                    "desc": "构建统一资产列表，打通调拨、折旧、出勤、状态等数据，实现资产全生命周期管理，避免资产沉睡与重复购置。"
                },
                "workorder": {
                    "title": "工单智能优化",
                    "desc": "移动端闭环工单体系，结合AI识别机制，优化维修指派与审批流转，提升响应速度与决策质量。"
                },
                "parts": {
                    "title": "配件合理优化",
                    "desc": "基于换件预测模型，实现配件储备精准匹配，降低备件资金占用，提升使用效率。"
                },
                "dispatch": {
                    "title": "调度协同优化",
                    "desc": "以订单为驱动，优化车辆与人员排班，提升资源利用率，增强调度灵活性。"
                },
                "quality": {
                    "title": "维修质量优化",
                    "desc": "构建重复维修识别、异常换件检测等能力，持续优化维修质量控制机制。"
                },
                "cost": {
                    "title": "成本效益优化",
                    "desc": "通过成本分析、效率评估、ROI追踪等维度，实现设备运营效益最大化。"
                }
            }
        },
        "brain": {
            "title": "Smartunit 的\"优化大脑\"",
            "cards": {
                "communication": {
                    "title": "沟通脑",
                    "desc": "标准化维修语言，提炼结构化故障特征，优化维修知识沉淀。",
                    "features": [
                        "统一维修术语库",
                        "故障特征提取",
                        "知识图谱构建",
                        "维修经验沉淀"
                    ]
                },
                "logic": {
                    "title": "逻辑脑",
                    "desc": "基于数据时序，优化换件与维修决策，识别风险与浪费。",
                    "features": [
                        "时序数据分析",
                        "智能决策支持",
                        "风险预警机制",
                        "成本优化建议"
                    ]
                }
            }
        },
        "footer": {
            "copyright": "© 2025 Smartunit原型演示"
        }
    },
    'en-US': {
        "title": "About Us - Smartunit",
        "slogan": "Data-Driven Smart Operations",
        "about": {
            "title": "About the Product",
            "description1": "Smartunit is a device intelligent management platform centered on 'data-driven optimization', helping engineering equipment enterprises transform from 'passive response' to 'active optimization'.",
            "description2": "Smartunit is not just a device management system, but a comprehensive optimization engine for the entire device lifecycle. Through digital means, data models, and intelligent recognition, it achieves comprehensive optimization from device assets, maintenance processes, parts usage to operational costs."
        },
        "optimization": {
            "title": "What Are We Optimizing?",
            "cards": {
                "asset": {
                    "title": "Asset Digital Optimization",
                    "desc": "Build a unified asset list, integrate transfer, depreciation, attendance, and status data to achieve full lifecycle asset management, avoiding asset dormancy and duplicate purchases."
                },
                "workorder": {
                    "title": "Work Order Intelligence",
                    "desc": "Mobile closed-loop work order system, combined with AI recognition mechanism, optimizes maintenance assignment and approval flow, improving response speed and decision quality."
                },
                "parts": {
                    "title": "Parts Rationalization",
                    "desc": "Based on parts replacement prediction model, achieve precise parts inventory matching, reduce spare parts capital occupation, and improve usage efficiency."
                },
                "dispatch": {
                    "title": "Dispatch Coordination",
                    "desc": "Order-driven optimization of vehicle and personnel scheduling, improving resource utilization and enhancing dispatch flexibility."
                },
                "quality": {
                    "title": "Maintenance Quality",
                    "desc": "Build capabilities for repeated maintenance recognition and abnormal parts replacement detection to continuously optimize maintenance quality control mechanisms."
                },
                "cost": {
                    "title": "Cost-Effectiveness",
                    "desc": "Achieve maximum equipment operational efficiency through cost analysis, efficiency evaluation, and ROI tracking."
                }
            }
        },
        "brain": {
            "title": "Smartunit's 'Optimization Brain'",
            "cards": {
                "communication": {
                    "title": "Communication Brain",
                    "desc": "Standardize maintenance language, extract structured fault characteristics, and optimize maintenance knowledge accumulation.",
                    "features": [
                        "Unified maintenance terminology",
                        "Fault feature extraction",
                        "Knowledge graph construction",
                        "Maintenance experience accumulation"
                    ]
                },
                "logic": {
                    "title": "Logic Brain",
                    "desc": "Based on data time series, optimize parts replacement and maintenance decisions, identify risks and waste.",
                    "features": [
                        "Time series data analysis",
                        "Intelligent decision support",
                        "Risk warning mechanism",
                        "Cost optimization suggestions"
                    ]
                }
            }
        },
        "footer": {
            "copyright": "© 2025 Smartunit Prototype Demo"
        }
    }
};

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

// 加载语言
function loadLanguage(lang) {
    try {
        translations = languageData[lang];
        updateContent();
        
        // 更新语言选择器的值
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = lang;
        }
    } catch (error) {
        console.error('Error loading language:', error);
    }
}

// 更新页面内容
function updateContent() {
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        if (value !== undefined) {
            if (element.tagName === 'INPUT') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

// 获取嵌套对象的属性值
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

// 切换语言
function changeLanguage(lang) {
    setLanguage(lang);
}

// 初始化
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

    // 为优化卡片添加动画效果
    const optimizationCards = document.querySelectorAll('.optimization-card');
    optimizationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 为大脑卡片添加动画效果
    const brainCards = document.querySelectorAll('.brain-card');
    brainCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + index * 200);
    });

    // 为大脑卡片添加悬停效果
    brainCards.forEach(card => {
        const processIcon = card.querySelector('.process-icon');
        card.addEventListener('mouseenter', () => {
            processIcon.style.transition = 'transform 0.5s ease';
            processIcon.style.transform = 'rotate(180deg)';
        });
        card.addEventListener('mouseleave', () => {
            processIcon.style.transform = 'rotate(0deg)';
        });
    });

    // 为特性列表项添加动画效果
    const features = document.querySelectorAll('.features li');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            feature.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, 800 + index * 100);
    });
}); 
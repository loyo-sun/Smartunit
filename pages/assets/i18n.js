let currentLanguage = 'zh-CN';
let translations = {};

// 获取缓存的语言设置
function getStoredLanguage() {
    return localStorage.getItem('preferredLanguage') || 'zh-CN';
}

// 设置语言并保存到缓存
function setLanguage(lang) {
    console.log('Setting language to:', lang);
    localStorage.setItem('preferredLanguage', lang);
    currentLanguage = lang;
    translations = languageData[lang];
    console.log('Translations set:', translations);
    loadLanguage(lang);
}

const languageData = {
    'zh-CN': {
        "title": "资产列表",
        "search": {
            "assetCode": "资产编码/名称",
            "costCenter": "成本归属",
            "purchaseEntity": "采购主体",
            "assetType": "资产类型",
            "selectPlaceholder": "请选择",
            "inputPlaceholder": "请输入",
            "buttons": {
                "reset": "重置",
                "expand": "展开"
            }
        },
        "actions": {
            "add": "新增资产",
            "batchEdit": "批量编辑"
        },
        "table": {
            "selectAll": "全选",
            "headers": {
                "deviceCode": "设备编码",
                "downtimeStatus": "停机状态",
                "deviceModel": "设备型号",
                "assetName": "资产名称",
                "operationStatus": "经营状态",
                "purchaseTime": "采购时间",
                "createTime": "创建时间",
                "iotStatus": "物联状态",
                "purchaseEntity": "采购主体",
                "costCenter": "成本归属",
                "customFields": "自定义字段多选",
                "actions": "操作"
            },
            "actions": {
                "edit": "编辑",
                "delete": "删除"
            },
            "status": {
                "running": "运行中",
                "downtime": "停机",
                "iot": "已连接",
                "online": "在线",
                "offline": "离线",
                "inUse": "在用",
                "idle": "闲置"
            },
            "example": {
                "deviceCode": "DEV001",
                "model": "Model A",
                "name": "资产一号",
                "purchaseTime": "2024-01-01",
                "createTime": "2024-01-01",
                "purchaseEntity": "总部",
                "costCenter": "研发部",
                "customFields": "自定义1,自定义2",
                "deviceCode2": "DEV002",
                "model2": "Model B",
                "name2": "资产二号",
                "purchaseTime2": "2024-01-02",
                "createTime2": "2024-01-02",
                "purchaseEntity2": "分部",
                "costCenter2": "市场部",
                "customFields2": "自定义3,自定义4"
            },
            "pagination": {
                "ellipsis": "...",
                "page": "页"
            }
        },
        "pagination": {
            "total": "总计",
            "goTo": "跳转到"
        }
    },
    'en-US': {
        "title": "Asset List",
        "search": {
            "assetCode": "Asset Code/Name",
            "costCenter": "Cost Center",
            "purchaseEntity": "Purchase Entity",
            "assetType": "Asset Type",
            "selectPlaceholder": "Please Select",
            "inputPlaceholder": "Please Enter",
            "buttons": {
                "reset": "Reset",
                "expand": "Expand"
            }
        },
        "actions": {
            "add": "Add Asset",
            "batchEdit": "Batch Edit"
        },
        "table": {
            "selectAll": "Select All",
            "headers": {
                "deviceCode": "Device Code",
                "downtimeStatus": "Downtime Status",
                "deviceModel": "Device Model",
                "assetName": "Asset Name",
                "operationStatus": "Operation Status",
                "purchaseTime": "Purchase Time",
                "createTime": "Create Time",
                "iotStatus": "IoT Status",
                "purchaseEntity": "Purchase Entity",
                "costCenter": "Cost Center",
                "customFields": "Custom Fields",
                "actions": "Actions"
            },
            "actions": {
                "edit": "Edit",
                "delete": "Delete"
            },
            "status": {
                "running": "Running",
                "downtime": "Downtime",
                "iot": "Connected",
                "online": "Online",
                "offline": "Offline",
                "inUse": "In Use",
                "idle": "Idle"
            },
            "example": {
                "deviceCode": "DEV001",
                "model": "Model A",
                "name": "Asset One",
                "purchaseTime": "2024-01-01",
                "createTime": "2024-01-01",
                "purchaseEntity": "Headquarters",
                "costCenter": "R&D Department",
                "customFields": "Custom 1, Custom 2",
                "deviceCode2": "DEV002",
                "model2": "Model B",
                "name2": "Asset Two",
                "purchaseTime2": "2024-01-02",
                "createTime2": "2024-01-02",
                "purchaseEntity2": "Branch",
                "costCenter2": "Marketing",
                "customFields2": "Custom 3, Custom 4"
            },
            "pagination": {
                "ellipsis": "...",
                "page": "Page"
            }
        },
        "pagination": {
            "total": "Total",
            "goTo": "Go to"
        }
    }
};

function loadLanguage(lang) {
    try {
        console.log('Loading language:', lang);
        translations = languageData[lang];
        console.log('Translations loaded:', translations);
        
        // 确保状态文本的翻译正确加载
        const statusData = getNestedValue(translations, 'table.status');
        console.log('Status data loaded:', statusData);
        
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = getNestedValue(translations, key);
            console.log(`Updating element with key ${key}:`, value, 'Current text:', element.textContent);
            if (value !== undefined) {
                element.textContent = value;
                console.log(`Updated element text to: ${value}`);
            } else {
                console.warn(`Translation not found for key: ${key}`);
            }
        });

        // 更新所有带有 data-i18n-placeholder 属性的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const value = getNestedValue(translations, key);
            if (value !== undefined) {
                element.placeholder = value;
            }
        });

        // 更新所有带有 data-i18n-title 属性的元素
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const value = getNestedValue(translations, key);
            if (value !== undefined) {
                element.title = value;
            }
        });

        // 特别处理状态文本
        if (statusData) {
            console.log('Found status data:', statusData);
            Object.keys(statusData).forEach(key => {
                const selector = `[data-i18n="table.status.${key}"]`;
                console.log('Looking for elements with selector:', selector);
                const elements = document.querySelectorAll(selector);
                console.log(`Found ${elements.length} elements for status ${key}`);
                elements.forEach(element => {
                    const value = statusData[key];
                    console.log(`Updating status text for ${key}:`, value);
                    element.textContent = value;
                });
            });
        } else {
            console.warn('No status data found in translations');
        }
    } catch (error) {
        console.error('Error loading language:', error);
    }
}

function getNestedValue(obj, path) {
    try {
        console.log('Getting nested value for path:', path, 'from object:', obj);
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            console.log('Current key:', key, 'Current value:', current);
            if (current === undefined || current === null) {
                console.log('Value not found for path:', path);
                return undefined;
            }
            current = current[key];
        }
        
        console.log('Final value:', current);
        return current;
    } catch (error) {
        console.warn(`Error getting translation for path: ${path}`, error);
        return undefined;
    }
}

function changeLanguage(lang) {
    console.log('Changing language to:', lang);
    setLanguage(lang);
    
    // 添加调试信息
    console.log('Current translations:', translations);
    console.log('Elements with data-i18n:', document.querySelectorAll('[data-i18n]').length);
    
    // 检查状态文本的翻译
    const statusElements = document.querySelectorAll('[data-i18n^="table.status"]');
    console.log('Status elements found:', statusElements.length);
    statusElements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        console.log(`Status element ${key}:`, value);
        if (value !== undefined) {
            element.textContent = value;
            console.log(`Updated status text to: ${value}`);
        } else {
            console.warn(`Translation not found for status: ${key}`);
        }
    });
}

// 初始化函数
function initializeLanguage() {
    const storedLang = getStoredLanguage();
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = storedLang;
    }
    loadLanguage(storedLang);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeLanguage); 
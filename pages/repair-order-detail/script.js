// 语言配置
const translations = {
    zh: {
        workOrder: {
            actualData: '工单信息',
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
    en: {
        workOrder: {
            actualData: 'Information',
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
            name: 'Part Name',
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
    }
};

// 当前语言
let currentLang = 'zh';

// 切换语言
function switchLanguage(lang) {
    currentLang = lang;
    
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (element.tagName === 'INPUT') {
            element.placeholder = value;
        } else {
            element.textContent = value;
        }
    });
}

// 配件列表
let partsList = [];

// 添加配件
function addPart() {
    const partName = document.getElementById('partName').value;
    const quantity = document.getElementById('partQuantity').value;
    const price = document.getElementById('partPrice').value;

    if (!partName || !quantity || !price) {
        alert('请填写完整的配件信息');
        return;
    }

    partsList.push({
        name: partName,
        quantity: quantity,
        price: price
    });

    updatePartsTable();
    clearPartForm();
}

// 删除配件
function deletePart(index) {
    partsList.splice(index, 1);
    updatePartsTable();
}

// 更新配件表格
function updatePartsTable() {
    const tbody = document.querySelector('.parts-table tbody');
    tbody.innerHTML = '';

    partsList.forEach((part, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${part.name}</td>
            <td>${part.quantity}</td>
            <td>${part.price}</td>
            <td>
                <button class="delete-part-btn" onclick="deletePart(${index})">
                    ${translations[currentLang]['delete']}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 清空配件表单
function clearPartForm() {
    document.getElementById('partName').value = '';
    document.getElementById('partQuantity').value = '';
    document.getElementById('partPrice').value = '';
}

// 提交表单
function submitForm() {
    // 这里添加表单提交逻辑
    const formData = {
        equipmentCode: document.getElementById('equipmentCode').value,
        creator: document.getElementById('creator').value,
        repairDate: document.getElementById('repairDate').value,
        completionTime: document.getElementById('completionTime').value,
        faultDescription: document.getElementById('faultDescription').value,
        rootCause: document.getElementById('rootCause').value,
        laborCost: document.getElementById('laborCost').value,
        partsCost: document.getElementById('partsCost').value,
        operationConditions: document.getElementById('operationConditions').value,
        parts: partsList
    };

    console.log('Form data:', formData);
    // TODO: 发送到后端API
}

// 保存草稿
function saveDraft() {
    // 这里添加保存草稿逻辑
    const formData = {
        equipmentCode: document.getElementById('equipmentCode').value,
        creator: document.getElementById('creator').value,
        repairDate: document.getElementById('repairDate').value,
        completionTime: document.getElementById('completionTime').value,
        faultDescription: document.getElementById('faultDescription').value,
        rootCause: document.getElementById('rootCause').value,
        laborCost: document.getElementById('laborCost').value,
        partsCost: document.getElementById('partsCost').value,
        operationConditions: document.getElementById('operationConditions').value,
        parts: partsList
    };

    localStorage.setItem('repairOrderDraft', JSON.stringify(formData));
    alert('草稿已保存');
}

// 页面加载时检查是否有草稿
window.addEventListener('load', () => {
    const draft = localStorage.getItem('repairOrderDraft');
    if (draft) {
        const formData = JSON.parse(draft);
        // 填充表单
        Object.keys(formData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = formData[key];
            }
        });
        if (formData.parts) {
            partsList = formData.parts;
            updatePartsTable();
        }
    }
});

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 语言切换按钮事件监听
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });

    // 导出报告功能
    const exportBtn = document.querySelector('.export-btn');
    exportBtn.addEventListener('click', function() {
        // 获取所有已勾选的风险项
        const checkedRisks = Array.from(document.querySelectorAll('.risk-item input[type="checkbox"]:checked'))
            .map(checkbox => {
                const riskItem = checkbox.closest('.risk-item');
                return {
                    title: riskItem.querySelector('label').textContent,
                    description: riskItem.querySelector('.risk-description').textContent,
                    level: riskItem.classList.contains('high') ? 'high' : 
                           riskItem.classList.contains('medium') ? 'medium' : 'low',
                    details: Array.from(riskItem.querySelectorAll('.detail-item')).map(item => ({
                        label: item.querySelector('.detail-label').textContent,
                        value: item.querySelector('.detail-value').textContent
                    }))
                };
            });

        // 构建报告数据
        const reportData = {
            workOrder: {
                equipmentCode: document.querySelector('.info-item:nth-child(1) .info-value').textContent,
                repairDate: document.querySelector('.info-item:nth-child(2) .info-value').textContent,
                faultDescription: document.querySelector('.info-item:nth-child(3) .info-value').textContent,
                rootCause: document.querySelector('.info-item:nth-child(4) .info-value').textContent,
                laborCost: document.querySelector('.info-item:nth-child(5) .info-value').textContent,
                partsCost: document.querySelector('.info-item:nth-child(6) .info-value').textContent,
                parts: Array.from(document.querySelectorAll('.parts-table tbody tr')).map(row => ({
                    code: row.cells[0].textContent,
                    name: row.cells[1].textContent,
                    unit: row.cells[2].textContent,
                    quantity: row.cells[3].textContent,
                    subtotal: row.cells[4].textContent
                }))
            },
            risks: checkedRisks,
            riskScore: document.querySelector('.risk-score').textContent,
            exportDate: new Date().toISOString(),
            language: currentLang
        };

        // 创建下载链接
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `work-order-report-${reportData.workOrder.equipmentCode}-${currentLang}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // 初始化语言
    switchLanguage('zh');
}); 
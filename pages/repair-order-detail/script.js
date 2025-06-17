// 配件列表
let partsList = [];

// 添加配件
function addPart() {
    const partName = document.getElementById('partName')?.value;
    const quantity = document.getElementById('partQuantity')?.value;
    const price = document.getElementById('partPrice')?.value;

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
    if (!tbody) return;

    tbody.innerHTML = '';
    
    // 添加默认的配件数据
    const defaultParts = [
        { code: 'P001', name: '液压泵', unit: '个', quantity: 1, price: '¥2,500' },
        { code: 'P002', name: '密封圈', unit: '个', quantity: 2, price: '¥1,000' }
    ];

    defaultParts.forEach(part => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${part.code}</td>
            <td>${part.name}</td>
            <td>${part.unit}</td>
            <td>${part.quantity}</td>
            <td>${part.price}</td>
        `;
        tbody.appendChild(row);
    });

    // 添加动态配件
    partsList.forEach((part, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>P${String(index + 3).padStart(3, '0')}</td>
            <td>${part.name}</td>
            <td>个</td>
            <td>${part.quantity}</td>
            <td>¥${part.price}</td>
            <td>
                <button onclick="deletePart(${index})" class="delete-btn">删除</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 清空配件表单
function clearPartForm() {
    const partName = document.getElementById('partName');
    const partQuantity = document.getElementById('partQuantity');
    const partPrice = document.getElementById('partPrice');
    
    if (partName) partName.value = '';
    if (partQuantity) partQuantity.value = '';
    if (partPrice) partPrice.value = '';
}

// 提交表单
function submitForm() {
    // 这里可以添加表单提交逻辑
    console.log('Form submitted');
    alert('表单提交成功');
}

// 保存草稿
function saveDraft() {
    // 这里可以添加保存草稿逻辑
    console.log('Draft saved');
    alert('草稿保存成功');
}

// 导出报告
function exportReport() {
    // 这里可以添加导出报告逻辑
    console.log('Report exported');
    alert('报告导出成功');
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    console.log('Repair order detail page loaded');
    
    // 初始化配件表格
    updatePartsTable();
    
    // 绑定导出按钮事件
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportReport);
    }
    
    // 绑定风险项复选框事件
    document.querySelectorAll('.risk-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const riskItem = this.closest('.risk-item');
            if (this.checked) {
                riskItem.style.opacity = '0.6';
            } else {
                riskItem.style.opacity = '1';
            }
        });
    });
}); 
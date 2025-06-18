// 维修工单管理主JS文件
// 参考 parts/parts-management.js 结构

const drawer = document.querySelector('.drawer');
const drawerMask = document.querySelector('.drawer-mask');
const createBtn = document.getElementById('btn-create');
const closeBtn = document.querySelector('.btn-close');
const cancelBtn = document.querySelector('#repairForm .btn-secondary');
const tableBody = document.querySelector('.parts-table tbody');

// 打开抽屉
function openDrawer(title = '新建工单') {
    document.querySelector('.drawer-header h3').textContent = title;
    drawer.classList.add('active');
    drawerMask.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭抽屉
function closeDrawer() {
    drawer.classList.remove('active');
    drawerMask.classList.remove('active');
    document.body.style.overflow = '';
}

// 新建工单按钮
createBtn.addEventListener('click', () => openDrawer('新建工单'));
// 关闭按钮
closeBtn.addEventListener('click', closeDrawer);
// 取消按钮
if (cancelBtn) cancelBtn.addEventListener('click', closeDrawer);
// 遮罩层
if (drawerMask) drawerMask.addEventListener('click', closeDrawer);

// 详情按钮（事件委托）
tableBody.addEventListener('click', function(e) {
    if (e.target && e.target.dataset.action === 'detail') {
        openDrawer('工单详情');
        // TODO: 填充详情内容
    }
});

// 备件明细新增行功能
const spareSection = Array.from(document.querySelectorAll('.form-section')).find(sec => sec.querySelector('h4') && sec.querySelector('h4').textContent.includes('备件明细'));
const addSpareBtn = spareSection ? spareSection.querySelector('.btn.btn-primary') : null;
const sparePartsTable = document.getElementById('sparePartsTable');

if (addSpareBtn && sparePartsTable) {
    addSpareBtn.addEventListener('click', function() {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type=\"text\" class=\"search-input\" style=\"width:120px\" placeholder=\"编码\"></td>
            <td><input type=\"text\" class=\"search-input\" style=\"width:120px\" placeholder=\"名称\"></td>
            <td><input type=\"number\" class=\"search-input\" style=\"width:80px\" placeholder=\"单价\"></td>
            <td><input type=\"number\" class=\"search-input\" style=\"width:60px\" placeholder=\"数量\" value=\"1\"></td>
            <td><input type=\"number\" class=\"search-input\" style=\"width:100px\" placeholder=\"金额\"></td>
            <td><button type=\"button\" class=\"btn btn-primary btn-save-row\">保存</button></td>
        `;
        sparePartsTable.appendChild(tr);
    });
    // 删除/保存行功能（事件委托）
    sparePartsTable.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('btn-delete-row')) {
            e.target.closest('tr').remove();
        }
        if (e.target && e.target.classList.contains('btn-save-row')) {
            const tr = e.target.closest('tr');
            // 获取输入值
            const tds = tr.querySelectorAll('td');
            const code = tds[0].querySelector('input').value;
            const name = tds[1].querySelector('input').value;
            const price = tds[2].querySelector('input').value;
            const qty = tds[3].querySelector('input').value;
            const amount = tds[4].querySelector('input').value;
            // 用文本替换输入框
            tds[0].innerHTML = code;
            tds[1].innerHTML = name;
            tds[2].innerHTML = price;
            tds[3].innerHTML = qty;
            tds[4].innerHTML = amount;
            tds[5].innerHTML = '<button type="button" class="btn btn-secondary btn-delete-row">删除</button>';
        }
    });
}

// 设备编码与设备名称、设备类型联动
const deviceCodeInput = document.getElementById('deviceCodeInput');
const deviceNameInput = document.getElementById('deviceNameInput');
const deviceTypeInput = document.getElementById('deviceTypeInput');
const deviceMap = {
    'TF00009111AE': { name: 'ZXC-TR-001', type: '自卸车' },
    'WJ00012345':   { name: 'WJJ-EX-002', type: '挖掘机' },
    'TU00056789':   { name: 'TTJ-AS-122', type: '推土机' },
    'YL00023456':   { name: 'YLJ-XS-003', type: '压路机' },
    'ZJ00034567':   { name: 'ZJJ-CL-004', type: '装载机' },
    'JB00045678':   { name: 'JBJ-SY-005', type: '搅拌车' },
    'QZ00056789':   { name: 'QZJ-QY-006', type: '起重机' },
    'BC00067890':   { name: 'BCJ-HB-007', type: '泵车' },
    'CC00078901':   { name: 'CCJ-FD-008', type: '叉车' },
    'PD00089012':   { name: 'PDJ-GR-009', type: '平地机' }
};
deviceCodeInput && deviceCodeInput.addEventListener('input', function() {
    const val = deviceCodeInput.value.trim();
    if (deviceMap[val]) {
        deviceNameInput.value = deviceMap[val].name;
        deviceTypeInput.value = deviceMap[val].type;
    } else {
        deviceNameInput.value = '';
        deviceTypeInput.value = '';
    }
});

// 维修编码与维修项目联动
const repairCodeInput = document.getElementById('repairCodeInput');
const repairProjectInput = document.getElementById('repairProjectInput');
const laborCostInput = document.getElementById('laborCostInput');
const partCostInput = document.getElementById('partCostInput');
const repairMap = {
    'QKBSFDJ-10': { project: '发动机维修', labor: 5000 },
    'YYSXT-20': { project: '液压系统维修', labor: 4000 },
    'BSXGZ-30': { project: '变速箱维修', labor: 3500 },
    'DQXT-40': { project: '电气系统维修', labor: 3000 },
    'LQXT-50': { project: '冷却系统维修', labor: 2500 },
    'CDXT-60': { project: '传动系统维修', labor: 3200 },
    'YYYLL-70': { project: '液压油泄漏处理', labor: 2000 },
    'BCXT-80': { project: '泵送系统维修', labor: 2800 },
    'ZDXT-90': { project: '制动系统维修', labor: 2200 },
    'ZXXT-100': { project: '转向系统维修', labor: 2100 }
};
repairCodeInput && repairCodeInput.addEventListener('input', function() {
    const val = repairCodeInput.value.trim();
    if (repairMap[val]) {
        repairProjectInput.value = repairMap[val].project;
        if (laborCostInput) laborCostInput.value = repairMap[val].labor;
    } else {
        repairProjectInput.value = '';
        if (laborCostInput) laborCostInput.value = '';
    }
});

// 备件明细求和换件成本
function updatePartCost() {
    let sum = 0;
    if (sparePartsTable) {
        Array.from(sparePartsTable.querySelectorAll('tr')).forEach(tr => {
            let amountCell = tr.querySelector('td:nth-child(5)');
            let amount = 0;
            if (amountCell) {
                // 如果是input，取value，否则取文本
                let input = amountCell.querySelector('input');
                if (input) {
                    amount = parseFloat(input.value) || 0;
                } else {
                    amount = parseFloat(amountCell.textContent) || 0;
                }
            }
            sum += amount;
        });
    }
    if (partCostInput) partCostInput.value = sum;
}

// 监听备件明细表格的输入和保存
if (sparePartsTable) {
    sparePartsTable.addEventListener('input', function(e) {
        if (e.target && e.target.tagName === 'INPUT') {
            updatePartCost();
        }
    });
    sparePartsTable.addEventListener('click', function(e) {
        if (e.target && (e.target.classList.contains('btn-save-row') || e.target.classList.contains('btn-delete-row'))) {
            setTimeout(updatePartCost, 0);
        }
    });
}

// ... 这里将实现筛选、表格渲染、批量操作、弹窗控制等功能的主入口 ... 
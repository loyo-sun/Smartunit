// 抽屉相关
const drawer = document.querySelector('.drawer');
const drawerMask = document.querySelector('.drawer-mask');
const newPartsBtn = document.querySelector('.btn-primary');
const cancelBtn = document.querySelector('.btn-secondary');
const closeBtn = document.querySelector('.btn-close');
const partsForm = document.getElementById('partsForm');

// 打开抽屉
function openDrawer() {
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

// 事件监听
newPartsBtn.addEventListener('click', openDrawer);
cancelBtn.addEventListener('click', closeDrawer);
closeBtn.addEventListener('click', closeDrawer);
drawerMask.addEventListener('click', closeDrawer);

// 表单提交
partsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: 处理表单提交
    closeDrawer();
});

// 搜索和筛选功能
const searchInput = document.querySelector('.search-input');
const typeSelect = document.querySelectorAll('.select-input')[0];
const statusSelect = document.querySelectorAll('.select-input')[1];
const resetBtn = document.querySelector('.filter-section .btn-secondary');
const tableBody = document.querySelector('.parts-table tbody');

// 搜索处理
function handleSearch() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const typeValue = typeSelect.value;
    const statusValue = statusSelect.value;
    
    // 遍历表格行进行筛选
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const code = row.cells[0].textContent.toLowerCase();
        const name = row.cells[1].textContent.toLowerCase();
        const type = row.cells[5].querySelector('.tag').classList[1].replace('tag-', '');
        const status = row.cells[6].querySelector('.tag').classList[1].replace('tag-', '');
        
        // 检查是否匹配搜索条件
        const matchesSearch = !searchValue || code.includes(searchValue) || name.includes(searchValue);
        // 检查是否匹配类型条件
        const matchesType = !typeValue || type === typeValue;
        // 检查是否匹配预测方式条件
        const matchesStatus = !statusValue || status === statusValue;
        
        // 显示或隐藏行
        row.style.display = matchesSearch && matchesType && matchesStatus ? '' : 'none';
    });
}

// 重置处理
function handleReset() {
    searchInput.value = '';
    typeSelect.value = '';
    statusSelect.value = '';
    // 显示所有行
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        row.style.display = '';
    });
}

// 绑定事件
searchInput.addEventListener('input', handleSearch);
typeSelect.addEventListener('change', handleSearch);
statusSelect.addEventListener('change', handleSearch);
resetBtn.addEventListener('click', handleReset);

// 模拟数据
const mockData = {
    'P001': {
        code: 'P001',
        name: '轴承',
        model: 'SKF-6205',
        unit: '个',
        price: '128.00',
        type: 'damage',
        forecast: 'mean',
        forecastNote: '根据历史数据，该轴承平均每6个月需要更换一次'
    },
    'P002': {
        code: 'P002',
        name: '电机',
        model: 'Y2-132M-4',
        unit: '台',
        price: '1,280.00',
        type: 'key',
        forecast: 'model',
        forecastNote: '使用机器学习模型预测，考虑温度、振动等因素'
    },
    'P003': {
        code: 'P003',
        name: '皮带',
        model: 'B-2000',
        unit: '条',
        price: '45.00',
        type: 'normal',
        forecast: 'none',
        forecastNote: '该配件暂不进行预测，按需采购'
    },
    'P004': {
        code: 'P004',
        name: '齿轮',
        model: 'G-45',
        unit: '个',
        price: '320.00',
        type: 'key',
        forecast: 'model',
        forecastNote: '基于设备运行时间和负载情况预测'
    },
    'P005': {
        code: 'P005',
        name: '密封圈',
        model: 'O-100',
        unit: '个',
        price: '15.00',
        type: 'damage',
        forecast: 'mean',
        forecastNote: '密封圈易老化，建议每3个月检查一次'
    },
    'P006': {
        code: 'P006',
        name: '轴承座',
        model: 'UCP-205',
        unit: '个',
        price: '85.00',
        type: 'normal',
        forecast: 'model',
        forecastNote: '根据轴承磨损情况预测轴承座更换时间'
    },
    'P007': {
        code: 'P007',
        name: '联轴器',
        model: 'L-120',
        unit: '个',
        price: '280.00',
        type: 'key',
        forecast: 'mean',
        forecastNote: '联轴器平均使用寿命为2年'
    },
    'P008': {
        code: 'P008',
        name: '油封',
        model: 'TC-80',
        unit: '个',
        price: '25.00',
        type: 'damage',
        forecast: 'none',
        forecastNote: '油封损坏时及时更换，不进行预测'
    },
    'P009': {
        code: 'P009',
        name: '螺栓',
        model: 'M12-50',
        unit: '个',
        price: '8.00',
        type: 'normal',
        forecast: 'mean',
        forecastNote: '螺栓按季度检查，松动时更换'
    },
    'P010': {
        code: 'P010',
        name: '轴承',
        model: 'SKF-6308',
        unit: '个',
        price: '168.00',
        type: 'damage',
        forecast: 'model',
        forecastNote: '基于振动监测数据预测轴承寿命'
    }
};

// 编辑处理
function handleEdit(id) {
    const data = mockData[id];
    if (!data) return;

    // 更新抽屉标题
    document.querySelector('.drawer-header h3').textContent = '编辑配件';

    // 填充表单数据
    const form = document.getElementById('partsForm');
    form.querySelector('input[type="text"]').value = data.code;
    form.querySelectorAll('input[type="text"]')[1].value = data.name;
    form.querySelectorAll('input[type="text"]')[2].value = data.model;
    form.querySelectorAll('input[type="text"]')[3].value = data.unit;
    form.querySelector('input[type="number"]').value = data.price.replace(',', '');
    form.querySelectorAll('select')[0].value = data.type;
    form.querySelectorAll('select')[1].value = data.forecast;
    form.querySelectorAll('textarea')[1].value = data.forecastNote;

    // 打开抽屉
    openDrawer();
}

// 删除处理
function handleDelete(id) {
    const data = mockData[id];
    if (!data) return;

    // 二次确认
    if (confirm(`确认删除配件"${data.name}"（${data.code}）？`)) {
        // TODO: 实现删除逻辑
        console.log('删除配件：', id);
        alert('删除成功！');
    }
}

// 绑定操作按钮事件
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        
        if (action === 'edit') {
            handleEdit(id);
        } else if (action === 'delete') {
            handleDelete(id);
        }
    });
});

// 新建按钮点击时重置表单
newPartsBtn.addEventListener('click', () => {
    document.querySelector('.drawer-header h3').textContent = '新建配件';
    const form = document.getElementById('partsForm');
    form.reset();
    // 确保预测方式默认为"不预测"
    form.querySelectorAll('select')[1].value = 'none';
    // 清空预测备注
    form.querySelectorAll('textarea')[1].value = '';
});

// 导入导出功能
const importBtn = document.querySelectorAll('.page-actions .btn-secondary')[0];
const exportBtn = document.querySelectorAll('.page-actions .btn-secondary')[1];

// 导入处理
importBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // TODO: 实现导入逻辑
            console.log('导入文件：', file.name);
        }
    };
    input.click();
});

// 导出处理
exportBtn.addEventListener('click', () => {
    // TODO: 实现导出逻辑
    console.log('导出数据');
});

// 分页处理
const pagination = document.querySelector('.pagination');
const pageButtons = pagination.querySelectorAll('button');

pageButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '上一页' || button.textContent === '下一页') {
            // TODO: 实现翻页逻辑
            console.log('翻页：', button.textContent);
        } else {
            // TODO: 实现页码跳转逻辑
            console.log('跳转到第', button.textContent, '页');
        }
    });
});

// 监听预测方式选择变化
document.getElementById('predictionMethod').addEventListener('change', function(e) {
    const codeMappingGroup = document.getElementById('codeMappingGroup');
    if (e.target.value === 'model') {
        codeMappingGroup.style.display = 'block';
    } else {
        codeMappingGroup.style.display = 'none';
    }
}); 
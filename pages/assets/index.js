const demoData = [
  {
    code: 'A001',
    status: '运行',
    model: 'X100',
    name: '资产一号',
    businessStatus: '在用',
    purchaseDate: '2023-01-15',
    createDate: '2023-01-20',
    iotStatus: '在线',
    purchaser: '采购A',
    costOwner: '部门A',
    customMulti: '选项1, 选项2'
  },
  {
    code: 'A002',
    status: '停机',
    model: 'X200',
    name: '资产二号',
    businessStatus: '闲置',
    purchaseDate: '2022-11-10',
    createDate: '2022-11-15',
    iotStatus: '离线',
    purchaser: '采购B',
    costOwner: '部门B',
    customMulti: '选项2'
  },
  {
    code: 'A003',
    status: '运行',
    model: 'X300',
    name: '资产三号',
    businessStatus: '在用',
    purchaseDate: '2023-02-20',
    createDate: '2023-02-25',
    iotStatus: '在线',
    purchaser: '采购C',
    costOwner: '部门C',
    customMulti: '选项3'
  },
  {
    code: 'A004',
    status: '停机',
    model: 'X400',
    name: '资产四号',
    businessStatus: '闲置',
    purchaseDate: '2022-12-05',
    createDate: '2022-12-10',
    iotStatus: '离线',
    purchaser: '采购D',
    costOwner: '部门D',
    customMulti: '选项4'
  },
  {
    code: 'A005',
    status: '运行',
    model: 'X500',
    name: '资产五号',
    businessStatus: '在用',
    purchaseDate: '2023-03-10',
    createDate: '2023-03-15',
    iotStatus: '在线',
    purchaser: '采购E',
    costOwner: '部门E',
    customMulti: '选项5'
  },
  {
    code: 'A006',
    status: '停机',
    model: 'X600',
    name: '资产六号',
    businessStatus: '闲置',
    purchaseDate: '2022-10-20',
    createDate: '2022-10-25',
    iotStatus: '离线',
    purchaser: '采购F',
    costOwner: '部门F',
    customMulti: '选项6'
  },
  {
    code: 'A007',
    status: '运行',
    model: 'X700',
    name: '资产七号',
    businessStatus: '在用',
    purchaseDate: '2023-04-05',
    createDate: '2023-04-10',
    iotStatus: '在线',
    purchaser: '采购G',
    costOwner: '部门G',
    customMulti: '选项7'
  },
  {
    code: 'A008',
    status: '停机',
    model: 'X800',
    name: '资产八号',
    businessStatus: '闲置',
    purchaseDate: '2022-09-15',
    createDate: '2022-09-20',
    iotStatus: '离线',
    purchaser: '采购H',
    costOwner: '部门H',
    customMulti: '选项8'
  },
  {
    code: 'A009',
    status: '运行',
    model: 'X900',
    name: '资产九号',
    businessStatus: '在用',
    purchaseDate: '2023-05-20',
    createDate: '2023-05-25',
    iotStatus: '在线',
    purchaser: '采购I',
    costOwner: '部门I',
    customMulti: '选项9'
  },
  {
    code: 'A010',
    status: '停机',
    model: 'X1000',
    name: '资产十号',
    businessStatus: '闲置',
    purchaseDate: '2022-08-10',
    createDate: '2022-08-15',
    iotStatus: '离线',
    purchaser: '采购J',
    costOwner: '部门J',
    customMulti: '选项10'
  }
];

function renderTable(data) {
  const tbody = document.querySelector('.asset-table tbody');
  tbody.innerHTML = data.map(item => `
    <tr>
      <td><input type="checkbox"></td>
      <td class="device-id">${item.code}</td>
      <td>${item.status}</td>
      <td>${item.model}</td>
      <td>${item.name}</td>
      <td>${item.businessStatus}</td>
      <td>${item.purchaseDate}</td>
      <td>${item.createDate}</td>
      <td>${item.iotStatus}</td>
      <td>${item.purchaser}</td>
      <td>${item.costOwner}</td>
      <td>${item.customMulti}</td>
      <td>
        <button class="btn-edit" title="编辑"><i class="fas fa-edit"></i></button>
        <button class="btn-delete" title="删除"><i class="fas fa-trash-alt"></i></button>
      </td>
    </tr>
  `).join('');
}

// 初始化筛选选项数据
function initializeFilterOptions() {
  // 资产编码/名称选项
  const assetCodeSelect = document.getElementById('assetCode');
  const assetOptions = ['成本归属A', '成本归属B', '成本归属C', '成本归属D'];
  assetOptions.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    assetCodeSelect.appendChild(opt);
  });

  // 成本归属选项
  const costCenterSelect = document.getElementById('costCenter');
  const costOptions = ['部门A', '部门B', '部门C', '部门D', '部门E', '部门F'];
  costOptions.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    costCenterSelect.appendChild(opt);
  });

  // 采购主体选项
  const purchaseEntitySelect = document.getElementById('purchaseEntity');
  const purchaseOptions = ['采购A', '采购B', '采购C', '采购D', '采购E', '采购F'];
  purchaseOptions.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    purchaseEntitySelect.appendChild(opt);
  });

  // 资产类型选项
  const assetTypeSelect = document.getElementById('assetType');
  const typeOptions = ['类型A', '类型B', '类型C', '类型D'];
  typeOptions.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    assetTypeSelect.appendChild(opt);
  });
}

// 筛选数据
function filterData() {
  const assetCode = document.getElementById('assetCode').value;
  const costCenter = document.getElementById('costCenter').value;
  const purchaseEntity = document.getElementById('purchaseEntity').value;
  const assetType = document.getElementById('assetType').value;
  
  let filteredData = demoData.filter(item => {
    // 资产编码/名称筛选（这里简化为按成本归属筛选）
    if (assetCode && !item.costOwner.includes(assetCode.replace('成本归属', ''))) {
      return false;
    }
    
    // 成本归属筛选
    if (costCenter && item.costOwner !== costCenter) {
      return false;
    }
    
    // 采购主体筛选
    if (purchaseEntity && item.purchaser !== purchaseEntity) {
      return false;
    }
    
    // 资产类型筛选（这里简化为按模型筛选）
    if (assetType && !item.model.includes(assetType.replace('类型', ''))) {
      return false;
    }
    
    return true;
  });
  
  renderTable(filteredData);
  
  // 显示筛选结果提示
  if (assetCode || costCenter || purchaseEntity || assetType) {
    showMessage(`筛选结果: 找到 ${filteredData.length} 条记录`, 'info');
  }
}

// 重置筛选条件
function resetFilters() {
  document.getElementById('assetCode').value = '';
  document.getElementById('costCenter').value = '';
  document.getElementById('purchaseEntity').value = '';
  document.getElementById('assetType').value = '';
  
  // 重新渲染表格显示所有数据
  renderTable(demoData);
  
  // 显示提示信息
  showMessage('筛选条件已重置', 'success');
}

// 展开/收起筛选区域
function toggleFilterExpansion() {
  const filterSection = document.querySelector('.filter-section');
  const expandBtn = document.querySelector('.btn-expand');
  const expandIcon = expandBtn.querySelector('i');
  const expandText = expandBtn.querySelector('span');
  
  if (filterSection.classList.contains('expanded')) {
    filterSection.classList.remove('expanded');
    expandIcon.className = 'fas fa-angle-down';
    expandText.textContent = '展开';
  } else {
    filterSection.classList.add('expanded');
    expandIcon.className = 'fas fa-angle-up';
    expandText.textContent = '收起';
  }
}

// 新增资产
function addNewAsset() {
  showMessage('新增资产功能开发中...', 'info');
  // 这里可以添加新增资产的逻辑，比如打开模态框
}

// 显示消息提示
function showMessage(message, type = 'info') {
  // 创建消息元素
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  // 根据类型设置背景色
  switch(type) {
    case 'success':
      messageDiv.style.backgroundColor = '#52c41a';
      break;
    case 'error':
      messageDiv.style.backgroundColor = '#f5222d';
      break;
    case 'warning':
      messageDiv.style.backgroundColor = '#faad14';
      break;
    default:
      messageDiv.style.backgroundColor = '#409EFF';
  }
  
  document.body.appendChild(messageDiv);
  
  // 3秒后自动移除
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 3000);
}

// 编辑资产
function editAsset(code) {
  showMessage(`编辑资产: ${code}`, 'info');
}

// 删除资产
function deleteAsset(code) {
  if (confirm(`确定要删除资产 ${code} 吗？`)) {
    showMessage(`资产 ${code} 已删除`, 'success');
    // 这里可以添加实际的删除逻辑
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 初始化表格
  renderTable(demoData);
  
  // 初始化筛选选项
  initializeFilterOptions();
  
  // 绑定按钮事件
  document.querySelector('.btn-reset').addEventListener('click', resetFilters);
  document.querySelector('.btn-expand').addEventListener('click', toggleFilterExpansion);
  document.querySelector('.btn-add').addEventListener('click', addNewAsset);
  
  // 绑定筛选下拉框事件
  document.getElementById('assetCode').addEventListener('change', filterData);
  document.getElementById('costCenter').addEventListener('change', filterData);
  document.getElementById('purchaseEntity').addEventListener('change', filterData);
  document.getElementById('assetType').addEventListener('change', filterData);
  
  // 绑定表格操作按钮事件（使用事件委托）
  document.querySelector('.asset-table').addEventListener('click', (e) => {
    if (e.target.closest('.btn-edit')) {
      const row = e.target.closest('tr');
      const code = row.querySelector('.device-id').textContent;
      editAsset(code);
    } else if (e.target.closest('.btn-delete')) {
      const row = e.target.closest('tr');
      const code = row.querySelector('.device-id').textContent;
      deleteAsset(code);
    }
  });
  
  // 添加消息动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}); 
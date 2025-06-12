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
      <td>${item.code}</td>
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
        <button class="btn-edit">编辑</button>
        <button class="btn-delete">删除</button>
      </td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTable(demoData);
}); 
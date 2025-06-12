# 设备排班管理系统

## 目录结构

```
├── README.md                # 项目说明文档
├── index.html              # 系统首页
├── style.css               # 全局样式
├── script.js               # 全局脚本
│
├── pages/                  # 功能模块目录
│   ├── order-management/   # 订单管理模块
│   │   ├── index.html     # 订单管理页面
│   │   ├── style.css      # 订单管理样式
│   │   └── script.js      # 订单管理脚本
│   │
│   ├── asset-management/  # 资产管理模块
│   │   ├── index.html     # 资产管理页面
│   │   ├── style.css      # 资产管理样式
│   │   └── script.js      # 资产管理脚本
│   │
│   ├── parts-management/  # 配件管理模块
│   │   ├── index.html     # 配件管理页面
│   │   ├── style.css      # 配件管理样式
│   │   └── script.js      # 配件管理脚本
│   │
│   └── spare-parts-forecast/  # 配件预测模块
│       ├── index.html     # 配件预测页面
│       ├── style.css      # 配件预测样式
│       └── script.js      # 配件预测脚本
│
├── assets/                 # 静态资源目录
│   ├── images/            # 图片资源
│   ├── icons/             # 图标资源
│   └── fonts/             # 字体资源
│
└── docs/                  # 文档目录
    ├── api/              # API文档
    └── guide/            # 使用指南
```

## 模块说明

### 订单管理模块
- 订单列表管理：支持多条件筛选
- 新增订单：通过抽屉弹窗录入客户和作业信息
- 订单调度：分配车辆和人员
- 订单时间轴：记录订单执行过程中的关键节点

### 资产管理模块
- 设备资产列表
- 设备状态管理
- 设备维护记录

### 配件管理模块
- 配件库存管理
- 配件使用记录
- 配件采购管理

### 配件预测模块
- 配件使用预测
- 库存预警
- 采购建议

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)

## 开发规范
1. 文件命名采用小写字母，多个单词用连字符（-）分隔
2. CSS 类名采用 BEM 命名规范
3. JavaScript 代码遵循 ES6+ 规范
4. 组件化开发，每个模块独立维护

## 浏览器支持
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
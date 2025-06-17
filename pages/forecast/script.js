document.addEventListener('DOMContentLoaded', function() {
    // 初始化抽屉
    const drawer = document.getElementById('detailDrawer');
    const drawerMask = document.getElementById('drawerMask');
    const detailButtons = document.querySelectorAll('.btn-detail');
    const closeButton = document.querySelector('.btn-close');

    // 筛选功能
    const monthSelector = document.querySelector('.month-selector');
    const searchInput = document.querySelector('.search-input');
    const typeSelector = document.querySelector('.type-selector');
    const forecastTypeSelector = document.querySelector('.forecast-type-selector');
    const resetButton = document.querySelector('.btn-reset');

    // 监听筛选条件变化
    searchInput.addEventListener('input', updateTable);
    typeSelector.addEventListener('change', updateTable);
    forecastTypeSelector.addEventListener('change', updateTable);
    monthSelector.addEventListener('change', updateTable);

    // 重置按钮
    resetButton.addEventListener('click', () => {
        searchInput.value = '';
        typeSelector.value = 'all';
        forecastTypeSelector.value = 'all';
        // 保持月份选择器为默认值（下个月）
        const defaultMonth = monthSelector.querySelector('option[selected]');
        if (defaultMonth) {
            monthSelector.value = defaultMonth.value;
        }
        updateTable();
    });

    // 打开抽屉
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const partData = {
                code: row.querySelector('.code').textContent,
                name: row.querySelector('td:nth-child(2)').textContent,
                model: row.querySelector('td:nth-child(3)').textContent,
                unit: row.querySelector('td:nth-child(4)').textContent,
                type: row.querySelector('.tag').textContent,
                forecast: row.querySelector('.forecast').textContent,
                forecastType: row.querySelector('td:nth-child(7)').textContent
            };
            
            loadDetailData(partData);
            drawer.classList.add('active');
            drawerMask.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭抽屉
    function closeDrawer() {
        drawer.classList.remove('active');
        drawerMask.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButton.addEventListener('click', closeDrawer);
    drawerMask.addEventListener('click', closeDrawer);

    // 导出按钮
    const exportButton = document.querySelector('.btn-export');
    exportButton.addEventListener('click', exportData);

    // 初始化月份选择器
    initMonthSelector();

    // 语言选择器初始值
    const lang = localStorage.getItem('preferredLanguage') || 'zh-CN';
    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = lang;
    }

    // 等待i18n.js加载完成后再更新内容
    setTimeout(() => {
        // 从根目录的i18n.js获取translations
        const rootTranslations = window.translations || {};
        const forecastTranslations = rootTranslations.forecastPage || {};
        
        // 确保translations已经加载
        if (rootTranslations && forecastTranslations) {
            updateI18nStatic();
            updateDynamicContent();
        } else {
            // 如果还没有加载完成，再等待一段时间
            setTimeout(() => {
                updateI18nStatic();
                updateDynamicContent();
            }, 2000);
        }
        
        // 手动触发一次根目录的i18n更新
        if (typeof updateContent === 'function') {
            updateContent();
        }
    }, 1000);
});

// 更新表格数据
function updateTable() {
    const monthValue = document.querySelector('.month-selector').value;
    const searchValue = document.querySelector('.search-input').value.trim().toLowerCase();
    const typeValue = document.querySelector('.type-selector').value;
    const forecastTypeValue = document.querySelector('.forecast-type-selector').value;
    
    // 获取所有表格行
    const rows = document.querySelectorAll('.spare-parts-table tbody tr');
    
    rows.forEach(row => {
        const code = row.querySelector('.code').textContent.toLowerCase();
        const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const type = row.querySelector('.tag').classList[1];
        const forecastType = row.querySelector('td:nth-child(7)').textContent;
        
        // 检查是否匹配搜索条件
        const matchesSearch = !searchValue || 
            code.includes(searchValue) || 
            name.includes(searchValue);
        
        // 检查是否匹配类型条件
        const matchesType = typeValue === 'all' || type === typeValue;
        
        // 检查是否匹配预测方式条件
        const matchesForecastType = forecastTypeValue === 'all' || 
            (forecastTypeValue === 'mean' && forecastType === t('filter.forecastTypeOptions.mean')) ||
            (forecastTypeValue === 'model' && forecastType === t('filter.forecastTypeOptions.model'));
        
        // 显示或隐藏行
        row.style.display = matchesSearch && matchesType && matchesForecastType ? '' : 'none';
    });
}

// 加载详情数据
function loadDetailData(partData) {
    const drawerBody = document.querySelector('.drawer-body');
    
    // 构建详情内容
    const detailContent = `
        <div class="info-section">
            <h2 class="part-name">${partData.name}</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">${t('drawer.info.code')}</span>
                    <span class="value">${partData.code}</span>
                </div>
                <div class="info-item">
                    <span class="label">${t('drawer.info.model')}</span>
                    <span class="value">${partData.model}</span>
                </div>
                <div class="info-item">
                    <span class="label">${t('drawer.info.unit')}</span>
                    <span class="value">${partData.unit}</span>
                </div>
                <div class="info-item">
                    <span class="label">${t('drawer.info.type')}</span>
                    <span class="value"><span class="tag ${getTypeClass(partData.type)}">${partData.type}</span></span>
                </div>
                <div class="info-item">
                    <span class="label">${t('drawer.info.forecastQty')}</span>
                    <span class="value forecast">${partData.forecast}</span>
                </div>
            </div>
        </div>
        <div class="trend-section">
            <h3>${t('drawer.trend')}</h3>
            <div class="chart-container">
                <div id="trendChart" style="width: 100%; height: 300px;"></div>
            </div>
        </div>
        ${partData.forecastType === t('filter.forecastTypeOptions.model') ? `
        <div class="equipment-section">
            <h3>${t('drawer.equipment')}</h3>
            <table class="equipment-table">
                <thead>
                    <tr>
                        <th>${t('drawer.equipmentTable.code')}</th>
                        <th>${t('drawer.equipmentTable.name')}</th>
                        <th>${t('drawer.equipmentTable.project')}</th>
                        <th>${t('drawer.equipmentTable.qty')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>EQ001</td>
                        <td>注塑机A</td>
                        <td>项目A</td>
                        <td>2.5</td>
                    </tr>
                    <tr>
                        <td>EQ002</td>
                        <td>注塑机B</td>
                        <td>项目B</td>
                        <td>1.8</td>
                    </tr>
                    <tr>
                        <td>EQ003</td>
                        <td>注塑机C</td>
                        <td>项目A</td>
                        <td>0.7</td>
                    </tr>
                </tbody>
            </table>
        </div>
        ` : ''}
    `;
    
    drawerBody.innerHTML = detailContent;
    
    // 初始化图表
    initChart();
}

// 获取配件类型对应的CSS类
function getTypeClass(type) {
    const typeMap = {
        [t('tag.consumable')]: 'consumable',
        [t('tag.critical')]: 'critical',
        [t('tag.regular')]: 'regular'
    };
    return typeMap[type] || 'regular';
}

// 初始化趋势图表
function initChart() {
    const chartDom = document.getElementById('trendChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    // 获取当前月份
    const now = new Date();
    const currentMonth = now.getMonth();
    const months = [];
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    
    // 生成7个月的标签（前3个月、当前月、后3个月）
    for (let i = -3; i <= 3; i++) {
        let monthIndex = (currentMonth + i + 12) % 12;
        months.push(monthNames[monthIndex]);
    }
    
    // 模拟数据
    const actualData = [12, 15, 18, 14, null, null, null]; // 实际使用量
    const forecastData = [10, 13, 16, 14, 17, 20, 22]; // 预测使用量
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                let result = params[0].axisValue + '<br/>';
                params.forEach(param => {
                    if (param.value !== null) {
                        const color = param.color;
                        const value = param.value;
                        const name = param.seriesName;
                        result += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
                        result += `${name}：${value}<br/>`;
                    }
                });
                return result;
            }
        },
        legend: {
            data: ['历史使用量', '预测使用量'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: months,
            axisLine: {
                lineStyle: {
                    color: '#E5E5E5'
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#E5E5E5',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '历史使用量',
                type: 'bar',
                data: actualData,
                itemStyle: {
                    color: '#1890FF'
                },
                barWidth: '40%',
                barGap: '30%'
            },
            {
                name: '预测使用量',
                type: 'line',
                data: forecastData,
                itemStyle: {
                    color: '#FFB800'
                },
                lineStyle: {
                    type: 'dashed',
                    width: 2
                },
                symbol: 'circle',
                symbolSize: 6,
                connectNulls: true
            }
        ]
    };
    
    myChart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 导出数据
function exportData() {
    // 这里添加实际的导出逻辑
    console.log('导出数据');
}

// 初始化月份选择器
function initMonthSelector() {
    const monthSelector = document.querySelector('.month-selector');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // 清空现有选项
    monthSelector.innerHTML = '';
    
    // 生成未来3个月的选项
    for (let i = 1; i <= 3; i++) {
        const date = new Date(currentYear, currentMonth + i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const value = `${year}-${month.toString().padStart(2, '0')}`;
        const text = `${year}年${month}月`;
        
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        
        // 默认选中下个月
        if (i === 1) {
            option.selected = true;
        }
        
        monthSelector.appendChild(option);
    }
}

// 获取i18n翻译
function t(key) {
    // 从根目录的i18n.js获取translations
    const rootTranslations = window.translations || {};
    const forecastTranslations = rootTranslations.forecastPage || {};
    
    const keys = key.split('.');
    let value = forecastTranslations;
    
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key;
        }
    }
    return value;
}

// 语言切换
function changeLanguage(lang) {
    if (typeof setLanguage === 'function') {
        setLanguage(lang);
        // 手动触发一次更新
        setTimeout(() => {
            updateI18nStatic();
            updateDynamicContent();
        }, 200);
    } else {
        localStorage.setItem('preferredLanguage', lang);
        window.location.reload();
    }
}

// 静态文本刷新
function updateI18nStatic() {
    // 从根目录的i18n.js获取translations
    const rootTranslations = window.translations || {};
    const forecastTranslations = rootTranslations.forecastPage || {};
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            const keys = key.split('.');
            let value = forecastTranslations;
            
            // 如果key以forecastPage开头，去掉前缀
            if (keys[0] === 'forecastPage') {
                keys.shift();
            }
            
            for (const k of keys) {
                if (value && value[k] !== undefined) {
                    value = value[k];
                } else {
                    return;
                }
            }
            
            el.textContent = value;
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) {
            const keys = key.split('.');
            let value = forecastTranslations;
            
            // 如果key以forecastPage开头，去掉前缀
            if (keys[0] === 'forecastPage') {
                keys.shift();
            }
            
            for (const k of keys) {
                if (value && value[k] !== undefined) {
                    value = value[k];
                } else {
                    return;
                }
            }
            
            el.setAttribute('placeholder', value);
        }
    });
}

// 更新动态内容
function updateDynamicContent() {
    // 更新表格中的详情按钮文本
    document.querySelectorAll('.btn-detail').forEach(btn => {
        const newText = t('table.detail');
        btn.textContent = newText;
    });
    
    // 更新表格中的标签文本
    document.querySelectorAll('.tag.consumable').forEach(tag => {
        const newText = t('tag.consumable');
        tag.textContent = newText;
    });
    document.querySelectorAll('.tag.critical').forEach(tag => {
        const newText = t('tag.critical');
        tag.textContent = newText;
    });
    document.querySelectorAll('.tag.regular').forEach(tag => {
        const newText = t('tag.regular');
        tag.textContent = newText;
    });
    
    // 更新预测方式文本
    document.querySelectorAll('td:nth-child(7)').forEach(td => {
        if (td.textContent === '均值预测') {
            const newText = t('filter.forecastTypeOptions.mean');
            td.textContent = newText;
        } else if (td.textContent === '模型预测') {
            const newText = t('filter.forecastTypeOptions.model');
            td.textContent = newText;
        }
    });
} 
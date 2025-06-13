document.addEventListener('DOMContentLoaded', function() {
    // 模拟资产数据
    const mockAssets = [
        {
            id: 'CMI-DT-026',
            type: '自卸车',
            model: 'SYZ320C-8',
            operationStatus: '经营',
            stopStatus: '停机',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        },
        {
            id: 'CMI-DT-027',
            type: '挖掘机',
            model: 'SY215C-8',
            operationStatus: '闲置',
            stopStatus: '正常',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        },
        {
            id: 'CMI-DT-028',
            type: '装载机',
            model: 'LW300FN',
            operationStatus: '经营',
            stopStatus: '正常',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        },
        {
            id: 'CMI-DT-029',
            type: '推土机',
            model: 'SD16',
            operationStatus: '闲置',
            stopStatus: '停机',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        },
        {
            id: 'CMI-DT-030',
            type: '平地机',
            model: 'PY165',
            operationStatus: '经营',
            stopStatus: '正常',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        },
        {
            id: 'CMI-DT-031',
            type: '压路机',
            model: 'XS203',
            operationStatus: '闲置',
            stopStatus: '正常',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        },
        {
            id: 'CMI-DT-032',
            type: '起重机',
            model: 'QY25K5',
            operationStatus: '经营',
            stopStatus: '停机',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        },
        {
            id: 'CMI-DT-033',
            type: '混凝土泵车',
            model: 'SY5418THB',
            operationStatus: '闲置',
            stopStatus: '正常',
            project: '台州项目部',
            updateTime: '2025-03-15 14:30'
        }
    ];

    // 初始化资产列表
    function initAssetList() {
        const assetList = document.querySelector('.asset-list');
        if (!assetList) return;

        // 清空列表
        assetList.innerHTML = '';

        // 获取过滤条件
        const typeFilter = document.querySelector('#type-filter')?.value || '';
        const operationFilter = document.querySelector('#operation-filter')?.value || '';
        const stopFilter = document.querySelector('#stop-filter')?.value || '';
        const searchText = document.querySelector('.search-input')?.value || '';

        // 过滤资产
        const filteredAssets = filterAssets(typeFilter, operationFilter, stopFilter, searchText);

        // 显示过滤后的资产
        if (filteredAssets.length === 0) {
            assetList.innerHTML = '<div class="empty-tip">暂无符合条件的资产</div>';
            return;
        }

        // 创建资产卡片
        filteredAssets.forEach(asset => {
            const card = createAssetCard(asset);
            assetList.appendChild(card);
        });
    }

    // 创建资产卡片
    function createAssetCard(asset) {
        const card = document.createElement('div');
        card.className = 'asset-card';
        card.innerHTML = `
            <div class="status-tags">
                <span class="tag ${asset.operationStatus === '经营' ? 'operating' : 'idle'}">${asset.operationStatus}</span>
                <span class="tag ${asset.stopStatus === '正常' ? 'operating' : 'stopped'}">${asset.stopStatus}</span>
            </div>
            <div class="asset-info">
                <div class="asset-id">${asset.id}</div>
                <div class="asset-type">${asset.type} / ${asset.model}</div>
            </div>
            <div class="project-info">
                <div class="project-name">${asset.project}</div>
                <div class="update-time">${asset.updateTime}</div>
            </div>
        `;

        // 点击卡片跳转到详情页
        card.addEventListener('click', () => {
            window.location.href = `asset-detail.html?id=${asset.id}`;
        });

        // 长按显示操作菜单
        let pressTimer;
        card.addEventListener('touchstart', () => {
            pressTimer = setTimeout(() => {
                showActionMenu(asset);
            }, 500);
        });

        card.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });

        card.addEventListener('touchmove', () => {
            clearTimeout(pressTimer);
        });

        return card;
    }

    // 过滤资产
    function filterAssets(type, operation, stop, search) {
        return mockAssets.filter(asset => {
            // 类型过滤
            if (type && type !== 'all' && asset.type !== type) return false;
            
            // 运行状态过滤
            if (operation && operation !== 'all' && asset.operationStatus !== operation) return false;
            
            // 停机状态过滤
            if (stop && stop !== 'all' && asset.stopStatus !== stop) return false;
            
            // 搜索过滤
            if (search) {
                const searchLower = search.toLowerCase();
                return asset.id.toLowerCase().includes(searchLower) ||
                       asset.type.toLowerCase().includes(searchLower) ||
                       asset.model.toLowerCase().includes(searchLower);
            }
            
            return true;
        });
    }

    // 显示操作菜单
    function showActionMenu(asset) {
        const actions = [
            { text: '查看详情', action: () => window.location.href = `asset-detail.html?id=${asset.id}` },
            { text: '标记停机', action: () => alert('标记停机功能开发中') },
            { text: '查看轨迹', action: () => alert('轨迹查看功能开发中') }
        ];

        // 实际项目中应该使用UI组件库的菜单组件
        const menu = document.createElement('div');
        menu.className = 'action-menu';
        menu.innerHTML = actions.map(action => `
            <div class="menu-item">${action.text}</div>
        `).join('');

        document.body.appendChild(menu);

        // 绑定菜单项点击事件
        const menuItems = menu.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                actions[index].action();
                document.body.removeChild(menu);
            });
        });

        // 点击其他区域关闭菜单
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                document.body.removeChild(menu);
                document.removeEventListener('click', closeMenu);
            }
        });
    }

    // 绑定事件
    function bindEvents() {
        // 过滤条件变化
        const filters = document.querySelectorAll('.filter-select');
        filters.forEach(filter => {
            filter.addEventListener('change', initAssetList);
        });

        // 搜索功能
        const searchIcon = document.querySelector('.search-icon');
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.querySelector('.search-input');

        if (searchIcon && searchContainer && searchInput) {
            // 点击搜索图标显示搜索框
            searchIcon.addEventListener('click', () => {
                searchContainer.style.display = 'block';
                searchInput.focus();
            });

            // 搜索框失去焦点时隐藏
            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    searchContainer.style.display = 'none';
                }, 200);
            });

            // 搜索输入时过滤列表
            searchInput.addEventListener('input', initAssetList);
        }

        // 下拉刷新
        let startY = 0;
        let pullDistance = 0;
        const refreshIcon = document.querySelector('.refresh-icon');
        const assetList = document.querySelector('.asset-list');

        if (assetList && refreshIcon) {
            assetList.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
            });

            assetList.addEventListener('touchmove', (e) => {
                if (assetList.scrollTop === 0) {
                    pullDistance = e.touches[0].clientY - startY;
                    if (pullDistance > 0) {
                        e.preventDefault();
                        refreshIcon.style.display = 'block';
                        refreshIcon.style.transform = `rotate(${pullDistance}deg)`;
                    }
                }
            });

            assetList.addEventListener('touchend', () => {
                if (pullDistance > 100) {
                    refreshIcon.style.animation = 'spin 1s linear infinite';
                    setTimeout(() => {
                        initAssetList();
                        refreshIcon.style.animation = '';
                        refreshIcon.style.display = 'none';
                    }, 1000);
                } else {
                    refreshIcon.style.display = 'none';
                }
                pullDistance = 0;
            });
        }
    }

    // 页面加载完成后初始化
    initAssetList();
    bindEvents();
}); 
document.addEventListener('DOMContentLoaded', function() {
    // 模拟10条资产数据
    const mockAssets = [
        { id: 'CMI-DT-001', type: '自卸车', model: 'SYZ320C-8', operationStatus: '经营', stopStatus: '正常', project: '项目A' },
        { id: 'CMI-DT-002', type: '挖掘机', model: 'SY215C-8', operationStatus: '闲置', stopStatus: '停机', project: '项目B' },
        { id: 'CMI-DT-003', type: '装载机', model: 'LW300FN', operationStatus: '经营', stopStatus: '正常', project: '项目C' },
        { id: 'CMI-DT-004', type: '推土机', model: 'SD16', operationStatus: '闲置', stopStatus: '正常', project: '项目D' },
        { id: 'CMI-DT-005', type: '平地机', model: 'PY165', operationStatus: '经营', stopStatus: '停机', project: '项目E' },
        { id: 'CMI-DT-006', type: '压路机', model: 'XS203', operationStatus: '闲置', stopStatus: '正常', project: '项目F' },
        { id: 'CMI-DT-007', type: '起重机', model: 'QY25K5', operationStatus: '经营', stopStatus: '正常', project: '项目G' },
        { id: 'CMI-DT-008', type: '混凝土泵车', model: 'SY5418THB', operationStatus: '闲置', stopStatus: '停机', project: '项目H' },
        { id: 'CMI-DT-009', type: '自卸车', model: 'SYZ320C-8', operationStatus: '经营', stopStatus: '正常', project: '项目I' },
        { id: 'CMI-DT-010', type: '挖掘机', model: 'SY215C-8', operationStatus: '闲置', stopStatus: '停机', project: '项目J' }
    ];

    // 渲染资产列表
    function renderAssetList(list) {
        const assetList = document.getElementById('assetList');
        assetList.innerHTML = '';
        if (!list.length) {
            assetList.innerHTML = '<div class="empty-tip">暂无符合条件的资产</div>';
            return;
        }
        list.forEach(asset => {
            const card = document.createElement('div');
            card.className = 'device-card';
            card.innerHTML = `
                <div class="card-main">
                    <div class="card-info">
                        <div class="card-title">${asset.id}</div>
                        <div class="card-type">${asset.type} / ${asset.model}</div>
                        <div class="card-project">${asset.project}</div>
                    </div>
                    <div class="card-status">
                        <span class="device-status tag ${asset.operationStatus === '经营' ? 'operating' : 'idle'}">${asset.operationStatus}</span>
                        <span class="device-status tag ${asset.stopStatus === '停机' ? 'stopped' : 'normal'}">${asset.stopStatus}</span>
                    </div>
                </div>
            `;
            card.onclick = function() {
                window.location.href = `asset-detail.html?id=${asset.id}`;
            };
            assetList.appendChild(card);
        });
    }

    // 获取筛选和搜索条件
    function getFilterList() {
        const type = document.getElementById('type-filter').value;
        const operation = document.getElementById('operation-filter').value;
        const stop = document.getElementById('stop-filter').value;
        const search = document.getElementById('searchInput')?.value?.trim() || '';
        return mockAssets.filter(asset => {
            if (type !== 'all' && asset.type !== type) return false;
            if (operation !== 'all' && asset.operationStatus !== operation) return false;
            if (stop !== 'all' && asset.stopStatus !== stop) return false;
            if (search) {
                const s = search.toLowerCase();
                return asset.id.toLowerCase().includes(s) || asset.type.includes(s) || asset.model.toLowerCase().includes(s);
            }
            return true;
        });
    }

    // 绑定筛选事件
    document.querySelectorAll('.filter-select').forEach(sel => {
        sel.addEventListener('change', () => {
            renderAssetList(getFilterList());
        });
    });

    // 扫码按钮事件
    const scanBtn = document.querySelector('.scan-btn');
    scanBtn.onclick = function() {
        // 展示扫码动画或提示
        scanBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        scanBtn.style.pointerEvents = 'none';
        // 3秒后跳转到某个设备详情页（模拟扫码结果）
        setTimeout(function() {
            window.location.href = 'asset-detail.html?id=CMI-DT-001';
        }, 3000);
    };

    // 搜索按钮和搜索栏逻辑
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const statusFilter = document.querySelector('.status-filter');
    const deviceList = document.getElementById('assetList');

    function showSearchBar() {
        searchBar.style.display = 'flex';
        statusFilter.style.top = '92px';
        searchInput.value = '';
        searchInput.focus();
        renderAssetList(mockAssets);
    }
    function hideSearchBar() {
        searchBar.style.display = 'none';
        statusFilter.style.top = '44px';
        renderAssetList(getFilterList());
    }

    searchBtn.onclick = showSearchBar;
    searchClose.onclick = hideSearchBar;
    searchInput.oninput = function() {
        const val = searchInput.value.trim();
        if (val) {
            const filtered = mockAssets.filter(asset =>
                asset.id.toLowerCase().includes(val.toLowerCase()) ||
                asset.type.includes(val) ||
                asset.model.toLowerCase().includes(val.toLowerCase())
            );
            renderAssetList(filtered);
        } else {
            renderAssetList(mockAssets);
        }
    };
    searchInput.onblur = function() {
        setTimeout(hideSearchBar, 200); // 延迟隐藏，避免关闭按钮无法点击
    };

    // 初始化
    renderAssetList(mockAssets);
});
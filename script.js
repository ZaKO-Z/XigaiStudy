// 页面标题映射
const pageTitles = {
    'user-management': '用户管理',
    'course-learning': '课程学习',
    'resource-management': '资源管理',
    'announcements': '公告通知',
    'interactive-communication': '互动交流'
};

// 页面文件路径映射
const pageFiles = {
    'user-management': 'pages/user-management.html',
    'course-learning': 'pages/course-learning.html',
    'resource-management': 'pages/resource-management.html',
    'announcements': 'pages/announcements.html',
    'interactive-communication': 'pages/interactive-communication.html'
};

// 显示加载状态
function showLoadingState() {
    const pageFrame = document.getElementById('page-frame');
    if (pageFrame) {
        pageFrame.style.opacity = '0.5';
        pageFrame.style.transition = 'opacity 0.3s ease';
    }
}

// 隐藏加载状态
function hideLoadingState() {
    const pageFrame = document.getElementById('page-frame');
    if (pageFrame) {
        pageFrame.style.opacity = '1';
    }
}


// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.getElementById('page-title');
    const pageFrame = document.getElementById('page-frame');

    // 为每个导航项添加点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            
            // 移除所有导航项的active类
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 为当前点击的导航项添加active类
            this.classList.add('active');
            
            // 更新页面标题
            if (pageTitle && pageTitles[pageId]) {
                pageTitle.textContent = pageTitles[pageId];
            }
            
            // 更新iframe源文件
            if (pageFrame && pageFiles[pageId]) {
                // 显示加载状态
                showLoadingState();
                
                // 延迟加载新页面，提供更好的用户体验
                setTimeout(() => {
                    pageFrame.src = pageFiles[pageId];
                    
                    // 监听iframe加载完成事件
                    pageFrame.onload = function() {
                        hideLoadingState();
                    };
                }, 100);
            }
        });
    });

    // 初始化页面内容
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        const pageId = activeItem.getAttribute('data-page');
        if (pageTitle && pageTitles[pageId]) {
            pageTitle.textContent = pageTitles[pageId];
        }
        if (pageFrame && pageFiles[pageId]) {
            pageFrame.src = pageFiles[pageId];
        }
    }
});

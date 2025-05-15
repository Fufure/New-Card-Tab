const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Card Tab</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>📗</text></svg>">
    <style>
    /* 全局样式 */
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7; /* 微信风格的浅灰背景 */
        color: #333;
        transition: all 0.3s ease;
        overflow-x: hidden;
        width: 100%;
        position: relative;
    }

    /* 暗色模式样式 */
    body.dark-theme {
        background-color: #1f1f1f;
        color: #e3e3e3;
    }

    /* 固定元素样式 */
    .fixed-elements {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #f7f7f7;
        z-index: 1000;
        padding: 15px;
        transition: all 0.3s ease;
        height: 150px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    body.dark-theme .fixed-elements {
        background-color: #1f1f1f;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    /* 搜索栏样式 */
    .search-bar {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        width: 100%;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        border: 1px solid #e0e0e0;
        transition: all 0.3s ease;
        background-color: #fff;
    }

    .search-bar:focus-within {
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
        border-color: #07c160;
    }

    .search-bar select {
        border: none;
        background-color: #f7f7f7;
        padding: 10px 15px;
        font-size: 14px;
        color: #07c160;
        width: 120px;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path fill="%2307c160" d="M0 0l6 6 6-6z"/></svg>');
        background-repeat: no-repeat;
        background-position: right 10px center;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 0;
    }

    .search-bar input {
        flex: 1;
        border: none;
        padding: 10px 15px;
        font-size: 14px;
        background-color: #fff;
        outline: none;
    }

    .search-bar button {
        border: none;
        background-color: #07c160;
        color: white;
        padding: 0 20px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .search-bar button:hover {
        background-color: #06ae56;
    }

    /* 分类按钮样式 */
    .category-button {
        padding: 6px 12px;
        border-radius: 16px;
        background-color: #fff;
        color: #07c160;
        border: 1px solid #e0e0e0;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        flex: 0 0 auto;
        white-space: nowrap;
        margin: 0 2px;
    }

    .category-button:hover {
        background-color: #07c160;
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .category-button.active {
        background-color: #07c160;
        color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
        font-weight: 600;
    }

    /* 卡片样式 */
    .card {
        background-color: #fff;
        border-radius: 12px;
        padding: 12px;
        width: 150px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        user-select: none;
        border-left: 3px solid #07c160;
        animation: fadeIn 0.3s ease forwards;
        animation-delay: calc(var(--card-index) * 0.05s);
        opacity: 0;
        margin: 2px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* 控制按钮样式 */
    .round-btn {
        background-color: #07c160;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .round-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background-color: #06ae56;
    }

    /* 编辑和删除按钮样式 */
    .edit-btn, .delete-btn, .move-btn {
        position: absolute;
        top: 5px;
        background-color: rgba(255, 255, 255, 0.9);
        color: #07c160;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
        display: none;
        z-index: 10;
        opacity: 0.8;
    }

    .edit-btn:hover, .move-btn:hover {
        background-color: #07c160;
        color: white;
        transform: scale(1.1);
        opacity: 1;
    }

    .delete-btn:hover {
        background-color: #ff4d4f;
        color: white;
        transform: scale(1.1);
        opacity: 1;
    }

    /* 对话框样式 */
    #dialog-box, #edit-dialog-box {
        background-color: #fff;
        padding: 25px;
        border-radius: 12px;
        width: 350px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        animation: dialogFadeIn 0.3s ease;
    }

    #dialog-box input, #dialog-box select,
    #edit-dialog-box input, #edit-dialog-box select {
        width: 100%;
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    #dialog-box input:focus, #dialog-box select:focus,
    #edit-dialog-box input:focus, #edit-dialog-box select:focus {
        border-color: #07c160;
        box-shadow: 0 0 0 2px rgba(7, 193, 96, 0.1);
        outline: none;
    }

    #dialog-box button, #edit-dialog-box button {
        background-color: #07c160;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 10px;
    }

    #dialog-box button:hover, #edit-dialog-box button:hover {
        background-color: #06ae56;
    }

    /* 暗色模式适配 */
    body.dark-theme .search-bar {
        background-color: #2c2c2c;
        border-color: #3a3a3a;
    }

    body.dark-theme .search-bar input {
        background-color: #2c2c2c;
        color: #e3e3e3;
    }

    body.dark-theme .category-button {
        background-color: #2c2c2c;
        border-color: #3a3a3a;
        color: #07c160;
    }

    body.dark-theme .card {
        background-color: #2c2c2c;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    body.dark-theme .edit-btn,
    body.dark-theme .delete-btn,
    body.dark-theme .move-btn {
        background-color: rgba(44, 44, 44, 0.9);
        color: #07c160;
    }

    body.dark-theme #dialog-box,
    body.dark-theme #edit-dialog-box {
        background-color: #2c2c2c;
        color: #e3e3e3;
    }

    body.dark-theme #dialog-box input,
    body.dark-theme #dialog-box select,
    body.dark-theme #edit-dialog-box input,
    body.dark-theme #edit-dialog-box select {
        background-color: #3a3a3a;
        border-color: #4a4a4a;
        color: #e3e3e3;
    }

    /* 分类快捷按钮容器样式移至搜索栏内 */

    .category-button {
        padding: 5px 10px;
        border-radius: 15px;
        background-color: #f9fafb;
        color: #43b883;
        border: none;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        flex: 0 0 auto;
        white-space: nowrap;
        margin: 0 2px;
        position: relative;
        overflow: hidden;
    }

    body.dark-theme .category-button {
        background-color: #2a2e38;
        color: #5d7fb9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .category-button:hover {
        background-color: #43b883;
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12);
    }

    /* 分类按钮选中效果 */
    .category-button.active {
        background-color: #43b883;
        color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
        transform: translateY(-1px);
        font-weight: 600;
        border-bottom: 2px solid #35a674;
    }

    body.dark-theme .category-button:hover,
    body.dark-theme .category-button.active {
        background-color: #5d7fb9;
        color: white;
    }

    /* 分类按钮悬停样式 */

    .fixed-elements h3 {
        position: absolute;
        top: 10px;
        left: 20px;
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        color: #222;
        transition: all 0.3s ease;
    }

    body.dark-theme .fixed-elements h3 {
        color: #e3e3e3;
    }

    /* 一言模块样式 */
    #hitokoto {
        margin: 5px 0 15px;
        font-size: 14px;
        color: #888;
        font-style: italic;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        transition: all 0.3s ease;
    }

    #hitokoto a {
        color: #43b883;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    #hitokoto a:hover {
        color: #35a674;
    }

    body.dark-theme #hitokoto {
        color: #a0a0a0;
    }

    body.dark-theme #hitokoto a {
        color: #5d7fb9;
    }

    /* 中心内容样式 */
    .center-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: none; /* 不限制最大宽度，使分类按钮有更多空间 */
        text-align: center;
        padding: 0 10px; /* 添加左右内边距 */
    }

    /* 管理员控制面板样式 */
    .admin-controls {
        position: fixed;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
        z-index: 1001;
        max-width: 400px;
    }

    .admin-controls-top {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .edit-controls {
        display: none;
        gap: 8px;
        width: 100%;
        justify-content: flex-end;
        flex-wrap: nowrap;
        white-space: nowrap;
    }

    .admin-btn {
        background-color: #f9fafb;
        color: #43b883;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .admin-btn:hover {
        background-color: #43b883;
        color: white;
    }

    body.dark-theme .admin-btn {
        background-color: #323642;
        color: #a0b7d4;
    }

    body.dark-theme .admin-btn:hover {
        background-color: #5d7fb9;
        color: white;
    }

    .admin-controls input {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 13px;
        transition: all 0.3s ease;
    }

    .admin-controls input:focus {
        border-color: #43b883;
        box-shadow: 0 0 0 2px rgba(67, 184, 131, 0.2);
        outline: none;
    }

    .admin-controls button {
        background-color: #f9fafb;
        color: #43b883;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .admin-controls button:hover {
        background-color: #43b883;
        color: white;
    }

    body.dark-theme .admin-controls input {
        background-color: #323642;
        color: #e3e3e3;
        border-color: #444;
    }

    body.dark-theme .admin-controls button {
        background-color: #323642;
        color: #a0b7d4;
    }

    body.dark-theme .admin-controls button:hover {
        background-color: #5d7fb9;
        color: white;
    }

    /* 添加/删除控制按钮样式 */
    .add-remove-controls {
        display: none;
        flex-direction: column;
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        align-items: center;
        gap: 15px;
        z-index: 900;
    }

    .round-btn {
        background-color: #43b883;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    }

    .round-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    body.dark-theme .round-btn {
        background-color: #5d7fb9;
    }

    .add-btn { order: 1; }
    .category-btn { order: 2; }
    .remove-category-btn { order: 3; }

    /* 主要内容区域样式 */
    .content {
        margin-top: 170px;
        padding: 10px;
        max-width: 1600px;
        margin-left: auto;
        margin-right: auto;
        transition: opacity 0.3s ease;
    }

    .loading .content {
        opacity: 0.6;
    }

    /* 分类按钮容器样式 - 移至固定元素区域内 */
    .category-buttons-container {
        display: flex;
        flex-wrap: nowrap; /* 不允许按钮换行，使用水平滚动 */
        justify-content: center; /* 居中排列按钮 */
        gap: 6px;
        padding: 8px 12px;
        width: 100%;
        max-width: 1200px; /* 增加容器宽度，确保能显示更多按钮 */
        margin-left: auto;
        margin-right: auto;
        overflow-x: auto; /* 允许水平滚动 */
        white-space: nowrap; /* 不允许文本换行 */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        margin-top: 5px; /* 减少与搜索栏的距离 */
        background-color: transparent; /* 背景透明 */
        border-radius: 8px;
        box-shadow: none; /* 移除阴影 */
        transition: all 0.3s ease;
        position: relative; /* 确保在固定元素内正确定位 */
    }

    body.dark-theme .category-buttons-container {
        background-color: transparent; /* 暗色模式下的背景透明 */
        box-shadow: none;
    }

    /* 滚动条美化 */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }

    body.dark-theme::-webkit-scrollbar-track {
        background: #252830;
    }

    body.dark-theme::-webkit-scrollbar-thumb {
        background: #444;
    }

    body.dark-theme::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* 分类按钮容器滚动条 */
    .category-buttons-container::-webkit-scrollbar {
        height: 4px;
    }

    /* 主题切换按钮样式 */
    #theme-toggle {
        position: fixed;
        bottom: 50px;
        right: 20px;
        background-color: #43b883;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 24px;
        line-height: 40px;
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    #theme-toggle:hover {
        background-color: #35a674;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    body.dark-theme #theme-toggle {
        background-color: #5d7fb9;
    }

    body.dark-theme #theme-toggle:hover {
        background-color: #4a6fa5;
    }

    /* 对话框样式 */
    #dialog-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(3px);
        transition: all 0.3s ease;
    }

    #dialog-box {
        background-color: white;
        padding: 25px;
        border-radius: 10px;
        width: 350px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        animation: dialogFadeIn 0.3s ease;
    }

    @keyframes dialogFadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    #dialog-box input, #dialog-box select {
        width: 100%;
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    #dialog-box input:focus, #dialog-box select:focus {
        border-color: #43b883;
        box-shadow: 0 0 0 2px rgba(67, 184, 131, 0.2);
        outline: none;
    }

    #dialog-box label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #222;
    }

    #dialog-box button {
        background-color: #43b883;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 10px;
    }

    #dialog-box button:hover {
        background-color: #35a674;
    }

    #dialog-box button.cancel {
        background-color: #f0f0f0;
        color: #333;
    }

    #dialog-box button.cancel:hover {
        background-color: #e0e0e0;
    }

    body.dark-theme #dialog-box {
        background-color: #252830;
        color: #e3e3e3;
    }

    body.dark-theme #dialog-box input,
    body.dark-theme #dialog-box select {
        background-color: #323642;
        color: #e3e3e3;
        border-color: #444;
    }

    body.dark-theme #dialog-box label {
        color: #a0b7d4;
    }

    /* 分类和卡片样式 */
    .section {
        margin-bottom: 25px;
        padding: 0 15px;
    }

    .section-title-container {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
        transition: border-color 0.3s ease;
        width: 100%;
        max-width: 1520px;
        margin-left: auto;
        margin-right: auto;
    }

    body.dark-theme .section-title-container {
        border-bottom-color: #2a2e38;
    }

    .section-title {
        font-size: 22px;
        font-weight: 600;
        color: #222;
        position: relative;
        padding-left: 15px;
        transition: color 0.3s ease;
        min-width: 120px;
        cursor: text;
    }

    .section-title[contenteditable="true"]:focus {
        outline: none;
        background-color: rgba(67, 184, 131, 0.1);
        border-radius: 4px;
        padding: 2px 8px;
        margin: -2px -8px;
    }

    body.dark-theme .section-title[contenteditable="true"]:focus {
        background-color: rgba(93, 127, 185, 0.1);
    }

    .delete-category-btn {
        background-color: #ff9800;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 15px;
        font-size: 13px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    }

    .delete-category-btn:hover {
        background-color: #f57c00;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    }

    body.dark-theme .delete-category-btn {
        background-color: #ff9800;
        color: #252830;
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(8, 150px);
        column-gap: 40px;
        row-gap: 15px;
        justify-content: center;
        padding: 15px;
        margin: 0 auto;
    }

    .card {
        background-color: white;
        border-radius: 8px;
        padding: 12px;
        width: 150px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        user-select: none;
        border-left: 3px solid #43b883;
        animation: fadeIn 0.3s ease forwards;
        animation-delay: calc(var(--card-index) * 0.05s);
        opacity: 0;
        margin: 2px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    body.dark-theme .card {
        background-color: #1e2128; /* 卡片背景 */
        border-left-color: #5d7fb9;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
    }

    .card-top {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .card-icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    .card-title {
        font-size: 15px;
        font-weight: 600;
        color: #222;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s ease;
    }

    .card-url {
        font-size: 12px;
        color: #888;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s ease;
    }

    body.dark-theme .card-title {
        color: #e3e3e3;
    }

    body.dark-theme .card-url {
        color: #a0a0a0;
    }

    .private-tag {
        background-color: #ff9800;
        color: white;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 3px;
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .delete-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: rgba(255, 82, 82, 0.85);
        color: white;
        border: none;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        transition: all 0.2s ease;
        display: none;
        z-index: 10;
        opacity: 0.7;
    }

    .delete-btn:hover {
        background-color: #ff1a1a;
        transform: scale(1.1);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        opacity: 1;
    }

    body.dark-theme .delete-btn {
        background-color: rgba(255, 82, 82, 0.75);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    /* 版权信息样式 */
    #copyright {
        text-align: center;
        padding: 20px 0;
        margin-top: 40px;
        width: 100%;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        z-index: 1;
        transition: all 0.3s ease;
    }

    #copyright p {
        margin: 0;
        font-weight: 500;
        color: #666;
    }

    #copyright a {
        color: #43b883;
        text-decoration: none;
        transition: all 0.3s ease;
        position: relative;
    }

    #copyright a:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: #43b883;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    #copyright a:hover:after {
        transform: scaleX(1);
    }

    body.dark-theme #copyright {
        background-color: transparent;
        color: #e3e3e3;
    }

    body.dark-theme #copyright a {
        color: #5d7fb9;
    }

    body.dark-theme #copyright a:after {
        background-color: #5d7fb9;
    }

    /* 响应式设计中的版权信息样式 */
    @media (max-width: 480px) {
        #copyright {
            padding: 15px 0;
            margin-top: 20px;
            font-size: 12px;
        }
    }

    /* 响应式设计 */
    @media (max-width: 1200px) and (min-width: 769px) {
        .card-container {
            grid-template-columns: repeat(6, 150px);
            justify-content: center;
            column-gap: 35px;
            row-gap: 12px;
            padding: 15px;
            margin: 0 auto;
        }
    }

    @media (max-width: 768px) and (min-width: 481px) {
        .card-container {
            grid-template-columns: repeat(4, 150px);
            justify-content: center;
            column-gap: 30px;
            row-gap: 12px;
            padding: 15px;
            margin: 0 auto;
        }
    }

    @media (max-width: 480px) {
        .fixed-elements {
            position: relative;
            padding: 8px;
            height: auto;
            min-height: 180px;
            box-shadow: none;
            width: 100%;
            box-sizing: border-box;
        }

        .admin-controls {
            position: absolute;
            top: 5px;
            right: 5px;
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            justify-content: flex-end;
            width: auto;
            max-width: 150px;
        }

        .admin-controls input {
            width: 60px;
            font-size: 12px;
            padding: 4px 8px;
        }

        .admin-controls button {
            height: 28px;
            padding: 0 8px;
            font-size: 12px;
            white-space: nowrap;
        }

        .search-container {
            margin-top: 45px; /* 为管理员控制面板留出空间 */
        }

        .center-content {
            position: relative;
            top: 0;
            left: 0;
            transform: none;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
        }

        .search-bar {
            flex-wrap: nowrap;
            max-width: 100%;
            margin: 0 auto 15px;
            width: 100%;
            box-sizing: border-box;
        }

        .category-buttons-container {
            width: 100%;
            max-width: 100%;
            padding: 8px 0;
            margin: 10px 0;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            box-sizing: border-box;
        }

        .content {
            margin-top: 20px;
            margin-bottom: 120px;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
        }

        .card-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
        }

        .card {
            width: 100%;
            margin: 0;
            box-sizing: border-box;
            min-width: 0; /* 防止卡片超出容器 */
            max-width: 100%; /* 限制最大宽度 */
        }

        .card-title {
            font-size: 14px;
        }

        .card-url {
            font-size: 11px;
        }

        .section {
            width: 100%;
            box-sizing: border-box;
            padding: 0 10px;
        }

        .section-title-container {
            width: 100%;
            box-sizing: border-box;
            padding: 0 10px;
        }

        #dialog-box {
            width: 90%;
            max-width: 320px;
            padding: 15px;
            margin: 20px;
            box-sizing: border-box;
        }

        .add-remove-controls {
            position: fixed;
            right: 10px;
            bottom: 80px;
            top: auto;
            transform: none;
            flex-direction: row;
            gap: 10px;
            z-index: 1000;
        }

        .round-btn {
            width: 40px;
            height: 40px;
            font-size: 20px;
        }

        #theme-toggle {
            bottom: 20px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 20px;
        }

        .section-title-container {
            margin: 15px 0;
            padding: 0 10px;
        }

        .section-title {
            font-size: 18px;
        }
    }

    /* 添加新的媒体查询来处理超小屏幕 */
    @media (max-width: 360px) {
        .card-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            padding: 5px;
        }

        .card {
            padding: 8px;
        }

        .card-title {
            font-size: 13px;
        }

        .card-url {
            font-size: 10px;
        }

        .admin-controls {
            max-width: 130px;
        }

        .admin-controls input {
            width: 50px;
        }

        .admin-controls button {
            padding: 0 6px;
            font-size: 11px;
        }
    }

    /* 卡片样式 */
    .card {
        background-color: white;
        border-radius: 8px;
        padding: 12px;
        width: 150px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        user-select: none;
        border-left: 3px solid #43b883;
        animation: fadeIn 0.3s ease forwards;
        animation-delay: calc(var(--card-index) * 0.05s);
        opacity: 0;
        margin: 2px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .card-content {
        flex: 1;
        min-width: 0; /* 防止内容溢出 */
    }

    .card-title {
        font-size: 15px;
        font-weight: 600;
        color: #222;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s ease;
        margin-bottom: 4px;
    }

    .card-url {
        font-size: 12px;
        color: #888;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s ease;
    }

    .card-icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }

    /* 编辑按钮样式 */
    .edit-btn {
        position: absolute;
        top: 5px;
        right: 25px;
        background-color: rgba(67, 184, 131, 0.85);
        color: white;
        border: none;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        transition: all 0.2s ease;
        display: none;
        z-index: 10;
        opacity: 0.7;
    }

    .edit-btn:hover {
        background-color: #43b883;
        transform: scale(1.1);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        opacity: 1;
    }

    body.dark-theme .edit-btn {
        background-color: rgba(93, 127, 185, 0.75);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    body.dark-theme .edit-btn:hover {
        background-color: #5d7fb9;
    }

    /* 移动按钮样式 */
    .move-btn {
        position: absolute;
        top: 5px;
        right: 45px;
        background-color: rgba(93, 127, 185, 0.85);
        color: white;
        border: none;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: move;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        transition: all 0.2s ease;
        display: none;
        z-index: 10;
        opacity: 0.7;
    }

    .move-btn:hover {
        background-color: #5d7fb9;
        transform: scale(1.1);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        opacity: 1;
    }

    body.dark-theme .move-btn {
        background-color: rgba(67, 184, 131, 0.75);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    body.dark-theme .move-btn:hover {
        background-color: #43b883;
    }

    /* 编辑对话框样式 */
    #edit-dialog-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(3px);
        transition: all 0.3s ease;
    }

    #edit-dialog-box {
        background-color: white;
        padding: 25px;
        border-radius: 10px;
        width: 350px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        animation: dialogFadeIn 0.3s ease;
    }

    body.dark-theme #edit-dialog-box {
        background-color: #252830;
        color: #e3e3e3;
    }

    #edit-dialog-box input,
    #edit-dialog-box select {
        width: 100%;
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    body.dark-theme #edit-dialog-box input,
    body.dark-theme #edit-dialog-box select {
        background-color: #323642;
        color: #e3e3e3;
        border-color: #444;
    }

    #edit-dialog-box label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #222;
    }

    body.dark-theme #edit-dialog-box label {
        color: #a0b7d4;
    }

    #edit-dialog-box button {
        background-color: #43b883;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 10px;
    }

    #edit-dialog-box button:hover {
        background-color: #35a674;
    }

    #edit-dialog-box button.cancel {
        background-color: #f0f0f0;
        color: #333;
    }

    #edit-dialog-box button.cancel:hover {
        background-color: #e0e0e0;
    }

    body.dark-theme #edit-dialog-box button.cancel {
        background-color: #323642;
        color: #e3e3e3;
    }

    body.dark-theme #edit-dialog-box button.cancel:hover {
        background-color: #444;
    }

    .edit-category-btn {
        background-color: #43b883;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
        font-size: 13px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    }

    .edit-category-btn:hover {
        background-color: #35a674;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    }

    body.dark-theme .edit-category-btn {
        background-color: #5d7fb9;
    }

    body.dark-theme .edit-category-btn:hover {
        background-color: #4a6fa5;
    }

    body.dark-theme .search-bar select {
        background-color: #2c2c2c;
        color: #e3e3e3;
        border-color: #3a3a3a;
    }

    body.dark-theme #dialog-box select,
    body.dark-theme #edit-dialog-box select {
        background-color: #323642;
        color: #e3e3e3;
        border-color: #444;
    }

    body.dark-theme .search-bar select:focus,
    body.dark-theme #dialog-box select:focus,
    body.dark-theme #edit-dialog-box select:focus {
        border-color: #5d7fb9;
        box-shadow: 0 0 0 2px rgba(93, 127, 185, 0.2);
    }

    /* 修改下拉箭头颜色 */
    body.dark-theme .search-bar select {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path fill="%235d7fb9" d="M0 0l6 6 6-6z"/></svg>');
    }
    </style>
</head>

<body>
    <div class="fixed-elements">
        <!--h3>我的导航</h3-->
        <div class="center-content">
            <!-- 一言模块 >
            <p id="hitokoto">
                <a href="#" id="hitokoto_text"></a>
            </p -->
            <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
            <!-- 搜索栏 -->
            <div class="search-container">
                <div class="search-bar">
                    <select id="search-engine-select">
                        <option value="baidu">百度</option>
                        <option value="bing">必应</option>
                        <option value="google">谷歌</option>
                        <option value="duckduckgo">DuckDuckGo</option>
                    </select>
                    <input type="text" id="search-input" placeholder="">
                    <button id="search-button">🔍</button>
                </div>
            </div>
            <div id="category-buttons-container" class="category-buttons-container"></div>
        </div>
        <!-- 管理员控制面板 -->
        <div class="admin-controls">
            <div class="admin-controls-top">
                <input type="password" id="admin-password" placeholder="">
                <button id="admin-mode-btn" onclick="toggleAdminMode()">设  置</button>
                <button id="secret-garden-btn" onclick="toggleSecretGarden()">登  录</button>
            </div>
            <div class="edit-controls">
                <button class="admin-btn" onclick="showAddDialog()">添加卡片</button>
                <button class="admin-btn" onclick="toggleRemoveMode()">卡片编辑</button>
                <button class="admin-btn" onclick="addCategory()">添加分类</button>
                <button class="admin-btn" onclick="toggleRemoveCategory()">分类编辑</button>
            </div>
        </div>
    </div>
    <div class="content">
        <!-- 分类和卡片容器 -->
        <div id="sections-container"></div>
        <!-- 主题切换按钮 -->
        <button id="theme-toggle" onclick="toggleTheme()">◑</button>
        <!-- 添加链接对话框 -->
        <div id="dialog-overlay">
            <div id="dialog-box">
                <label for="name-input">名称</label>
                <input type="text" id="name-input">
                <label for="url-input">地址</label>
                <input type="text" id="url-input">
                <label for="category-select">选择分类</label>
                <select id="category-select"></select>
                <div class="private-link-container">
                    <label for="private-checkbox">私密链接</label>
                    <input type="checkbox" id="private-checkbox">
                </div>
                <button onclick="addLink()">确定</button>
                <button onclick="hideAddDialog()">取消</button>
            </div>
        </div>
        <!-- 编辑链接对话框 -->
        <div id="edit-dialog-overlay">
            <div id="edit-dialog-box">
                <label for="edit-name-input">名称</label>
                <input type="text" id="edit-name-input">
                <label for="edit-url-input">地址</label>
                <input type="text" id="edit-url-input">
                <label for="edit-category-select">选择分类</label>
                <select id="edit-category-select"></select>
                <div class="private-link-container">
                    <label for="edit-private-checkbox">私密链接</label>
                    <input type="checkbox" id="edit-private-checkbox">
                </div>
                <button onclick="saveEdit()">保存</button>
                <button onclick="hideEditDialog()" class="cancel">取消</button>
            </div>
        </div>
        <!-- 版权信息--->
        <div id="copyright" class="copyright">
            <!--请不要删除,自己用的，大佬，不对外使用，已点star！-->
            <p>美化版，如果喜欢，烦请<a href="https://github.com/hmhm2022/Card-Tab" target="_blank">原作者点个star</a> ！</p>
        </div>
    </div>


<!-- 网页结束位置 -->
    <script>
    // 搜索引擎配置
    const searchEngines = {
        baidu: "https://www.baidu.com/s?wd=",
        bing: "https://www.bing.com/search?q=",
        google: "https://www.google.com/search?q=",
        duckduckgo: "https://duckduckgo.com/?q="
    };

    let currentEngine = "baidu";

    // 日志记录函数
    function logAction(action, details) {
        const timestamp = new Date().toISOString();
        const logEntry = timestamp + ': ' + action + ' - ' + JSON.stringify(details);
        console.log(logEntry);
    }

    // 设置当前搜索引擎
    function setActiveEngine(engine) {
        currentEngine = engine;
        document.getElementById('search-engine-select').value = engine;
        logAction('设置搜索引擎', { engine });
    }

    // 搜索引擎选择框变更事件
    document.getElementById('search-engine-select').addEventListener('change', function() {
        setActiveEngine(this.value);
    });

    // 搜索按钮点击事件
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        if (query) {
            logAction('执行搜索', { engine: currentEngine, query });
            window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
        }
    });

    // 搜索输入框回车事件
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });

    // 初始化搜索引擎
    setActiveEngine(currentEngine);

    // 全局变量
    let publicLinks = [];
    let privateLinks = [];
    let isAdmin = false;
    let isLoggedIn = false;
    let removeMode = false;
    let isRemoveCategoryMode = false;
    let isDarkTheme = false;
    let links = [];
    const categories = {};

    // 添加新分类
    async function addCategory() {
        if (!await validateToken()) {
            return;
        }
        const categoryName = prompt('请输入新分类名称:');
        if (!categoryName) return;
        
        if (categories[categoryName]) {
            alert('该分类已存在');
            logAction('添加分类失败', { categoryName, reason: '分类已存在' });
            return;
        }

        // 获取当前最大序号
        let maxOrder = 0;
        Object.keys(categories).forEach(cat => {
            if (categories[cat].order > maxOrder) {
                maxOrder = categories[cat].order;
            }
        });

        // 提示输入序号
        const orderInput = prompt('请输入分类序号（数字越小越靠前，当前最大序号为：' + maxOrder + '）:', (maxOrder + 1).toString());
        if (orderInput === null) return; // 用户取消

        const order = parseInt(orderInput);
        if (isNaN(order)) {
            alert('请输入有效的数字！');
            return;
        }

        // 创建新分类对象
        categories[categoryName] = {
            links: [],
            order: order
        };

        updateCategorySelect();
        renderCategories();
        saveLinks();
        logAction('添加分类', { categoryName, order });
    }

    // 删除分类
    async function deleteCategory(category) {
        if (!await validateToken()) {
            return;
        }
        if (confirm('确定要删除 "' + category + '" 分类吗？这将删除该分类下的所有链接。')) {
            delete categories[category];
            links = links.filter(link => link.category !== category);
            publicLinks = publicLinks.filter(link => link.category !== category);
            privateLinks = privateLinks.filter(link => link.category !== category);
            updateCategorySelect();
            saveLinks();
            renderCategories();
            logAction('删除分类', { category });
        }
    }

    // 渲染分类(不重新加载链接)
    function renderCategories() {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';

        // 按序号排序分类
        const sortedCategories = Object.keys(categories).sort((a, b) => {
            return (categories[a].order || 0) - (categories[b].order || 0);
        });

        sortedCategories.forEach(category => {
            const section = document.createElement('div');
            section.className = 'section';

            const titleContainer = document.createElement('div');
            titleContainer.className = 'section-title-container';

            const title = document.createElement('div');
            title.className = 'section-title';
            title.textContent = category;

            titleContainer.appendChild(title);

            if (isAdmin) {
                // 添加编辑分类名称按钮
                const editCategoryBtn = document.createElement('button');
                editCategoryBtn.textContent = '编辑名称';
                editCategoryBtn.className = 'edit-category-btn';
                editCategoryBtn.style.display = 'none';
                editCategoryBtn.onclick = () => {
                    const newCategory = prompt('请输入新的分类名称:', category);
                    if (newCategory && newCategory !== category) {
                        // 更新分类名称
                        categories[newCategory] = categories[category];
                        delete categories[category];
                        
                        // 更新所有相关链接的分类
                        links.forEach(link => {
                            if (link.category === category) {
                                link.category = newCategory;
                            }
                        });
                        
                        // 更新容器ID
                        const cardContainer = document.getElementById(category);
                        if (cardContainer) {
                            cardContainer.id = newCategory;
                        }
                        
                        // 保存更改
                        saveLinks().then(() => {
                            // 重新渲染分类
                            renderCategories();
                            logAction('重命名分类', { oldName: category, newName: newCategory });
                        });
                    }
                };
                titleContainer.appendChild(editCategoryBtn);

                // 添加编辑排序按钮
                const editOrderBtn = document.createElement('button');
                editOrderBtn.textContent = '编辑排序';
                editOrderBtn.className = 'edit-category-btn';
                editOrderBtn.style.display = 'none';
                editOrderBtn.onclick = () => {
                    const currentOrder = categories[category].order || 0;
                    const newOrder = prompt('请输入新的排序序号（数字越小越靠前）:', currentOrder.toString());
                    if (newOrder !== null) {
                        const order = parseInt(newOrder);
                        if (!isNaN(order)) {
                            categories[category].order = order;
                            saveLinks().then(() => {
                                renderCategories();
                                logAction('更新分类排序', { category, newOrder: order });
                            });
                        } else {
                            alert('请输入有效的数字！');
                        }
                    }
                };
                titleContainer.appendChild(editOrderBtn);

                // 添加删除分类按钮
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '删除分类';
                deleteBtn.className = 'delete-category-btn';
                deleteBtn.style.display = 'none';
                deleteBtn.onclick = () => deleteCategory(category);
                titleContainer.appendChild(deleteBtn);
            }

            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            cardContainer.id = category;

            section.appendChild(titleContainer);
            section.appendChild(cardContainer);

            container.appendChild(section);

            // 获取该分类下的所有可见链接
            const categoryLinks = links.filter(link => 
                link.category === category && 
                (!link.isPrivate || isLoggedIn)
            );

            if (categoryLinks.length > 0) {
                categoryLinks.forEach(link => {
                    createCard(link, cardContainer);
                });
            }
        });

        // 渲染分类快捷按钮
        renderCategoryButtons();

        logAction('渲染分类', { 
            categoryCount: Object.keys(categories).length, 
            linkCount: links.length,
            isLoggedIn: isLoggedIn
        });
    }

    // 渲染分类快捷按钮
    function renderCategoryButtons() {
        const buttonsContainer = document.getElementById('category-buttons-container');
        buttonsContainer.innerHTML = '';

        // 只有当有分类时才显示按钮容器
        if (Object.keys(categories).length > 0) {
            // 获取页面上实际显示的分类顺序
            const displayedCategories = [];
            document.querySelectorAll('.section-title').forEach(titleElement => {
                displayedCategories.push(titleElement.textContent);
            });

            // 创建按钮并添加到容器
            let visibleButtonsCount = 0;
            displayedCategories.forEach(category => {
                // 检查该分类是否有可见的链接
                const visibleLinks = links.filter(function(link) {
                    return link.category === category && (!link.isPrivate || isLoggedIn);
                });

                // 只为有可见链接的分类创建按钮
                if (visibleLinks.length > 0) {
                    const button = document.createElement('button');
                    button.className = 'category-button';
                    button.textContent = category;
                    button.dataset.category = category;
                    button.onclick = () => {
                        // 清除所有按钮的active类
                        document.querySelectorAll('.category-button').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        // 为当前点击的按钮添加active类
                        button.classList.add('active');
                        scrollToCategory(category);
                    };

                    buttonsContainer.appendChild(button);
                    visibleButtonsCount++;
                }
            });

            // 显示或隐藏按钮容器
            if (visibleButtonsCount > 0) {
                buttonsContainer.style.display = 'flex';
            } else {
                buttonsContainer.style.display = 'none';
            }

            // 初始时检测当前可见分类并设置相应按钮为活跃状态
            setTimeout(setActiveCategoryButtonByVisibility, 100);
        } else {
            buttonsContainer.style.display = 'none';
        }
    }

    // 根据可见性设置活跃的分类按钮
    function setActiveCategoryButtonByVisibility() {
        // 获取所有分类区域
        const sections = document.querySelectorAll('.section');
        if (!sections.length) return;

        // 获取视窗高度
        const viewportHeight = window.innerHeight;
        // 考虑固定元素的高度
        const fixedElementsHeight = 170;
        // 计算视窗中心点
        const viewportCenter = viewportHeight / 2 + fixedElementsHeight;

        // 找出最接近视窗中心的分类
        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // 计算分类区域的中心点
            const sectionCenter = rect.top + rect.height / 2;
            // 计算到视窗中心的距离
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        if (closestSection) {
            const categoryId = closestSection.querySelector('.card-container').id;
            const buttons = document.querySelectorAll('.category-button');

            // 移除所有活跃状态
            buttons.forEach(btn => btn.classList.remove('active'));

            // 为匹配的分类按钮添加活跃状态
            buttons.forEach(btn => {
                if (btn.dataset.category === categoryId) {
                    btn.classList.add('active');
                }
            });
        }
    }

    // 添加滚动事件监听器，滚动时更新活跃的分类按钮
    window.addEventListener('scroll', debounce(setActiveCategoryButtonByVisibility, 100));

    // 防抖函数，避免过多的滚动事件处理
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    // 滚动到指定分类
    function scrollToCategory(category) {
        const section = document.getElementById(category);
        if (section) {
            // 计算滚动位置，考虑顶部固定元素的高度和额外偏移量
            let offset = 230; // 减小偏移量，确保分类标题和第一行书签完全可见

            // 检查是否为移动设备
            if (window.innerWidth <= 480) {
                offset = 120; // 移动设备上的偏移量
            }

            // 滚动到分类位置
            const sectionRect = section.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + sectionRect.top - offset;

            // 使用平滑滚动效果
            window.scrollTo({
                top: absoluteTop,
                behavior: 'smooth'
            });

            logAction('滚动到分类', { category });
        }
    }

    // 读取链接数据
    async function loadLinks() {
        const headers = {
            'Content-Type': 'application/json'
        };

        // 如果已登录，从 localStorage 获取 token 并添加到请求头
        if (isLoggedIn) {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers['Authorization'] = token;
            }
        }

        try {
            console.log('Fetching links with headers:', headers);
            const response = await fetch('/api/getLinks?userId=tempUser', {
                headers: headers
            });

            const data = await response.json();
            console.log('Received data:', data);

            if (!response.ok) {
                throw new Error(data.message || '服务器错误');
            }

            // 初始化数据结构
            if (data.categories) {
                console.log('Processing categories:', data.categories);
                // 确保每个分类都有正确的数据结构
                Object.keys(data.categories).forEach(category => {
                    if (!data.categories[category].links) {
                        data.categories[category] = {
                            links: data.categories[category],
                            order: data.categories[category].order || 0
                        };
                    }
                });
                Object.assign(categories, data.categories);
            }

            // 处理链接数据
            if (data.links) {
                console.log('Processing links:', data.links);
                publicLinks = data.links.filter(link => !link.isPrivate);
                privateLinks = data.links.filter(link => link.isPrivate);
                links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

                console.log('Filtered links:', {
                    publicLinks,
                    privateLinks,
                    links,
                    isLoggedIn
                });

                // 确保所有链接都被正确分配到分类中
                links.forEach(link => {
                    if (!categories[link.category]) {
                        categories[link.category] = {
                            links: [],
                            order: 0
                        };
                    }
                    if (!categories[link.category].links) {
                        categories[link.category].links = [];
                    }
                    categories[link.category].links.push(link);
                });
            } else {
                publicLinks = [];
                privateLinks = [];
                links = [];
            }

            console.log('Final categories:', categories);
            console.log('Final links:', links);

            // 重新渲染分类和链接
            renderCategories();
            updateCategorySelect();
            updateUIState();
            logAction('读取链接', {
                publicCount: publicLinks.length,
                privateCount: privateLinks.length,
                isLoggedIn: isLoggedIn,
                hasToken: !!localStorage.getItem('authToken')
            });
        } catch (error) {
            console.error('Error loading links:', error);
            // 如果是未登录状态，使用空数据初始化
            if (!isLoggedIn) {
                // 清空现有数据
                Object.keys(categories).forEach(key => delete categories[key]);
                publicLinks = [];
                privateLinks = [];
                links = [];
                
                // 重新渲染分类和链接
                renderCategories();
                updateCategorySelect();
                updateUIState();
            } else {
                alert('加载链接时出错：' + error.message);
            }
        }
    }

    // 更新UI状态
    function updateUIState() {
        const passwordInput = document.getElementById('admin-password');
        const adminBtn = document.getElementById('admin-mode-btn');
        const secretGardenBtn = document.getElementById('secret-garden-btn');
        const editControls = document.querySelector('.edit-controls');

        passwordInput.style.display = isLoggedIn ? 'none' : 'inline-block';
        secretGardenBtn.textContent = isLoggedIn ? "退出" : "登录";
        secretGardenBtn.style.display = 'inline-block';

        if (isAdmin) {
            adminBtn.textContent = "退出设置";
            adminBtn.style.display = 'inline-block';
            editControls.style.display = 'flex';
        } else if (isLoggedIn) {
            adminBtn.textContent = "设置";
            adminBtn.style.display = 'inline-block';
            editControls.style.display = 'none';
        } else {
            adminBtn.style.display = 'none';
            editControls.style.display = 'none';
        }

        logAction('更新UI状态', { isAdmin, isLoggedIn });
    }

    // 登录状态显示（加载所有链接）
    function showSecretGarden() {
        if (isLoggedIn) {
            links = [...publicLinks, ...privateLinks];
            loadSections();
            // 显示所有私密标签
            document.querySelectorAll('.private-tag').forEach(tag => {
                tag.style.display = 'block';
            });
            logAction('显示私密花园');
        }
    }

    // 加载分类和链接
    function loadSections() {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';

        // 按序号排序分类
        const sortedCategories = Object.keys(categories).sort((a, b) => {
            return (categories[a].order || 0) - (categories[b].order || 0);
        });

        sortedCategories.forEach(category => {
            const section = document.createElement('div');
            section.className = 'section';

            const titleContainer = document.createElement('div');
            titleContainer.className = 'section-title-container';

            const title = document.createElement('div');
            title.className = 'section-title';
            title.textContent = category;

            titleContainer.appendChild(title);

            if (isAdmin) {
                // 添加编辑分类名称按钮
                const editCategoryBtn = document.createElement('button');
                editCategoryBtn.textContent = '编辑名称';
                editCategoryBtn.className = 'edit-category-btn';
                editCategoryBtn.style.display = 'none';
                editCategoryBtn.onclick = () => {
                    const newCategory = prompt('请输入新的分类名称:', category);
                    if (newCategory && newCategory !== category) {
                        // 更新分类名称
                        categories[newCategory] = categories[category];
                        delete categories[category];
                        
                        // 更新所有相关链接的分类
                        links.forEach(link => {
                            if (link.category === category) {
                                link.category = newCategory;
                            }
                        });
                        
                        // 更新容器ID
                        const cardContainer = document.getElementById(category);
                        if (cardContainer) {
                            cardContainer.id = newCategory;
                        }
                        
                        // 保存更改
                        saveLinks().then(() => {
                            // 重新渲染分类
                            renderCategories();
                            logAction('重命名分类', { oldName: category, newName: newCategory });
                        });
                    }
                };
                titleContainer.appendChild(editCategoryBtn);

                // 添加编辑排序按钮
                const editOrderBtn = document.createElement('button');
                editOrderBtn.textContent = '编辑排序';
                editOrderBtn.className = 'edit-category-btn';
                editOrderBtn.style.display = 'none';
                editOrderBtn.onclick = () => {
                    const currentOrder = categories[category].order || 0;
                    const newOrder = prompt('请输入新的排序序号（数字越小越靠前）:', currentOrder.toString());
                    if (newOrder !== null) {
                        const order = parseInt(newOrder);
                        if (!isNaN(order)) {
                            categories[category].order = order;
                            saveLinks().then(() => {
                                renderCategories();
                                logAction('更新分类排序', { category, newOrder: order });
                            });
                        } else {
                            alert('请输入有效的数字！');
                        }
                    }
                };
                titleContainer.appendChild(editOrderBtn);

                // 添加删除分类按钮
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '删除分类';
                deleteBtn.className = 'delete-category-btn';
                deleteBtn.style.display = 'none';
                deleteBtn.onclick = () => deleteCategory(category);
                titleContainer.appendChild(deleteBtn);
            }

            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            cardContainer.id = category;

            section.appendChild(titleContainer);
            section.appendChild(cardContainer);

            // 获取该分类下的所有可见链接
            const categoryLinks = links.filter(link => 
                link.category === category && 
                (!link.isPrivate || isLoggedIn)
            );

            if (categoryLinks.length > 0) {
                container.appendChild(section);
                categoryLinks.forEach(link => {
                    createCard(link, cardContainer);
                });
            }
        });

        // 渲染分类快捷按钮
        renderCategoryButtons();

        logAction('加载分类和链接', { 
            isAdmin: isAdmin, 
            linkCount: links.length, 
            categoryCount: Object.keys(categories).length,
            isLoggedIn: isLoggedIn
        });
    }

    // 从URL中提取域名
    function extractDomain(url) {
        let domain;
        try {
            domain = new URL(url).hostname;
        } catch (e) {
            domain = url;
        }
        return domain;
    }

    // 创建卡片
    function createCard(link, container) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('draggable', isAdmin);
        card.dataset.isPrivate = link.isPrivate;
        card.dataset.url = link.url;

        // 设置卡片动画延迟
        const cardIndex = container.children.length;
        card.style.setProperty('--card-index', cardIndex);

        // 创建图标
        const icon = document.createElement('img');
        icon.className = 'card-icon';
        icon.src = 'https://www.faviconextractor.com/favicon/' + extractDomain(link.url);
        icon.alt = 'Website Icon';

        // 如果图片加载失败，使用默认的 SVG 图标
        icon.onerror = function() {
            const defaultIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>' +
            '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>' +
            '</svg>';
            const svgBlob = new Blob([defaultIconSVG], {type: 'image/svg+xml'});
            const svgUrl = URL.createObjectURL(svgBlob);
            this.src = svgUrl;
            this.onload = () => URL.revokeObjectURL(svgUrl);
        };

        // 创建内容容器
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        // 创建标题
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = link.name;

        // 创建URL
        const url = document.createElement('div');
        url.className = 'card-url';
        url.textContent = link.url;

        // 添加内容到卡片
        cardContent.appendChild(title);
        cardContent.appendChild(url);
        card.appendChild(icon);
        card.appendChild(cardContent);

        if (link.isPrivate) {
            const privateTag = document.createElement('div');
            privateTag.className = 'private-tag';
            privateTag.textContent = 'S';
            card.appendChild(privateTag);
        }

        const correctedUrl = link.url.startsWith('http://') || link.url.startsWith('https://') ? link.url : 'http://' + link.url;

        if (!isAdmin) {
            card.addEventListener('click', () => {
                window.open(correctedUrl, '_blank');
                logAction('打开链接', { name: link.name, url: correctedUrl });
            });
        }

        // 添加移动按钮
        const moveBtn = document.createElement('button');
        moveBtn.textContent = '↕';
        moveBtn.className = 'move-btn';
        moveBtn.setAttribute('draggable', 'true');
        moveBtn.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            dragStart(e);
        });
        card.appendChild(moveBtn);

        // 添加编辑按钮
        const editBtn = document.createElement('button');
        editBtn.textContent = '✎';
        editBtn.className = 'edit-btn';
        editBtn.style.display = 'none';
        editBtn.onclick = function(event) {
            event.stopPropagation();
            showEditDialog(card, link);
        };
        card.appendChild(editBtn);

        // 添加删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.style.display = 'none';
        deleteBtn.onclick = function(event) {
            event.stopPropagation();
            removeCard(card);
        };
        card.appendChild(deleteBtn);

        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('dragend', dragEnd);
        card.addEventListener('drop', drop);
        card.addEventListener('touchstart', touchStart, { passive: false });

        if (isAdmin && removeMode) {
            moveBtn.style.display = 'flex';
            editBtn.style.display = 'flex';
            deleteBtn.style.display = 'flex';
        }

        container.appendChild(card);
    }

    // 显示编辑对话框
    function showEditDialog(card, link) {
        const dialog = document.getElementById('edit-dialog-overlay');
        const nameInput = document.getElementById('edit-name-input');
        const urlInput = document.getElementById('edit-url-input');
        const categorySelect = document.getElementById('edit-category-select');
        const privateCheckbox = document.getElementById('edit-private-checkbox');

        // 填充当前值
        nameInput.value = link.name;
        urlInput.value = link.url;
        privateCheckbox.checked = link.isPrivate;

        // 更新分类选择
        categorySelect.innerHTML = '';
        Object.keys(categories).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            if (category === link.category) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });

        // 存储当前卡片的URL
        dialog.dataset.oldUrl = link.url;
        dialog.style.display = 'flex';

        logAction('显示编辑对话框', { name: link.name });
    }

    // 隐藏编辑对话框
    function hideEditDialog() {
        document.getElementById('edit-dialog-overlay').style.display = 'none';
        logAction('隐藏编辑对话框');
    }

    // 保存编辑
    async function saveEdit() {
        if (!await validateToken()) {
            return;
        }

        const dialog = document.getElementById('edit-dialog-overlay');
        const nameInput = document.getElementById('edit-name-input');
        const urlInput = document.getElementById('edit-url-input');
        const categorySelect = document.getElementById('edit-category-select');
        const privateCheckbox = document.getElementById('edit-private-checkbox');

        const newName = nameInput.value.trim();
        const newUrl = urlInput.value.trim();
        const newCategory = categorySelect.value;
        const newIsPrivate = privateCheckbox.checked;

        if (!newName || !newUrl || !newCategory) {
            alert('请填写所有必填字段');
            return;
        }

        // 查找并更新链接
        const oldUrl = dialog.dataset.oldUrl;
        const linkIndex = links.findIndex(link => link.url === oldUrl);
        if (linkIndex !== -1) {
            const link = links[linkIndex];
            const oldCategory = link.category;
            const oldIsPrivate = link.isPrivate;

            // 更新链接信息
            link.name = newName;
            link.url = newUrl;
            link.category = newCategory;
            link.isPrivate = newIsPrivate;

            // 更新对应的publicLinks或privateLinks
            if (oldIsPrivate) {
                const privateIndex = privateLinks.findIndex(l => l.url === oldUrl);
                if (privateIndex !== -1) {
                    privateLinks.splice(privateIndex, 1);
                }
            } else {
                const publicIndex = publicLinks.findIndex(l => l.url === oldUrl);
                if (publicIndex !== -1) {
                    publicLinks.splice(publicIndex, 1);
                }
            }

            // 添加到新的数组
            if (newIsPrivate) {
                privateLinks.push(link);
            } else {
                publicLinks.push(link);
            }

            // 更新分类
            if (oldCategory !== newCategory) {
                // 从旧分类中移除
                if (categories[oldCategory]) {
                    categories[oldCategory] = categories[oldCategory].filter(l => l.url !== oldUrl);
                }
                // 添加到新分类
                if (!categories[newCategory]) {
                    categories[newCategory] = [];
                }
                categories[newCategory].push(link);
            }

            try {
                // 保存更改
                await saveLinks();
                
                // 重新渲染分类
                renderCategories();
                
                hideEditDialog();
                logAction('保存编辑', { oldUrl, newName, newUrl, newCategory, newIsPrivate });
            } catch (error) {
                console.error('保存失败:', error);
                alert('保存失败，请重试');
            }
        }
    }

    // 更新分类选择下拉框
    function updateCategorySelect() {
        const categorySelect = document.getElementById('category-select');
        categorySelect.innerHTML = '';

        Object.keys(categories).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        logAction('更新分类选择', { categoryCount: Object.keys(categories).length });
    }

    // 保存链接数据
    async function saveLinks() {
        if (isAdmin && !(await validateToken())) {
            return;
        }

        let allLinks = [...publicLinks, ...privateLinks];

        try {
            const response = await fetch('/api/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    userId: 'tempUser',
                    links: allLinks,
                    categories: categories
                }),
            });

            if (!response.ok) {
                throw new Error('保存失败');
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error('保存失败');
            }

            logAction('保存链接', { linkCount: allLinks.length, categoryCount: Object.keys(categories).length });
            return true;
        } catch (error) {
            logAction('保存链接失败', { error: error.message });
            alert('保存链接失败，请重试');
            throw error;
        }
    }

    // 添加卡片弹窗
    async function addLink() {
        if (!await validateToken()) {
            return;
        }
        const name = document.getElementById('name-input').value;
        const url = document.getElementById('url-input').value;
        const category = document.getElementById('category-select').value;
        const isPrivate = document.getElementById('private-checkbox').checked;

        if (name && url && category) {
            const newLink = { name, url, category, isPrivate };

            if (isPrivate) {
                privateLinks.push(newLink);
            } else {
                publicLinks.push(newLink);
            }

            links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

            if (isAdmin || (isPrivate && isLoggedIn) || !isPrivate) {
                const container = document.getElementById(category);
                if (container) {
                    createCard(newLink, container);
                } else {
                    categories[category] = [];
                    renderCategories();
                }
            }

            saveLinks();

            document.getElementById('name-input').value = '';
            document.getElementById('url-input').value = '';
            document.getElementById('private-checkbox').checked = false;
            hideAddDialog();

            logAction('添加卡片', { name, url, category, isPrivate });
        }
    }

    // 删除卡片
    async function removeCard(card) {
        if (!await validateToken()) {
            return;
        }
        const name = card.querySelector('.card-title').textContent;
        const url = card.querySelector('.card-url').textContent;
        const isPrivate = card.dataset.isPrivate === 'true';

        if (confirm('确定要删除 "' + name + '" 吗？')) {
            links = links.filter(link => link.url !== url);
            if (isPrivate) {
                privateLinks = privateLinks.filter(link => link.url !== url);
            } else {
                publicLinks = publicLinks.filter(link => link.url !== url);
            }

            for (const key in categories) {
                categories[key] = categories[key].filter(link => link.url !== url);
            }

            card.remove();
            await saveLinks();
            logAction('删除卡片', { name, url, isPrivate });
        }
    }

    // 拖拽卡片
    let draggedCard = null;
    let touchStartX, touchStartY;

    // 触屏端拖拽卡片
    function touchStart(event) {
        if (!isAdmin) {
            return;
        }
        draggedCard = event.target.closest('.card');
        if (!draggedCard) return;

        event.preventDefault();
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;

        draggedCard.classList.add('dragging');

        document.addEventListener('touchmove', touchMove, { passive: false });
        document.addEventListener('touchend', touchEnd);

    }

    function touchMove(event) {
        if (!draggedCard) return;
        event.preventDefault();

        const touch = event.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;
        draggedCard.style.transform = "translate(" + deltaX + "px, " + deltaY + "px)";

        const target = findCardUnderTouch(currentX, currentY);
        if (target && target !== draggedCard) {
            const container = target.parentElement;
            const targetRect = target.getBoundingClientRect();

            if (currentX < targetRect.left + targetRect.width / 2) {
                container.insertBefore(draggedCard, target);
            } else {
                container.insertBefore(draggedCard, target.nextSibling);
            }
        }
    }

    function touchEnd(event) {
        if (!draggedCard) return;

        const card = draggedCard;
        const targetCategory = card.closest('.card-container').id;

        validateToken().then(isValid => {
            if (isValid && card) {
                updateCardCategory(card, targetCategory);
                saveCardOrder().catch(error => {
                    console.error('Save failed:', error);
                });
            }
            cleanupDragState();
        });
    }

    function findCardUnderTouch(x, y) {
        const cards = document.querySelectorAll('.card:not(.dragging)');
        return Array.from(cards).find(card => {
            const rect = card.getBoundingClientRect();
            return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        });
    }

    // PC端拖拽卡片
    function dragStart(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        draggedCard = event.target.closest('.card');
        if (!draggedCard) return;

        draggedCard.classList.add('dragging');
        event.dataTransfer.effectAllowed = "move";
        logAction('开始拖拽卡片', { name: draggedCard.querySelector('.card-title').textContent });
    }

    function dragOver(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const target = event.target.closest('.card');
        if (target && target !== draggedCard) {
            const container = target.parentElement;
            const mousePositionX = event.clientX;
            const targetRect = target.getBoundingClientRect();

            if (mousePositionX < targetRect.left + targetRect.width / 2) {
                container.insertBefore(draggedCard, target);
            } else {
                container.insertBefore(draggedCard, target.nextSibling);
            }
        }
    }

    // 清理拖拽状态函数
    function cleanupDragState() {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            draggedCard.style.transform = '';
            draggedCard = null;
        }

        document.removeEventListener('touchmove', touchMove);
        document.removeEventListener('touchend', touchEnd);

        touchStartX = null;
        touchStartY = null;
    }

    // PC端拖拽结束
    function drop(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        event.preventDefault();

        const card = draggedCard;
        const targetCategory = event.target.closest('.card-container').id;

        validateToken().then(isValid => {
            if (isValid && card) {
                updateCardCategory(card, targetCategory);
                saveCardOrder().catch(error => {
                    console.error('Save failed:', error);
                });
            }
            cleanupDragState();
        });
    }

    function dragEnd(event) {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            logAction('拖拽卡片结束');
        }
    }

    // 更新卡片分类
    function updateCardCategory(card, newCategory) {
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardUrl = card.querySelector('.card-url').textContent;
        const isPrivate = card.dataset.isPrivate === 'true';

        const linkIndex = links.findIndex(link => link.url === cardUrl);
        if (linkIndex !== -1) {
            links[linkIndex].category = newCategory;
        }

        const linkArray = isPrivate ? privateLinks : publicLinks;
        const arrayIndex = linkArray.findIndex(link => link.url === cardUrl);
        if (arrayIndex !== -1) {
            linkArray[arrayIndex].category = newCategory;
        }

        card.dataset.category = newCategory;
    }

    // 在页面加载完成后添加触摸事件监听器
    document.addEventListener('DOMContentLoaded', function() {
        const cardContainers = document.querySelectorAll('.card-container');
        cardContainers.forEach(container => {
            container.addEventListener('touchstart', touchStart, { passive: false });
        });
    });

    // 保存卡片顺序
    async function saveCardOrder() {
        if (!await validateToken()) {
            return;
        }
        const containers = document.querySelectorAll('.card-container');
        let newPublicLinks = [];
        let newPrivateLinks = [];
        let newCategories = {};

        containers.forEach(container => {
            const category = container.id;
            newCategories[category] = [];

            [...container.children].forEach(card => {
                const url = card.querySelector('.card-url').textContent;
                const name = card.querySelector('.card-title').textContent;
                const isPrivate = card.dataset.isPrivate === 'true';
                card.dataset.category = category;
                const link = { name, url, category, isPrivate };
                if (isPrivate) {
                    newPrivateLinks.push(link);
                } else {
                    newPublicLinks.push(link);
                }
                newCategories[category].push(link);
            });
        });

        publicLinks.length = 0;
        publicLinks.push(...newPublicLinks);
        privateLinks.length = 0;
        privateLinks.push(...newPrivateLinks);
        Object.keys(categories).forEach(key => delete categories[key]);
        Object.assign(categories, newCategories);

        logAction('保存卡片顺序', {
            publicCount: newPublicLinks.length,
            privateCount: newPrivateLinks.length,
            categoryCount: Object.keys(newCategories).length
        });

        try {
            const response = await fetch('/api/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    userId: 'tempUser',
                    links: [...newPublicLinks, ...newPrivateLinks],
                    categories: newCategories
                }),
            });
            const result = await response.json();
            if (!result.success) {
                throw new Error('Failed to save order');
            }
            logAction('保存卡片顺序', { publicCount: newPublicLinks.length, privateCount: newPrivateLinks.length, categoryCount: Object.keys(newCategories).length });
        } catch (error) {
            logAction('保存顺序失败', { error: error.message });
            alert('保存顺序失败，请重试');
        }
    }

    // 设置状态重新加载卡片
    function reloadCardsAsAdmin() {
        document.querySelectorAll('.card-container').forEach(container => {
            container.innerHTML = '';
        });
        loadLinks();
        logAction('重新加载卡片（管理员模式）');
    }

    // 密码输入框回车事件
    document.getElementById('admin-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            toggleSecretGarden();
        }
    });

    // 切换设置状态
    async function toggleAdminMode() {
        const adminBtn = document.getElementById('admin-mode-btn');
        const editControls = document.querySelector('.edit-controls');

        if (!isAdmin && isLoggedIn) {
            if (!await validateToken()) {
                return;
            }

            // 在进入设置模式之前进行备份
            try {
                const response = await fetch('/api/backupData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        sourceUserId: 'tempUser',
                        backupUserId: 'backup'
                    }),
                });
                const result = await response.json();
                if (result.success) {
                    logAction('数据备份成功');
                } else {
                    throw new Error('备份失败');
                }
            } catch (error) {
                logAction('数据备份失败', { error: error.message });
                if (!confirm('备份失败，是否仍要继续进入设置模式？')) {
                    return;
                }
            }

            isAdmin = true;
            adminBtn.textContent = "退出设置";
            editControls.style.display = 'flex';
            alert('准备设置分类和书签');
            reloadCardsAsAdmin();
            logAction('进入设置');
        } else if (isAdmin) {
            isAdmin = false;
            removeMode = false;
            adminBtn.textContent = "设  置";
            editControls.style.display = 'none';
            alert('设置已保存');
            reloadCardsAsAdmin();
            logAction('离开设置');
        }

        updateUIState();
    }

    // 切换到登录状态
    function toggleSecretGarden() {
        const passwordInput = document.getElementById('admin-password');
        if (!isLoggedIn) {
            verifyPassword(passwordInput.value)
                .then(result => {
                    if (result.valid) {
                        isLoggedIn = true;
                        localStorage.setItem('authToken', result.token);
                        console.log('Token saved:', result.token);
                        loadLinks();
                        alert('登录成功！');
                        logAction('登录成功');
                    } else {
                        alert('密码错误');
                        logAction('登录失败', { reason: result.error || '密码错误' });
                    }
                    updateUIState();
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('登录过程出错，请重试');
                });
        } else {
            isLoggedIn = false;
            isAdmin = false;
            localStorage.removeItem('authToken');
            links = publicLinks;
            loadSections();
            alert('退出登录！');
            updateUIState();
            passwordInput.value = '';
            logAction('退出登录');
        }
    }

    // 应用暗色主题
    function applyDarkTheme() {
        document.body.classList.add('dark-theme');
        isDarkTheme = true;
        logAction('应用暗色主题');
    }

    // 显示添加链接对话框
    function showAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'flex';
        logAction('显示添加链接对话框');
    }

    // 隐藏添加链接对话框
    function hideAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'none';
        logAction('隐藏添加链接对话框');
    }

    // 切换删除卡片模式
    function toggleRemoveMode() {
        removeMode = !removeMode;
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');
        const moveButtons = document.querySelectorAll('.move-btn');
        const editModeBtn = document.querySelector('.admin-btn[onclick="toggleRemoveMode()"]');
        
        editButtons.forEach(btn => {
            btn.style.display = removeMode ? 'flex' : 'none';
        });
        
        deleteButtons.forEach(btn => {
            btn.style.display = removeMode ? 'flex' : 'none';
        });

        moveButtons.forEach(btn => {
            btn.style.display = removeMode ? 'flex' : 'none';
        });

        // 更新按钮文本
        editModeBtn.textContent = removeMode ? '完成编辑' : '卡片编辑';
        
        logAction('切换卡片编辑模式', { removeMode });
    }

    //切换删除分类模式
    function toggleRemoveCategory() {
        isRemoveCategoryMode = !isRemoveCategoryMode;
        const deleteButtons = document.querySelectorAll('.delete-category-btn');
        const editButtons = document.querySelectorAll('.edit-category-btn');
        const editCategoryBtn = document.querySelector('.admin-btn[onclick="toggleRemoveCategory()"]');
        
        deleteButtons.forEach(btn => {
            btn.style.display = isRemoveCategoryMode ? 'inline-block' : 'none';
        });
        
        editButtons.forEach(btn => {
            btn.style.display = isRemoveCategoryMode ? 'inline-block' : 'none';
        });

        // 更新按钮文本
        editCategoryBtn.textContent = isRemoveCategoryMode ? '完成编辑' : '分类编辑';
        
        logAction('切换分类编辑模式', { isRemoveCategoryMode });
    }

    // 切换主题
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;

        // 添加或移除暗色主题类
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }

        logAction('切换主题', { isDarkTheme });
    }

    // 验证密码
    async function verifyPassword(inputPassword) {
        const response = await fetch('/api/verifyPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: inputPassword }),
        });
        const result = await response.json();
        return result;
    }

    // 初始化加载
    document.addEventListener('DOMContentLoaded', async () => {
        await validateToken();
        loadLinks().then(() => {
            // 初始加载完成后，检测当前可见分类
            setTimeout(setActiveCategoryButtonByVisibility, 500);
        });
    });


    // 前端检查是否有 token
    async function validateToken() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            isLoggedIn = false;
            updateUIState();
            return false;
        }

        try {
            const response = await fetch('/api/getLinks?userId=tempUser', {
                headers: { 'Authorization': token }
            });

            if (response.status === 401) {
                await resetToLoginState('token已过期，请重新登录');
                return false;
            }

            isLoggedIn = true;
            updateUIState();
            return true;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }

    // 重置状态
    async function resetToLoginState(message) {
        alert(message);

        cleanupDragState();

        localStorage.removeItem('authToken');
        isLoggedIn = false;
        isAdmin = false;
        removeMode = false;
        isRemoveCategoryMode = false;

        const passwordInput = document.getElementById('admin-password');
        if (passwordInput) {
            passwordInput.value = '';
        }

        updateUIState();
        links = publicLinks;
        loadSections();

        const addRemoveControls = document.querySelector('.add-remove-controls');
        if (addRemoveControls) {
            addRemoveControls.style.display = 'none';
        }

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        document.querySelectorAll('.delete-category-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        const dialogOverlay = document.getElementById('dialog-overlay');
        if (dialogOverlay) {
            dialogOverlay.style.display = 'none';
        }
    }

    </script>
</body>

</html>
`;

// 服务端 token 验证
async function validateServerToken(authToken, env) {
    if (!authToken) {
        return {
            isValid: false,
            status: 401,
            response: { error: 'Unauthorized', message: '未登录或登录已过期' }
        };
    }

    try {
        const [timestamp, hash] = authToken.split('.');
        const tokenTimestamp = parseInt(timestamp);
        const now = Date.now();

        const FIFTEEN_MINUTES = 15 * 60 * 1000;
        if (now - tokenTimestamp > FIFTEEN_MINUTES) {
            return {
                isValid: false,
                status: 401,
                response: {
                    error: 'Token expired',
                    tokenExpired: true,
                    message: '登录已过期，请重新登录'
                }
            };
        }

        const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
        const encoder = new TextEncoder();
        const data = encoder.encode(tokenData);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const expectedHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

        if (hash !== expectedHash) {
            return {
                isValid: false,
                status: 401,
                response: {
                    error: 'Invalid token',
                    tokenInvalid: true,
                    message: '登录状态无效，请重新登录'
                }
            };
        }

        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            status: 401,
            response: {
                error: 'Invalid token',
                tokenInvalid: true,
                message: '登录验证失败，请重新登录'
            }
        };
    }
}

export default {
    async fetch(request, env) {
      const url = new URL(request.url);

      if (url.pathname === '/') {
        return new Response(HTML_CONTENT, {
          headers: { 'Content-Type': 'text/html' }
        });
      }

      if (url.pathname === '/api/getLinks') {
        try {
            const userId = url.searchParams.get('userId');
            const authToken = request.headers.get('Authorization');
            const data = await env.CARD_ORDER.get(userId);

            if (!data) {
                // 如果没有数据，返回空数据
                return new Response(JSON.stringify({
                    links: [],
                    categories: {}
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            let parsedData;
            try {
                parsedData = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing data:', parseError);
                return new Response(JSON.stringify({
                    error: 'Invalid data format',
                    message: '数据格式错误'
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // 确保数据结构正确
            if (!parsedData.links) {
                parsedData.links = [];
            }
            if (!parsedData.categories) {
                parsedData.categories = {};
            }

            // 验证 token
            if (authToken) {
                const validation = await validateServerToken(authToken, env);
                if (!validation.isValid) {
                    // Token 无效时，返回公开数据
                    const filteredLinks = parsedData.links.filter(link => !link.isPrivate);
                    const filteredCategories = {};
                    Object.keys(parsedData.categories).forEach(category => {
                        const categoryData = parsedData.categories[category];
                        const categoryLinks = Array.isArray(categoryData) ? categoryData : 
                                           (categoryData.links || []);
                        const filteredCategoryLinks = categoryLinks.filter(link => !link.isPrivate);
                        if (filteredCategoryLinks.length > 0) {
                            filteredCategories[category] = filteredCategoryLinks;
                        }
                    });

                    return new Response(JSON.stringify({
                        links: filteredLinks,
                        categories: filteredCategories
                    }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                // Token 有效，返回完整数据
                return new Response(JSON.stringify(parsedData), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // 未提供 token，只返回公开数据
            const filteredLinks = parsedData.links.filter(link => !link.isPrivate);
            const filteredCategories = {};
            Object.keys(parsedData.categories).forEach(category => {
                const categoryData = parsedData.categories[category];
                const categoryLinks = Array.isArray(categoryData) ? categoryData : 
                                   (categoryData.links || []);
                const filteredCategoryLinks = categoryLinks.filter(link => !link.isPrivate);
                if (filteredCategoryLinks.length > 0) {
                    filteredCategories[category] = filteredCategoryLinks;
                }
            });

            return new Response(JSON.stringify({
                links: filteredLinks,
                categories: filteredCategories
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Server error in getLinks:', error);
            return new Response(JSON.stringify({
                error: 'Internal server error',
                message: '服务器内部错误',
                details: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
      }

      if (url.pathname === '/api/saveOrder' && request.method === 'POST') {
        const authToken = request.headers.get('Authorization');
        const validation = await validateServerToken(authToken, env);

        if (!validation.isValid) {
            return new Response(JSON.stringify(validation.response), {
                status: validation.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { userId, links, categories } = await request.json();
        await env.CARD_ORDER.put(userId, JSON.stringify({ links, categories }));
        return new Response(JSON.stringify({
            success: true,
            message: '保存成功'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
      }

      if (url.pathname === '/api/verifyPassword' && request.method === 'POST') {
        try {
            const { password } = await request.json();
            const isValid = password === env.ADMIN_PASSWORD;

            if (isValid) {
                // 生成包含时间戳的加密 token
                const timestamp = Date.now();
                const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
                const encoder = new TextEncoder();
                const data = encoder.encode(tokenData);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);

                // 使用指定格式：timestamp.hash
                const token = timestamp + "." + btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

                return new Response(JSON.stringify({
                    valid: true,
                    token: token
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify({
                valid: false,
                error: 'Invalid password'
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                valid: false,
                error: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
      }

      if (url.pathname === '/api/backupData' && request.method === 'POST') {
        const { sourceUserId } = await request.json();
        const result = await this.backupData(env, sourceUserId);
        return new Response(JSON.stringify(result), {
          status: result.success ? 200 : 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response('Not Found', { status: 404 });
    },

    async backupData(env, sourceUserId) {
        const MAX_BACKUPS = 10;
        const sourceData = await env.CARD_ORDER.get(sourceUserId);

        if (sourceData) {
            try {
                const currentDate = new Date().toLocaleString('zh-CN', {
                    timeZone: 'Asia/Shanghai',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).replace(/\//g, '-');

                const backupId = `backup_${currentDate}`;

                const backups = await env.CARD_ORDER.list({ prefix: 'backup_' });
                const backupKeys = backups.keys.map(key => key.name).sort((a, b) => {
                    const timeA = new Date(a.split('_')[1].replace(/-/g, '/')).getTime();
                    const timeB = new Date(b.split('_')[1].replace(/-/g, '/')).getTime();
                    return timeB - timeA;  // 降序排序，最新的在前
                });

                await env.CARD_ORDER.put(backupId, sourceData);

                const allBackups = [...backupKeys, backupId].sort((a, b) => {
                    const timeA = new Date(a.split('_')[1].replace(/-/g, '/')).getTime();
                    const timeB = new Date(b.split('_')[1].replace(/-/g, '/')).getTime();
                    return timeB - timeA;
                });

                const backupsToDelete = allBackups.slice(MAX_BACKUPS);

                if (backupsToDelete.length > 0) {
                    await Promise.all(
                        backupsToDelete.map(key => env.CARD_ORDER.delete(key))
                    );
                }

                return {
                    success: true,
                    backupId,
                    remainingBackups: MAX_BACKUPS,
                    deletedCount: backupsToDelete.length
                };
            } catch (error) {
                return {
                    success: false,
                    error: 'Backup operation failed',
                    details: error.message
                };
            }
        }
        return { success: false, error: 'Source data not found' };
    }
  };

// ==UserScript==
// @name         CrossPaste 护眼灰主题
// @namespace    http://tampermonkey.net/
// @version      2.1
// @match        https://crosspaste.app/app*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function injectTheme() {
        const existing = document.getElementById('crosspaste-theme');
        if (existing) existing.remove(); // 每次强制刷新，防止被覆盖

        const style = document.createElement('style');
        style.id = 'crosspaste-theme';

        style.innerHTML = `
        /*
         * 修复1：同时覆盖 :root 和 html.dark（页面使用了 class="dark"）
         * 修复2：变量格式改为 shadcn/ui 的 HSL 格式 "H S% L%"
         */
        :root,
        html,
        html.dark {
            --background:         0 0% 25%   !important; /* rgb(64,64,64)   */
            --card:               0 0% 23%   !important; /* rgb(58,58,58)   */
            --card-foreground:    0 0% 90%   !important; /* rgb(230,230,230)*/
            --popover:            0 0% 23%   !important;
            --popover-foreground: 0 0% 90%   !important;

            --foreground:         0 0% 90%   !important;
            --muted:              0 0% 27%   !important;
            --muted-foreground:   0 0% 71%   !important; /* rgb(180,180,180)*/

            --border:             0 0% 35%   !important; /* rgb(90,90,90)   */
            --input:              0 0% 27%   !important; /* rgb(70,70,70)   */

            --primary:            0 0% 47%   !important; /* rgb(120,120,120)*/
            --primary-foreground: 0 0% 100%  !important;

            --secondary:          0 0% 30%   !important;
            --secondary-foreground: 0 0% 90% !important;

            /* 补上原脚本缺失的变量（hover 态用到） */
            --accent:             0 0% 32%   !important;
            --accent-foreground:  0 0% 90%   !important;

            --destructive:        0 62% 30%  !important;
            --ring:               0 0% 47%   !important;
        }

        /* 兜底：body 背景直接写死，防止变量失效时露白 */
        body {
            background-color: rgb(64, 64, 64) !important;
            color: rgb(230, 230, 230) !important;
        }

        /* textarea 有内联 Tailwind 任意值 bg-[#f9f9f9]，必须 !important 覆盖 */
        textarea {
            background-color: rgb(58, 58, 58) !important;
            color: rgb(230, 230, 230) !important;
            caret-color: white !important;
            border-color: rgb(90, 90, 90) !important;
        }

        textarea::placeholder {
            color: #aaa !important;
        }

        button:hover {
            filter: brightness(1.1);
        }
        /* === 保留 Paste 按钮（bg-primary）原始配色 === */
        button.bg-primary {
        background-color: hsl(271.88, 85.89%, 47.25%) !important;
        color: hsl(0 0% 9%) !important;
        }

        button.bg-primary:hover {
        background-color: hsl(0 0% 88%) !important;  /* 略暗，模拟 hover:bg-primary/90 */
        filter: none !important;  /* 取消全局 button:hover 的 brightness */
        }

        /* 按钮内的 svg 和 span 文字也要跟着改回深色 */
        button.bg-primary svg,
        button.bg-primary span {
        color: hsl(0 0% 88%) !important;
        }
        `;

        document.head.appendChild(style);
    }

    injectTheme();

    // 监听 DOM 变化，防止框架重渲染后丢失样式
    const observer = new MutationObserver(() => {
        if (!document.getElementById('crosspaste-theme')) {
            injectTheme();
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
// ==UserScript==
// @name         CrossPaste white background fix
// @namespace    http://tampermonkey.net/
// @version      2.2
// @match        https://crosspaste.app/app*
// @author       Septuagint,URL:https://Candy-spt.com/
// ==/UserScript==

(function () {
    'use strict';

    function injectTheme() {
        const existing = document.getElementById('crosspaste-theme');
        if (existing) existing.remove(); 

        const style = document.createElement('style');
        style.id = 'crosspaste-theme';

        style.innerHTML = `
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

            --accent:             0 0% 32%   !important;
            --accent-foreground:  0 0% 90%   !important;

            --destructive:        0 62% 30%  !important;
            --ring:               0 0% 47%   !important;
        }

        body {
            background-color: rgb(64, 64, 64) !important;
            color: rgb(230, 230, 230) !important;
        }

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
        button.bg-primary {
        background-color: hsl(271.88, 85.89%, 47.25%) !important;
        color: hsl(0 0% 9%) !important;
        }

        button.bg-primary:hover {
        background-color: hsl(0 0% 88%) !important; 
        filter: none !important;  
        }

        button.bg-primary svg,
        button.bg-primary span {
        color: hsl(0 0% 88%) !important;
        }
        `;

        document.head.appendChild(style);
    }

    injectTheme();

    const observer = new MutationObserver(() => {
        if (!document.getElementById('crosspaste-theme')) {
            injectTheme();
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();

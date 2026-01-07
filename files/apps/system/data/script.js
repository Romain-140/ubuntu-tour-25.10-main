let data = {
    "window-test-topbar draggable": "<ul><li><a id='window-fullscreen'>Fullscreen</a></li><li><a id='window-close'>Close Window</a></li></ul>",
    "main-menu": "<ul><li><a id='option-1'>Notification Test</a></li><li><a id='option-2'>Window Test</a></li><li><a>Custom Option 3</a></li><hr><li><a>Option 4</a></li></ul>",
    "connection-icons": {
        0 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q95-97 219.5-148.5T480-800q136 0 260.5 51.5T960-600L480-120Zm0-114 364-364q-79-60-172-91t-192-31q-99 0-192 31t-172 91l364 364Z"/></svg>',
        1 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q96-98 220-149t260-51q137 0 261 51t219 149L480-120ZM361-353q25-18 55.5-28t63.5-10q33 0 63.5 10t55.5 28l245-245q-78-59-170.5-90.5T480-720q-101 0-193.5 31.5T116-598l245 245Z"/></svg>',
        2 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q96-98 220-149t260-51q137 0 261 51t219 149L480-120ZM232-482q53-38 116-59.5T480-563q69 0 132 21.5T728-482l116-116q-78-59-170.5-90.5T480-720q-101 0-193.5 31.5T116-598l116 116Z"/></svg>',
        3 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q95-97 219.5-148.5T480-800q136 0 260.5 51.5T960-600L480-120Z"/></svg>'
    },
    "battery-icons": {
        0 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-400h80v-240h-80v240Zm40 160q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240ZM320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-80h240v-560H360v560Zm0 0h240-240Z"/></svg>',
        1 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-240h240v-400H360v400Z"/></svg>',
        2 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-400h240v-240H360v240Z"/></svg>',
        3 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-560h240v-80H360v80Z"/></svg>',
        4 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Z"/></svg>',
        "charging" : '<svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#e3e3e3"><g transform="scale(0.7)"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></g></svg>'
    },
    "top-right-menu menu": '<div class="menu-battery" id="menu-battery"></div><div style="grid-column: span 2"></div><div class="menu-item" id="menu-screenshot"></div><div class="menu-item" id="menu-settings"></div><div class="menu-item" id="menu-lock"></div><div class="menu-item" id="menu-shutdown"></div><div class="menu-icon sound-icon" id="menu-sound-icon"></div><input type="range" id="sound-selection" class="menu-range" min="0" max="1" value="0.3" step="0.01" /><div class="menu-icon brightness-icon" id="menu-brightness-icon"></div><input type="range" id="brightness-selection" class="menu-range" min="0" max="1" value="1" step="0.01" /><div style="grid-column: span 8;"></div><div class="large-menu-item large-menu-container off" id="menu-performance-item"><div class="large-menu-left" id="performance-quick-switch"><div class="large-menu-icon left" id="performance-icon"></div><div class="large-menu-text">Power Mode<br/><span class="performance-subtext">Balanced</span></div></div><div class="large-menu-right" id="performance-settings"></div></div><div class="large-menu-item off single-item" id="menu-night-light"><div class="large-menu-icon" id="night-light-icon"></div><div class="large-menu-text">Night Light</div></div><div class="large-menu-item off single-item" id="menu-dark-style"><div class="large-menu-icon" id="dark-style-icon"></div><div class="large-menu-text">Dark Style</div></div><div class="large-menu-item off single-item" id="menu-dot-not-disturb"><div class="large-menu-icon" id="do-not-disturb-icon"></div><div class="large-menu-text">Do Not Disturb</div></div>',
    "top-right-menu-icons": {
        "performances": {
            "battery": '',
            "balanced": '',
            "performance": ''
        },
        "night-light": '',
        "dark-style": '',
        "dot-not-disturb": '',

        "brightness": '',
        "sound": '',
        "screenshot": '',
        "settings": '',
        "lock": '',
        "shutdown": ''
    },
    "arrow-right-1" : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>',
};

function onStart() {
    let jsonElement = document.getElementById('script-data');
    jsonElement.id = 'json-data';
    jsonElement.innerHTML = JSON.stringify(data);
}

// TODO find icons (look into Ubuntu system files)
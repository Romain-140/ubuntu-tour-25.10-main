function addOpenMenuEvent() {
    const customMenu = document.getElementById('custom-menu');

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();

        if (e.target !== document.getElementById('selection') && e.target !== document.getElementById('window-space')) return;

        customMenu.classList.remove('disappear');
        customMenu.style.display = 'block';

        var posY = e.clientY;
        var posX = e.clientX;

        if (e.clientY + customMenu.clientHeight + 5 >= window.innerHeight) {
            posY -= customMenu.clientHeight + 5;
        }

        if (e.clientX + customMenu.clientWidth + 5 >= window.innerWidth) {
            posX -= customMenu.clientWidth + 5;
        }


        customMenu.style.left = `${posX/window.innerWidth * 100}%`;
        customMenu.style.top = `${posY/window.innerHeight * 100}%`;

        customMenu.style.display = 'block';
    });
}

function addCloseMenuEvent() {
    const customMenu = document.getElementById('custom-menu');
    document.addEventListener('mouseup', function(e) {
        if (e.button !== 2) {
            customMenu.classList.add('disappear');
            setTimeout( () => {customMenu.style.display = 'none';}, 75)
        }
    });
}

function addSelectionDivInteration() {

    const selectionDiv = document.getElementById('selection');
    let startX, startY;

    let windowSpace = document.getElementById('window-space');

    windowSpace.addEventListener('mousedown', function(e) {

        if (e.target !== windowSpace || e.button === 2) return;

        startX = e.clientX;
        startY = e.clientY;

        selectionDiv.style.left = `${startX}px`;
        selectionDiv.style.top = `${startY}px`;
        selectionDiv.style.width = '0px';
        selectionDiv.style.height = '0px';
        selectionDiv.style.display = 'block';

        document.addEventListener('mousemove', onMouseMove);
    });

    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', onMouseMove);
        selectionDiv.style.display = 'none';
    });

    function onMouseMove(e) {

        // Prevent overflow

        var height = e.clientY - startY - 1;
        var width = e.clientX - startX - 1;


        // Calc

        selectionDiv.style.width = `${Math.abs(width)}px`;
        selectionDiv.style.height = `${Math.abs(height)}px`;

        if (width < 0) {
            selectionDiv.style.left = `${e.clientX}px`;
        } else {
            selectionDiv.style.left = `${startX}px`;
        }

        if (height < 0) {
            selectionDiv.style.top = `${e.clientY}px`;
        } else {
            selectionDiv.style.top = `${startY}px`;
        }
    }
}

function createBackgroundDiv() {
    const background = document.createElement('div');
    background.style.zIndex = 0;
    background.id = 'background';
    background.classList.add('background');
    document.body.appendChild(background);
}

function createMenuDiv() {
    const menu = document.createElement('div');
    menu.innerHTML = "<ul><li><a id='option-1'>Notification Test</a></li><li><a id='option-2'>Window Test</a></li><li><a>Custom Option 3</a></li><hr><li><a>Option 4</a></li></ul>";
    menu.id = "custom-menu";
    menu.classList.add("custom-menu");
    document.body.appendChild(menu);
}

function createSelectionDiv() {
    const selection = document.createElement('div');
    selection.id = "selection"
    selection.className = "selection"
    selection.style.display = "none"
    document.body.appendChild(selection);
}

function createTopBarDiv() {
    const mainBar = document.createElement('div');
    const rightBar = document.createElement('div');
    const midBar = document.createElement('div');
    const leftBar = document.createElement('div');

    mainBar.className = "topbar";
    mainBar.id = "topbar";

    leftBar.className = "top-left";
    leftBar.id = "top-left";

    midBar.className = "top-mid";
    midBar.id = "top-mid";

    rightBar.className = "top-right";
    rightBar.id = "top-right";

    mainBar.appendChild(leftBar);
    mainBar.appendChild(midBar);
    mainBar.appendChild(rightBar);

    document.body.appendChild(mainBar);
}

function updateTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {month: 'short',day: 'numeric',hour: '2-digit',minute: '2-digit',hour12: false});
    const formatted = formatter.format(now);
    const final = formatted.replace(',', '');
    return final;
}

function addTimeDiv() {
    let element = document.getElementsByClassName('top-mid')[0];
    let timeDiv = document.createElement('div');
    timeDiv.className = 'time item';
    timeDiv.id = 'time';
    timeDiv.textContent = updateTime();
    
    setInterval(() => {timeDiv.textContent = updateTime()}, 1000);
    
    element.appendChild(timeDiv);
}

function addUpdateElementsTopRight() {

    // Network

    if (localStorage.getItem('networkUpdate')) {
        setInterval(() => {
            let connectionType = navigator.connection.effectiveType;
            let quality = 0;

            let icons = {
                0 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q95-97 219.5-148.5T480-800q136 0 260.5 51.5T960-600L480-120Zm0-114 364-364q-79-60-172-91t-192-31q-99 0-192 31t-172 91l364 364Z"/></svg>',
                1 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q96-98 220-149t260-51q137 0 261 51t219 149L480-120ZM361-353q25-18 55.5-28t63.5-10q33 0 63.5 10t55.5 28l245-245q-78-59-170.5-90.5T480-720q-101 0-193.5 31.5T116-598l245 245Z"/></svg>',
                2 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q96-98 220-149t260-51q137 0 261 51t219 149L480-120ZM232-482q53-38 116-59.5T480-563q69 0 132 21.5T728-482l116-116q-78-59-170.5-90.5T480-720q-101 0-193.5 31.5T116-598l116 116Z"/></svg>',
                3 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q95-97 219.5-148.5T480-800q136 0 260.5 51.5T960-600L480-120Z"/></svg>'
            };

            if (connectionType === '4g') {
                quality = 3;
            } else if (connectionType === '3g') {
                quality = 2;
            } else if (connectionType === '2g') {
                quality = 1;
            }

            let netowrkElement = document.getElementById('network');
            netowrkElement.innerHTML = '';

            let icon = document.createElement('svg');
            icon.innerHTML = icons[quality];
            netowrkElement.appendChild(icon);

        }, 3000);
    }

    // Battery

    if (localStorage.getItem('batteryUpdate')) {
        setInterval(async function () {
            let batteryData = await navigator.getBattery();
            let icons = {
                0 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-400h80v-240h-80v240Zm40 160q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240ZM320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-80h240v-560H360v560Zm0 0h240-240Z"/></svg>',
                1 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-240h240v-400H360v400Z"/></svg>',
                2 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-400h240v-240H360v240Z"/></svg>',
                3 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Zm40-560h240v-80H360v80Z"/></svg>',
                4 : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Z"/></svg>'
            };  
            let charging = '<svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#e3e3e3"><g transform="scale(0.7)"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></g></svg>';

            let batteryElement = document.getElementById('battery');

            batteryElement.innerHTML = '';

            if (batteryData.charging)  {
                let icon = document.createElement('svg');
                icon.innerHTML = charging;  
                icon.style.width = "10px";
                batteryElement.appendChild(icon);
            }

            if (batteryData.level < 0.1) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons[0];
                batteryElement.appendChild(icon);
            } else if (batteryData.level < 0.2) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons[1];
                batteryElement.appendChild(icon);
            } else if (batteryData.level < 0.5) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons[2];
                batteryElement.appendChild(icon);
            } else if (batteryData.level < 0.8) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons[3];
                batteryElement.appendChild(icon);
            } else {
                let icon = document.createElement('svg');
                icon.innerHTML = icons[4];
                batteryElement.appendChild(icon);
            }
        }, 3000)
    }
}

function addTopRightElements() {
    let elements = document.createElement('div');
    elements.classList.add('item');
    elements.classList.add('top-bar-right');

    localStorage.removeItem('networkUpdate');
    localStorage.removeItem('batteryUpdate');

    // Network

    let networkElement = document.createElement('div');
    networkElement.id = 'network';
    networkElement.classList.add('network-display');
    networkElement.classList.add('icon');

    let networkIcon = document.createElement('div');
    networkIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 0-600q95-97 219.5-148.5T480-800q136 0 260.5 51.5T960-600l-40 40q-28-36-69.5-58T760-640q-83 0-141.5 58.5T560-440q0 49 22 90.5t58 69.5L480-120Zm280-40q-17 0-29.5-12.5T718-202q0-17 12.5-29.5T760-244q17 0 29.5 12.5T802-202q0 17-12.5 29.5T760-160Zm-30-128q0-38 10-59t43-54q21-21 27-31.5t6-26.5q0-18-14-31.5T765-504q-21 0-39 13.5T700-454l-54-22q12-38 44-61t75-23q49 0 80 29t31 74q0 23-10 41t-38 46q-24 24-30 38.5t-6 43.5h-62Z"/></svg>';
    networkElement.appendChild(networkIcon);

    if (navigator.connection) localStorage.setItem('networkUpdate', true);

    // Sound

    let soundElement = document.createElement('div');
    soundElement.id = 'sound';
    soundElement.classList.add('sound-display');
    soundElement.classList.add('icon');

    let soundIcon = document.createElement('svg');
    soundIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>';
    soundElement.appendChild(soundIcon.children.item(0));

    // Battery

    let batteryElement = document.createElement('div');
    batteryElement.id = 'battery';
    batteryElement.classList.add('battery-display');
    batteryElement.classList.add('icon');

    let batteryIcon = document.createElement('svg');
    batteryIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M656-182q0-14 .5-27.5T664-235q10-17 25.5-29t26.5-28q3-4 7-23 0-17-13-28t-30-11q-17 0-30 11t-18 28l-44-19q10-30 35-48t57-18q37 0 64.5 24t27.5 60q0 11-3 20.5t-9 17.5q-11 16-26 28.5T710-220q-6 11-6 38h-48Zm24 102q-14 0-24-9.5T646-113q0-14 10-24t24-10q14 0 23.5 10t9.5 24q0 14-9.5 23.5T680-80Zm-320-80Zm-40 80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v280q-21 0-41 3.5T600-466v-254H360v560h94q8 23 19.5 43T501-80H320Z"/></svg>';
    batteryElement.appendChild(batteryIcon.children.item(0));

    if (navigator.userAgentData) localStorage.setItem('batteryUpdate', true);

    // // //

    elements.appendChild(networkElement);
    elements.appendChild(soundElement);
    elements.appendChild(batteryElement);

    addUpdateElementsTopRight();

    document.getElementById('top-right').appendChild(elements);
}

function addTopBarMenues() {

    // Time

    let timeDiv = document.getElementById('time');

    function addTimeMenu(e) {
        e.stopPropagation();

        function removeMenu(event) {
            let menuDiv = document.getElementsByClassName('time-menu')[0];
            if (menuDiv.contains(event.target)) return;
            menuDiv.classList.add('remove');
            setTimeout(function () {menuDiv.outerHTML = ''}, 100);
            document.removeEventListener('mousedown', removeMenu)
        }

        if (document.getElementsByClassName('time-menu').length > 0) return;
        else {
            let menuDiv = document.createElement('div');
            menuDiv.classList.add('time-menu');
            menuDiv.classList.add('menu');
            // menuDiv.innerHTML = "<div id='notifications-space' class='notifications-space' style='height: 100%'></div>";
            // // // TODO: add notification container here & calendar
            document.body.appendChild(menuDiv);

            document.addEventListener('mousedown', removeMenu);
        }
    }

    timeDiv.addEventListener('mousedown', addTimeMenu);

    // Top Right

    let rightDiv = document.getElementsByClassName('top-bar-right')[0];

    function addTopRightMenu(e) {
        e.stopPropagation()

        function removeMenu(event) {
            let menuDiv = document.getElementsByClassName('top-right-menu')[0];
            if (menuDiv.contains(event.target)) return;
            menuDiv.classList.add('remove');
            setTimeout(function () {menuDiv.outerHTML = ''}, 100);
            document.removeEventListener('mousedown', removeMenu);
        }

        if (document.getElementsByClassName('top-right-menu').length > 0) return;
        else {
            let menuDiv = document.createElement('div');
            menuDiv.classList.add('top-right-menu');
            menuDiv.classList.add('menu');
            // // // TODO: add light, battery, [screenshot, lock, settings, turn off], parametters
            document.body.appendChild(menuDiv);

            document.addEventListener('mousedown', removeMenu);
        }
    }

    rightDiv.addEventListener('mousedown', addTopRightMenu);

}

function addWindowSpace() {
    let windowSpace = document.createElement('div');
    windowSpace.id = 'window-space';
    windowSpace.classList.add('window-space');
    windowSpace.style.height = `${window.innerHeight - 31}px`;
    setInterval(() => {windowSpace.style.height = `${window.innerHeight - 31}px`}, 100);
    document.body.append(windowSpace);  
}

function addStyle() {
    const mainStyle = document.createElement('link');
    mainStyle.rel = 'stylesheet';
    mainStyle.href = './files/apps/system/home-view/main.css';
    document.head.appendChild(mainStyle);
}

function onStart() {

    // Home Menu
    createMenuDiv();
    createBackgroundDiv();
    createSelectionDiv();
    addOpenMenuEvent();
    addCloseMenuEvent();

    // To Bar
    createTopBarDiv();
    addTopRightElements();
    addTimeDiv();
    addTopBarMenues();
    addStyle();

    // Windows
    addWindowSpace();
    loadApp('notification-manager');
    loadApp('window-manager');

    // Load after
    addSelectionDivInteration();

    // loadApp('browser-compatibility');

    document.getElementById('script-home-view').outerHTML = '';
}
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
    let JSONData = document.getElementById('json-data');

    const menu = document.createElement('div');
    menu.innerHTML = JSON.parse(JSONData.innerHTML)["main-menu"];
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

    let JSONData = document.getElementById('json-data');

    // Network

    if (localStorage.getItem('networkUpdate')) {
        setInterval(() => {
            let connectionType = navigator.connection.effectiveType;
            let quality = "low";

            let icons = JSON.parse(JSONData.innerHTML)["connection-icons"]

            if (connectionType === '4g') {
                quality = "high";
            } else if (connectionType === '3g') {
                quality = "medium";
            } else if (connectionType === '2g') {
                quality = "low";
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
            let icons = JSON.parse(JSONData.innerHTML)["battery-icons"];
            let charging = JSON.parse(JSONData.innerHTML)["battery-icons"]["charging"];


            let batteryElement = document.getElementById('battery');

            batteryElement.innerHTML = '';

            if (batteryData.charging)  {
                icons = icons['charging'];
            } else {
                icons = icons['discharging'];
            }

            if (batteryData.level < 0.1) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons["empty"];
                batteryElement.appendChild(icon);
            } else if (batteryData.level < 0.3) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons["low"];
                batteryElement.appendChild(icon);
            } else if (batteryData.level < 0.5) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons["medium"];
                batteryElement.appendChild(icon);
            } else if (batteryData.level < 0.8) {
                let icon = document.createElement('svg');
                icon.innerHTML = icons["high"];
                batteryElement.appendChild(icon);
            } else {
                let icon = document.createElement('svg');
                icon.innerHTML = icons["full"];
                batteryElement.appendChild(icon);
            }
        }, 3000)
    }
}

function addTopRightElements() {
    let JSONData = document.getElementById('json-data');

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
    networkIcon.innerHTML = JSON.parse(JSONData.innerHTML)["connection-error"];
    networkElement.appendChild(networkIcon);

    if (navigator.connection) localStorage.setItem('networkUpdate', true);

    // Sound

    let soundElement = document.createElement('div');
    soundElement.id = 'sound';
    soundElement.classList.add('sound-display');
    soundElement.classList.add('icon');

    let soundIcon = document.createElement('svg');
    soundIcon.innerHTML = JSON.parse(JSONData.innerHTML)["sound-icons"]["medium"];
    soundElement.appendChild(soundIcon.children.item(0));

    // Battery

    let batteryElement = document.createElement('div');
    batteryElement.id = 'battery';
    batteryElement.classList.add('battery-display');
    batteryElement.classList.add('icon');

    let batteryIcon = document.createElement('svg');
    batteryIcon.innerHTML = JSON.parse(JSONData.innerHTML)["battery-error"];
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

    let JSONData = document.getElementById('json-data');

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
            menuDiv.innerHTML = JSON.parse(JSONData.innerHTML)[menuDiv.classList.value];
            document.body.appendChild(menuDiv);

            document.getElementById('brightness-selection')
                .addEventListener('valuechange', function (e) {
                    localStorage.brightness = e.detail;
                }
            );

            document.getElementById('sound-selection')
                .addEventListener('valuechange', function (e) {
                    localStorage.sound = e.detail;
                }
            );

            loadTopRightMenuIcons();

            document.addEventListener('mousedown', removeMenu);
        }
    }

    rightDiv.addEventListener('mousedown', addTopRightMenu);
}

function initLocalSettings() {
    if (!localStorage.getItem('brightness')) localStorage.setItem('brightness', '1');
    if (!localStorage.getItem('sound')) localStorage.setItem('sound', '0.3');
}

function addCustomInputEvents() {

    function checkRangeInputs() {

        function setupElement(e) {

            let element = e.target;

            if (e.buttons === 2) return;

            let width = e.target.parentElement.getBoundingClientRect().width;
            let startX = e.target.parentElement.getBoundingClientRect().x;

            function removeAllListeners() {
                document.removeEventListener('mousemove', moveRange);
                document.removeEventListener('mouseup', removeAllListeners);
            }

            function moveRange(e) {
                let offsetX = e.clientX - startX;
                if (offsetX / width > 1) offsetX = width
                if (offsetX < 0) offsetX = 0
                element.parentElement.style.setProperty('--value', `${offsetX / width}`);
                element.parentElement.setAttribute('value', `${offsetX / width}`);
                element.parentElement.dispatchEvent(new CustomEvent('valuechange', {
                    detail: offsetX / width,
                    bubbles: true,
                    composed: true
                }));
            }

            function focusRange() {
                document.addEventListener('mousemove', moveRange);
                document.addEventListener('mouseup', removeAllListeners);
            }

            focusRange()
        }

        let elements = document.querySelectorAll('.custom-input[type="range"]');

        if (!elements) return;

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (element.classList.value.includes('setup')) continue;

            element.classList.add('setup');
            element.firstChild.addEventListener('mousedown', setupElement);
        }
    }

    

    setInterval(checkRangeInputs, 100);
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

async function onStart() {

    loadApp('data');

    await new Promise(r => setTimeout(r, 50));

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
    loadApp('icon-loader');

    // Load after
    addSelectionDivInteration();
    initLocalSettings();
    addCustomInputEvents();

    loadApp('browser-compatibility');

    document.getElementById('script-home-view').outerHTML = '';
}
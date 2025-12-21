var updateBattery;

function addOpenMenuEvent() {
    const customMenu = document.getElementById('custom-menu');

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();

        if (e.target !== document.getElementById('background') && e.target !== document.getElementById('selection')) return;

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

    document.addEventListener('mousedown', function(e) {

        if (e.target !== document.getElementById('background')) return;

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
    
    setInterval(() => {timeDiv.textContent = updateTime();}, 1000);
    // TODO later: add top bar menues
    element.appendChild(timeDiv);
}

function addTopRightElements() {
    let elements = document.createElement('div');
    elements.classList.add('item');
    elements.classList.add('top-bar-right');

    // Network

    // // // // // // // // // TODO

    if (navigator.userAgentData) localStorage.setItem('networkUpdate', true);

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

    // TODO: add battery change (intervale 3000 if updateBattery)

    elements.appendChild(soundElement);
    elements.appendChild(batteryElement);

    document.getElementById('top-right').appendChild(elements);
}

function addStyle() {
    const mainStyle = document.createElement('link');
    mainStyle.rel = 'stylesheet';
    mainStyle.href = './files/apps/system/home-view/main.css';
    document.head.appendChild(mainStyle);
}

function onStart() {

    createBackgroundDiv();
    createSelectionDiv();
    createTopBarDiv();
    createMenuDiv();

    addTopRightElements();
    
    addTimeDiv();
    addStyle();
    
    addOpenMenuEvent();
    addCloseMenuEvent();
    addSelectionDivInteration();

    loadApp('notification-manager');
    loadApp('window-manager');
    // loadApp('browser-compatibility');

    document.getElementById('script-home-view').outerHTML = '';
}
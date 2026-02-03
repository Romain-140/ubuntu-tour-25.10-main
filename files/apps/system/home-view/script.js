let customInputs = {
    'range': {
        'elements': [],
        'objects': []
    },
    'checkbox': {
        'elements': [],
        'objects': []
    },
    'text': {
        'elements': [],
        'objects': []
    }
};

let customMenus = {
    'elements': [],
    'objects': []
};

// // // Classes

// // Inputs

class CustomRangeInput {
    offsetX = 0;

    #changeEvent = new CustomEvent('valuechange', {
            details: {
                value: this.value
            }
        }
    );

	constructor(element, value) {
		this.value = value;

		this.mainElement = element;
		this.width = this.mainElement.getBoundingClientRect().width;

		this.x = this.mainElement.getBoundingClientRect().x;

        this.#setup();
	}

    #updateValue = () => {
        this.mainElement.style.setProperty('--value', this.value);

        return;
    }

	#setup = () => {
		this.#updateValue();
        
        this.mainElement.firstChild.onmousedown = this.#focus;

        return;
	}

    #focus = (e) => {
        if (e.buttons !== 1) return;

        document.addEventListener('mousemove', this.#moveCursor);
        document.addEventListener('mouseup', this.#stopCursor);

        return;
    }

    #moveCursor = (e) => {
        if (e.x < this.x) this.offsetX = 0;
        else if (e.x > this.x + this.width) this.offsetX = this.width;
        else this.offsetX = e.x - this.x;

        this.value = this.offsetX / this.width;
        this.#updateValue();

        this.#fireEvent();

        return;
    }

    #stopCursor = () => {
        document.removeEventListener('mousemove', this.#moveCursor);
        document.removeEventListener('mouseup', this.#stopCursor);

        return;
    }

    #fireEvent = () => {
        this.mainElement.dispatchEvent(this.#changeEvent);

        return;
    }
}

class CustomCheckboxInput {
    #changeEvent = new CustomEvent('valuechange', {
            details: {
                value: this.value
            }
        }
    );

    constructor(element, value, height = null, ratio = 1.75, animation = true) {
        this.value = value;

        this.ratio = ratio;
        this.height = height || element.getBoundingClientRect().height;
        this.mainElement = element;

        this.animation = animation;

        this.#setup();
    }

    #setup = () => {
        this.#updateDisplay();

        this.mainElement.style.transition = '';
        setTimeout(this.#updateDisplay, 100);

        this.mainElement.onmousedown = this.#changeValue;

        return;
    }

    #updateDisplay = () => {
        this.mainElement.style.height = this.height + 'px' || '';
        this.mainElement.style.width = this.height * this.ratio + 'px' || '';
        this.mainElement.style.transition = this.animation ? 'all .15s' : '';

        this.mainElement.style.setProperty('--value', this.value);
        this.mainElement.style.setProperty('--width', this.height - 10 + 'px');

        return;
    }

    #changeValue = (e) => {
        if (e.buttons !== 1) return;

        this.value = this.value === 1 ? 0 : 1;
        this.#updateDisplay();

        this.mainElement.dispatchEvent(this.#changeEvent);

        return;
    }

}

// // Menus

class CustomContextMenu {

    #openEvent = new CustomEvent('contextmenuopen');
    #closeEvent = new CustomEvent('contextmenuclosed');

    constructor(element, targets, appName) {
        this.mainElement = element;

        this.targets = targets;
        this.appName = appName;

        this.x = 0;
        this.y = 0;

        this.width = element.getBoundingClientRect().width;
        this.height = element.getBoundingClientRect().height;

        this.hidden = false;

        this.hide();

        this.#setup();
    }

    #setup() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            console.log(e.target.classList);

            if (!this.targets.includes(e.target.classList.value)) return;

            this.#updatePosition(e);
            this.show();
        });

        document.addEventListener('mouseup', (e) => {
            if (e.button === 2) return;

            if (!this.hidden) {
                this.hide();
            }
        })

        return;
    }

    #updatePosition = (e) => {
        this.x = e.x;
        this.y = e.y;

        if (this.x + this.width > window.innerWidth - 10) this.x = e.x - this.width;
        if (this.y + this.height > window.innerHeight - 10) this.y = e.y - this.height;

        this.mainElement.style.top = this.y + 'px';
        this.mainElement.style.left = this.x + 'px';

        return;
    }

    // Public Fuctions

    changeDisplay = () => {
        if (this.hidden) this.show();
        else this.hide();

        return;
    }

    hide = () => {
        this.mainElement.classList.add('disappear');

        setTimeout( () => {
            this.mainElement.style.display = 'none';
            this.hidden = true;

            this.mainElement.dispatchEvent(this.#closeEvent);

            this.mainElement.classList.remove('disappear');
        }, 75);

        return;
    }

    show = () => {
        this.mainElement.style.display = 'block';
        this.hidden = false;

        this.mainElement.dispatchEvent(this.#openEvent);

        return;
    }
}

// // // Functions

function addInput(element, type, value) {
    if (!customInputs.getKeys().contains(type)) return;
    if (customInputs[type].elements.contains(element)) return;

    let input;

    if (type === 'range') input = new CustomRangeInput(element, value);
    else if (type === 'checkbox') input = new CustomCheckboxInput(element, value);

    customInputs[type].elements.push(element);
    customInputs[type].objects.push(input);
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

    let customMenu = new CustomContextMenu(menu, ['background'], 'main')

    customMenus.elements.push(menu);
    customMenus.objects.push(customMenu);
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

            let networkElement = document.getElementById('network');
            networkElement.innerHTML = icons[quality];
        }, 3000);
    }

    // Battery

    if (localStorage.getItem('batteryUpdate')) {
        setInterval(async function () {
            let batteryData = await navigator.getBattery();
            let icons = JSON.parse(JSONData.innerHTML)["battery-icons"];

            let status;

            if (batteryData.charging)  {
                status = 'charging';
            } else {
                status = 'discharging';
            }

            let quality;

            if (batteryData.level < 0.1) {
                quality = "empty";
            } else if (batteryData.level < 0.3) {
                quality = "low";
            } else if (batteryData.level < 0.5) {
                quality = "medium";
            } else if (batteryData.level < 0.8) {
                quality = "high";
            } else {
                quality = "full";
            }

            let batteryElement = document.querySelector('#battery');
            batteryElement.innerHTML = icons[status][quality];
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
    networkElement.innerHTML = JSON.parse(JSONData.innerHTML)["connection-error"];

    if (navigator.connection) localStorage.setItem('networkUpdate', true);

    // Sound

    let soundElement = document.createElement('div');
    soundElement.id = 'sound';
    soundElement.classList.add('sound-display');
    soundElement.classList.add('icon');
    soundElement.innerHTML = JSON.parse(JSONData.innerHTML)["sound-icons"]["medium"];


    // Battery

    let batteryElement = document.createElement('div');
    batteryElement.id = 'battery';
    batteryElement.classList.add('battery-display');
    batteryElement.classList.add('icon');
    batteryElement.innerHTML = JSON.parse(JSONData.innerHTML)["battery-error"];

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

        function changeNightLight() {
            if (localStorage.getItem('night-light')) {
                localStorage.removeItem('night-light');
                document.querySelector('.load-screen').style.setProperty('--str', '0');
                document.getElementById('menu-night-light').classList.replace('on', 'off')
                return
            }

            localStorage.setItem('night-light', true);
            let str = localStorage.getItem('night-light-strength');
            document.querySelector('.load-screen').style.setProperty('--str', str);
            document.getElementById('menu-night-light').classList.replace('off', 'on')
        };

        function checkData() {
            let nightLight = document.getElementById('menu-night-light');
            if (localStorage.getItem('night-light')) nightLight.classList.replace('off', 'on');
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
                    document.querySelector('.load-screen').style.setProperty('--opacity', (1 - e.detail) / 1.2);
                    document.querySelector('.load-screen').style.opacity = 1;
                }
            );

            document.getElementById('sound-selection')
                .addEventListener('valuechange', function (e) {
                    localStorage.sound = e.detail;
                }
            );

            document.getElementById('menu-night-light')
                .addEventListener('click', changeNightLight);

            loadTopRightMenuIcons();
            checkData();

            document.addEventListener('mousedown', removeMenu);
        }
    }

    rightDiv.addEventListener('mousedown', addTopRightMenu);
}

function initLocalSettings() {

    // Brightness

    if (!localStorage.getItem('brightness')) {
        localStorage.setItem('brightness', '1');
    }

    let loadScreen = document.querySelector('.load-screen');
    loadScreen.classList.remove('remove');
    loadScreen.style.setProperty('--opacity', (1 - localStorage.getItem('brightness')) / 1.2)
    loadScreen.style.opacity = 1;

    if (localStorage.getItem('night-light')) {
        console.log('Night');
        document.querySelector('.load-screen').style.setProperty('--str', localStorage.getItem('night-light-strength'));
    }

    // Sound

    if (!localStorage.getItem('sound')) localStorage.setItem('sound', '0.3');
}

function addWindowSpace() {
    let windowSpace = document.createElement('div');
    windowSpace.id = 'window-space';
    windowSpace.classList.add('window-space');
    windowSpace.style.height = `${window.innerHeight - 31}px`;
    setInterval(() => {windowSpace.style.height = `${window.innerHeight - 31}px`}, 100); // TODO edit css
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

    addWindowSpace();

    // Home Menu
    createMenuDiv();
    createBackgroundDiv();
    createSelectionDiv();

    // To Bar
    createTopBarDiv();
    addTopRightElements();
    addTimeDiv();
    addTopBarMenues();
    addStyle();

    // Windows
    loadApp('notification-manager');
    loadApp('window-manager');
    loadApp('icon-loader');

    // Load after
    addSelectionDivInteration();

    loadApp('browser-compatibility');

    document.getElementById('script-home-view').outerHTML = '';
}

// Clean

// TODO: add class for right click menu
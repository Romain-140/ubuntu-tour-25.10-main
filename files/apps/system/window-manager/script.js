const topBarHeight = 31;
const maxWindowsNumber = 997;
let takenWindowsID = [];
let windowsList = [];

let defaultData;

class CustomWindow {
    #cursorTypeElement;
    #draggableChildren = [];

    #moved = false;

    mouseDownX = 0;
    mouseDownY = 0;

    offsetX = 0;
    offsetY = 0;

    newX = 0;
    newY = 0;

    isContextMenuOpen = false;
    contextMenu;

    event;

    constructor(appName, resizable = true, draggable = true, posX = 100, posY = 100, width = 400, height = 400, minWidth = 50, minHeight = 50) {
        this.name = appName;
        this.appData = loadAppData(this.name);

        this.resize = resizable;

        this.x = posX;
        this.y = posY;

        this.width = width;
        this.height = height;

        this.minWidth = minWidth;
        this.minHeight = minHeight;

        this.resizable = resizable;
        this.draggable = draggable;
        this.fullscreen = false;

        this.id = this.#getLowestWindowID();

        this.mainElement = this.#createMainElement();
        this.closeEvent = new CustomEvent('windowClosed', {
                details: {
                    id : this.id,
                    appName: this.name
                }
            }
        )

        this.#initCursorType();

        this.#setToFirstPlan();
        this.#createWindowTopBar();
        this.resizeElement = this.resizable ? this.#addResizeElement() : null;

        this.mainElement.addEventListener('mousedown', this.#clickHandeler);

        defaultData = document.getElementById('window-manager_data');

        windowsList.push(this);
    }

    #getLowestWindowID() {
        let i = 0;

        while (takenWindowsID.includes(i)) i++

        return i;
    }

    #createMainElement() {
        let element = document.createElement('div');

        element.classList.add('window');

        element.setAttribute('minx', this.minWidth);
        element.setAttribute('miny', this.minHeight);

        element.style = `position: absolute; top: ${this.x}px; left: ${this.y}px; width: ${this.width}px; height: ${this.height}px`;

        return element;
    }

    #createWindowTopBar() {
        let topBarMenu = document.createElement('div');

        topBarMenu.classList.add('window-topbar');
        topBarMenu.classList.add('draggable');

        this.#draggableChildren.push(topBarMenu);
        this.mainElement.appendChild(topBarMenu);

        return;
    }

    #setToFirstPlan() {
        let windows = document.querySelectorAll('.window');

        for (let window = 0; window < windows.length; window++) {
            windows[window].style.zIndex = maxWindowsNumber - window;
        }

        this.mainElement.style.zIndex = maxWindowsNumber;

        return;
    }

    #initCursorType() {
        let cursorStyle = document.createElement('style');
        cursorStyle.id = "resize-cursor-style";
        document.head.appendChild(cursorStyle);

        this.#cursorTypeElement = cursorStyle;

        return;
    }

    #setCursorType(type) {
        this.#cursorTypeElement.innerHTML = `* {cursor: ${type} !important}`;

        return;
    }

    #clickHandeler = (e) => {
        this.#setToFirstPlan();

        if (e.buttons === 1) { // Left click

            if (this.#draggableChildren.includes(e.target) && !this.fullscreen && this.draggable) {
                this.mouseDownX = e.x;
                this.mouseDownY = e.y;

                this.#setCursorType('default');

                document.onmousemove = this.#moveWindow;
                document.onmouseup = this.#stopMoveWindow;
            }
        } else if (e.buttons === 2) { // Right click

            if (this.#draggableChildren.includes(e.target) && !this.isContextMenuOpen) {
                this.#onpenContextMenu(e);
            }
        }
    }

    #onpenContextMenu(event)  { // TODO: convert to class ContextMenu
        let contextMenu = document.createElement('div');
        contextMenu.id = `menu-${this.id}`;
        contextMenu.classList.add('custom-menu');

        let data = JSON.parse(defaultData.textContent);
        let appData = null;
        try {appData = JSON.parse(this.appData.textContent) || null;} catch {}

        if (appData && appData.contextMenu[event.target.classList] !== undefined) { // App menu is defined
            contextMenu.innerHTML = appData['contextMenu'][event.target.classList];
            contextMenu.classList.add(`${this.name}-menu`);

        }else if (data) { // Fallback: default
            contextMenu.innerHTML = data['contextMenu'][event.target.classList];

        }

        contextMenu.style.display = 'block';
        contextMenu.style.left = `${event.x}px`;
        contextMenu.style.top = `${event.y}px`;

        this.event = event;

        document.addEventListener('mousedown', this.#closeContextMenu);

        this.isContextMenuOpen = true;
        this.contextMenu = contextMenu;

        document.body.appendChild(contextMenu);
        
        return;
    }

    #closeContextMenu = (e) => {
        if (e === this.event) return;

        document.removeEventListener('mousedown', this.#closeContextMenu);

        this.isContextMenuOpen = false;

        this.contextMenu.classList.add('disappear');

        setTimeout(() => {
            this.contextMenu.remove();
            this.contextMenu = null;
        }, 75);

        return;
    }

    // TODO add actions

    #resizeWindow(direction) {
        if (!this.resizable) return;

        function resizeLeft(event) {
            this.offsetX = event.x - this.mouseDownX;
            let newWidth = this.width - this.offsetX;

            if (this.x + this.offsetX < 0) this.offsetX = -this.x
            if (newWidth < this.minWidth) this.offsetX = this.width - this.minWidth

            this.mainElement.style.width = `${this.width - this.offsetX}px`;
            this.mainElement.style.left = `${this.x + this.offsetX}px`;
        }

        function resizeRight(event) {
            this.offsetX = event.x - this.mouseDownX;
            let newWidth = this.width + this.offsetX;

            if (newWidth + this.x > window.innerWidth) this.offsetX = window.innerWidth - this.x - this.width
            if (newWidth < this.minWidth) this.offsetX = this.minWidth - this.width

            this.mainElement.style.width = `${this.width + this.offsetX}px`;
        }

        function resizeTop(event) {
            this.offsetY = event.y - this.mouseDownY;
            let newHeight = this.height - this.offsetY;

            if (this.y + this.offsetY < 0) this.offsetY = -this.y
            if (newHeight < this.minHeight) this.offsetY = this.height - this.minHeight

            this.mainElement.style.height = `${this.height - this.offsetY}px`;
            this.mainElement.style.top = `${this.y + this.offsetY}px`;
        }

        function resizeBottom(event) {
            this.offsetY = event.y - this.mouseDownY;
            let newHeight = this.height + this.offsetY;

            if (newHeight + this.y > window.innerHeight - topBarHeight) this.offsetY = window.innerHeight - this.y - this.height - topBarHeight
            if (newHeight < this.minHeight) this.offsetY = this.minHeight - this.height

            this.mainElement.style.height = `${this.height + this.offsetY}px`;
        }

        if (direction === 'L') {
            this.#setCursorType('ew-resize');
            document.onmousemove = resizeLeft.bind(this);

        } else if (direction === 'R') {
            this.#setCursorType('ew-resize');
            document.onmousemove = resizeRight.bind(this);

        } else if (direction === 'T') {
            this.#setCursorType('ns-resize');
            document.onmousemove = resizeTop.bind(this);

        } else if (direction === 'B') {
            this.#setCursorType('ns-resize');
            document.onmousemove = resizeBottom.bind(this);

        } else if (direction === 'TL') {
            this.#setCursorType('nwse-resize');
            document.onmousemove = (e) => {
                resizeTop.bind(this)(e);
                resizeLeft.bind(this)(e);
            }
        } else if (direction === 'TR') {
            this.#setCursorType('nesw-resize');
            document.onmousemove = (e) => {
                resizeTop.bind(this)(e);
                resizeRight.bind(this)(e);
            }
        } else if (direction === 'BL') {
            this.#setCursorType('nesw-resize');
            document.onmousemove = (e) => {
                resizeBottom.bind(this)(e);
                resizeLeft.bind(this)(e);
            }
        } else if (direction === 'BR') {
            this.#setCursorType('nwse-resize');
            document.onmousemove = (e) => {
                resizeBottom.bind(this)(e);
                resizeRight.bind(this)(e);
            }
        }

        document.onmouseup = () => {
            this.#setCursorType('');

            document.onmousemove = null;
            document.onmouseup = null;

            if (direction === 'L') {
                this.width -= this.offsetX;
                this.x += this.offsetX;

            } else if (direction === 'T') {
                this.height -= this.offsetY;
                this.y += this.offsetY;

            } else if (direction === 'R') {
                this.width += this.offsetX;

            } else if (direction === 'B') {
                this.height += this.offsetY;

            } else if (direction === 'TL') {
                this.width -= this.offsetX;
                this.height -= this.offsetY;

                this.x += this.offsetX;
                this.y += this.offsetY;

            } else if (direction === 'TR') {
                this.width += this.offsetX;
                this.height -= this.offsetY;

                this.y += this.offsetY;

            } else if (direction === 'BL') {
                this.width -= this.offsetX;
                this.height += this.offsetY;

                this.x += this.offsetX;

            } else if (direction === 'BR') {
                this.width += this.offsetX;
                this.height += this.offsetY;

            }

            this.#updateTransform();
        }

        return;
    }

    #addResizeElement() {
        let resizeParent = document.createElement('div');
        resizeParent.classList.add('resize-parent');

        let resizeDivs = [
            ['left', 'L'],
            ['right', 'R'],
            ['top', 'T'],
            ['bottom', 'B'],
            ['top-left', 'TL'],
            ['top-right', 'TR'],
            ['bottom-left', 'BL'],
            ['bottom-right', 'BR']
        ];

        for (let id = 0; id < resizeDivs.length; id++) {
            let resize = document.createElement('div');

            resize.classList.add('resize');
            resize.classList.add(resizeDivs[id][0]);

            resize.addEventListener('mousedown', (e) => {
                if (e.buttons !== 1) return;

                this.mouseDownX = e.x;
                this.mouseDownY = e.y;

                this.#resizeWindow(resizeDivs[id][1]);
            });

            resizeParent.appendChild(resize);
        }

        this.mainElement.appendChild(resizeParent);

        return resizeParent;
    }

    #updateTransform() {
        this.mainElement.style.left = `${this.x}px`;
        this.mainElement.style.top = `${this.y}px`;
        
        this.mainElement.style.width = `${this.width}px`;
        this.mainElement.style.height = `${this.height}px`;


        this.newX = 0;
        this.newY = 0;

        this.offsetX = 0;
        this.offsetY = 0;

        return;
    }

    #moveWindow = (e) => {
        this.offsetX = e.x - this.mouseDownX;
        this.offsetY = e.y - this.mouseDownY;

        let newX = this.x + this.offsetX;
        let newY = this.y + this.offsetY;

        if (newX > window.innerWidth - 100) newX = window.innerWidth - 100
        else if (newX < 100 - this.width) newX = 100 - this.width;

        if (newY > window.innerHeight - 70) newY = window.innerHeight - 70
        else if (newY < 0) newY = 0

        this.newX = newX;
        this.newY = newY;

        this.mainElement.style.left = `${newX}px`;
        this.mainElement.style.top = `${newY}px`;

        this.#moved = true;
        
        return;
    }

    #stopMoveWindow = () => {
        this.#setCursorType('');

        document.onmousemove = null;
        document.onmouseup = null;

        if (!this.#moved) return;

        this.x = this.newX;
        this.y = this.newY;

        this.#updateTransform();

        this.#moved = false;
        
        return;
    }

    // Public functions

    addToDesktop() {
        let windowSpace = document.getElementById('window-space');
        windowSpace.appendChild(this.mainElement);

        return;
    }

    forceTransformWindow(width, height, x, y, transition = true, time = 0.15) {
        this.mainElement.style.transition = transition ? `all ${time}s` : '';

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.#updateTransform();

        setTimeout(() => {this.mainElement.style.transition = ''}, time * 1200);

        return;
    }

    forceFullscreen(transition  = true, time = 0.25) {
        this.mainElement.style.transition = transition ? `all ${time}s` : '';

        this.fullscreen = true;
        this.mainElement.classList.add('fullscreen');

        if (this.resizable) {
            this.resizeElement.remove();
            this.resizeElement = null;
        }
        
        setTimeout(() => {this.mainElement.style.transition = ''}, time * 1200);

        return;
    }

    removeFullscreen(transition = true, time = 0.25) {
        this.mainElement.style.transition = transition ? `all ${time}s` : '';

        this.fullscreen = false;
        this.mainElement.classList.remove('fullscreen');

        if (this.resizable) this.resizeElement = this.#addResizeElement()

        setTimeout(() => {this.mainElement.style.transition = ''}, time * 1200);

        return;
    }

    close(silent = false) {
        if (!silent) this.mainElement.dispatchEvent(this.closeEvent);
        this.mainElement.classList.add('remove');

        windowsList.remove(this);

        setTimeout(() => {this.mainElement.remove()}, 100);

        return;
    }
}

function loadStyle() {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = './files/apps/system/window-manager/main.css';
    document.head.appendChild(style);
}

function onStart() {
    loadStyle();
    loadAppData('window-manager');

    document.getElementById('option-2').addEventListener('click', () => {
        let windowTest = new CustomWindow('Test');
        windowTest.addToDesktop();
    });
}

// TODO check global context menu conditions close
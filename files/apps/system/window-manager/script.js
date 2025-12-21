// Move windows

function taskWindow(windowElement, draggableChildren, idNumber) {
    windowElement.id = `window-${idNumber}`;
    setToFirstPlan(windowElement);

    let offsetX = 0,
        offsetY = 0,
        mouseX = 0,
        mouseY = 0;

    function isDraggableChild(target) {
        return draggableChildren.includes(target);
    }

    windowElement.onmousedown = function(e) {
        e.preventDefault();

        setToFirstPlan(windowElement);

        if (!isDraggableChild(e.target)) return;

        mouseX = e.clientX;
        mouseY = e.clientY;

        offsetX = mouseX - windowElement.offsetLeft;
        offsetY = mouseY - windowElement.offsetTop;

        document.onmousemove = moveWindow;
        document.onmouseup = stopDragging;
    };


    function moveWindow(e) {
        e.preventDefault();

        let newMouseX = e.clientX;
        let newMouseY = e.clientY;

        let newLeft = newMouseX - offsetX;
        let newTop = newMouseY - offsetY;

        // Prevent overflow

        if (newLeft < 0) {
            // left
            newLeft = 0;
        } else if (newLeft + windowElement.clientWidth >= window.innerWidth) {
            // right
            newLeft = window.innerWidth - windowElement.clientWidth - 2;
        }

        if (newTop <= 31) {
            // top
            newTop = 32;
        } else if (newTop + windowElement.clientHeight >= window.innerHeight) {
            // bottom
            newTop = window.innerHeight - windowElement.clientHeight - 2;
        }

        windowElement.style.left = 100 * newLeft / window.innerWidth + '%';
        windowElement.style.top = 100 * newTop / window.innerHeight + '%';
    }

    function stopDragging() {
        document.onmousemove = null;
        document.onmouseup = null;
    }

    let closeBtn = document.getElementById(`close-btn-${idNumber}`);
    let startX = 0;
    let startY = 0;

    closeBtn.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
    });

    closeBtn.addEventListener('mouseup', (e) => {
        const endX = e.clientX;
        const endY = e.clientY;
        const distance = Math.hypot(endX - startX, endY - startY);

        if (distance < 3) {
            windowElement.classList.add('close-window');
            setTimeout(() => { document.body.removeChild(windowElement.parentElement) }, 200);
        }
    });
}

function fullScreen(windowElement) {
    // enter fullscreen
}

function setToFirstPlan(currentWindow) {
    let windows = document.getElementsByClassName('window');
    let forward_ = false;

    for (let windowElement of windows) {
        if (windowElement.style.zIndex >= currentWindow.style.zIndex && windowElement !== currentWindow) {
            windowElement.style.zIndex -= 1;
            forward_ = true;
        }
    }

    if (forward_) currentWindow.style.zIndex = 997;
}


// Open Window

function numberOfWindows(className) {
    let windows = document.getElementsByClassName(className);

    return windows.length;
}

function totalNumberOfWindows() {
    let windows = document.getElementsByClassName('window');

    return windows.length;
}

function createWindow(windowElement) {
    let draggableChildren = [].slice.call(windowElement.getElementsByClassName('draggable'));
    let windowID = totalNumberOfWindows();

    taskWindow(windowElement, draggableChildren, windowID);
}

function loadStyle() {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = './files/apps/system/window-manager/main.css';
    document.head.appendChild(style);
}

function onStart() {
    loadStyle();
    // document.getElementById('script-window-manager').outerHTML = '';
    document.getElementById('option-2').addEventListener('click', () => {
        let window = document.createElement('div');
        window.innerHTML = "<div id='window-test' class='window' style='position: absolute; top: 20%; left: 20%; z-index: 1'><div class='window-test-topbar draggable'></div></div>"
        document.body.appendChild(window);
        createWindow(document.getElementById('window-test'));
    });
}
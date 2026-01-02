// Move windows

function taskWindow(windowElement, draggableChildren, idNumber) {
    windowElement.id = `window-${idNumber}`;
    setToFirstPlan(windowElement);
    addResizeDiv(windowElement);

    let offsetX = 0,
        offsetY = 0,
        mouseX = 0,
        mouseY = 0;

    let event;

    function isDraggableChild(target) {
        return draggableChildren.includes(target);
    }

    windowElement.onmousedown = function(e) {
        e.preventDefault();

        setToFirstPlan(windowElement);

        if (e.button === 2) {
            openWindowContextMenu(e);
            return;

            if (windowElement.classList[1] === 'fullscreen') {removeFullscreen(windowElement); return}

            fullScreen(windowElement);

            return
        }

        if (!isDraggableChild(e.target)) return;
        if (windowElement.classList.contains('fullscreen')) return;

        mouseX = e.clientX;
        mouseY = e.clientY;

        offsetX = mouseX - windowElement.offsetLeft;
        offsetY = mouseY - windowElement.offsetTop;

        document.onmousemove = moveWindow;
        document.onmouseup = stopDragging;
    };

    function openWindowContextMenu(e) {
        let jsonInfo = document.getElementById('json-data');

        const menu = document.createElement('div');
        menu.id = `window-${idNumber}-menu`;
        menu.classList.add('custom-menu');
        menu.style.display = 'block';
        menu.style.top = `${(e.clientY - 31) / (window.innerHeight - 31) * 100}%`;
        menu.style.left = `${e.clientX / window.innerWidth * 100}%`;
        menu.innerHTML = JSON.parse(jsonInfo.innerHTML)[e.target.classList.value];

        if (menu.innerHTML === 'undefined') return;

        windowElement.parentElement.appendChild(menu);

        event = e;

        document.addEventListener('mousedown', closeWindowContextMenu);
    };

    function closeWindowContextMenu(e) {
        if (event === e) return;
        document.getElementById(`window-${idNumber}-menu`).classList.add('disappear');
        setTimeout(function() {
            document.getElementById(`window-${idNumber}-menu`).remove();
            document.removeEventListener('mousedown', closeWindowContextMenu);
        }, 75)
    }


    function moveWindow(e) {
        e.preventDefault();

        let newMouseX = e.clientX;
        let newMouseY = e.clientY;

        let newLeft = newMouseX - offsetX;
        let newTop = newMouseY - offsetY;

        // Prevent overflow

        if (newTop <= 0) {
            newTop = 1;
        } else if (newTop > window.innerHeight - 100) {
            newTop = window.innerHeight - 100;
        }

        if (newLeft < 100 - windowElement.getBoundingClientRect().width) {
            newLeft = 100 - windowElement.getBoundingClientRect().width;
        } else if (newLeft > window.innerWidth - 100) {
            newLeft = window.innerWidth - 100;
        }

        windowElement.style.left = 100 * newLeft / window.innerWidth + '%';
        windowElement.style.top = 100 * newTop / (window.innerHeight - 31) + '%';
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

function resizewindow(event, windowElement, direction) {
    if (event.buttons !== 1) return;

    const minXSize = Number(windowElement.getAttribute('minx')) || 100;
    const minYSize = Number(windowElement.getAttribute('miny')) || 100;

    let startX = windowElement.getBoundingClientRect().left,
        startY = windowElement.getBoundingClientRect().top - 31;

    let startWidth = windowElement.getBoundingClientRect().width,
        startHeight = windowElement.getBoundingClientRect().height;

    let mouseX = event.clientX,
        mouseY = event.clientY;

    function removeEvents() {
        document.getElementById('resize-cursor-style').remove();
        document.removeEventListener('mouseup', removeEvents);

        document.removeEventListener('mousemove', resizeLeft);
        document.removeEventListener('mousemove', resizeRight);
        document.removeEventListener('mousemove', resizeTop);
        document.removeEventListener('mousemove', resizeBottom);
    }

    function resizeLeft(event) {
        let offset = event.clientX - mouseX;
        let newWidth = startWidth - offset;

        if (newWidth < minXSize) {
            offset = startWidth - minXSize;
        }

        windowElement.style.width = `${(startWidth - offset) / window.innerWidth * 100}%`;
        windowElement.style.left = `${(startX + offset) / window.innerWidth * 100}%`;
    }

    function resizeRight(event) {
        let offset = event.clientX - mouseX;
        let newWidth = startWidth + offset;

        if (newWidth < minXSize) {
            offset = minXSize - startWidth;
        }

        windowElement.style.width = `${(startWidth + offset) / window.innerWidth * 100}%`;
    }

    function resizeTop(event) {
        let offset = event.clientY - mouseY;

        if (event.clientY < 32) {
            offset = 32 - mouseY;
        }

        let newHeight = startHeight - offset;

        if (newHeight < minYSize) {
            offset = startHeight - minYSize;
        }

        windowElement.style.height = `${(startHeight - offset) / (window.innerHeight - 31) * 100}%`;
        windowElement.style.top = `${(startY + offset) / (window.innerHeight - 31) * 100}%`;
    }

    function resizeBottom(event) {
        let offset = event.clientY - mouseY;
        let newHeight = startHeight + offset;

        if (newHeight < minYSize) {
            offset = minYSize - startHeight;
        }

        windowElement.style.height = `${(startHeight + offset) / (window.innerHeight - 31) * 100}%`;
    }

    let cursorStyle = document.createElement('style');
    cursorStyle.id = "resize-cursor-style";
    document.head.appendChild(cursorStyle);

    if (direction === 'L') {
        cursorStyle.innerHTML = "*{cursor: ew-resize !important}";
        document.addEventListener('mousemove', resizeLeft);
        document.addEventListener('mouseup', removeEvents);
    } else if (direction === 'R') {
        cursorStyle.innerHTML = "*{cursor: ew-resize !important}";
        document.addEventListener('mousemove', resizeRight);
        document.addEventListener('mouseup', removeEvents);
    } else if (direction === 'T') {
        cursorStyle.innerHTML = "*{cursor: ns-resize !important}";
        document.addEventListener('mousemove', resizeTop);
        document.addEventListener('mouseup', removeEvents);
    } else if (direction === 'B') {
        cursorStyle.innerHTML = "*{cursor: ns-resize !important}";
        document.addEventListener('mousemove', resizeBottom);
        document.addEventListener('mouseup', removeEvents);
    } else if (direction === 'TL') {
        cursorStyle.innerHTML = "*{cursor: nwse-resize !important}";
        document.addEventListener('mousemove', resizeTop);
        document.addEventListener('mousemove', resizeLeft);
        document.addEventListener('mouseup', removeEvents);
    } else if (direction === 'TR') {
        cursorStyle.innerHTML = "*{cursor: nesw-resize !important}";
        document.addEventListener('mousemove', resizeTop);
        document.addEventListener('mousemove', resizeRight);
        document.addEventListener('mouseup', removeEvents);
    } else if (direction === 'BL') {
        cursorStyle.innerHTML = "*{cursor: nesw-resize !important}";
        document.addEventListener('mousemove', resizeBottom);
        document.addEventListener('mousemove', resizeLeft);
        document.addEventListener('mouseup', removeEvents);
    } else if (direction === 'BR') {
        cursorStyle.innerHTML = "*{cursor: nwse-resize !important}";
        document.addEventListener('mousemove', resizeBottom);
        document.addEventListener('mousemove', resizeRight);
        document.addEventListener('mouseup', removeEvents);
    }
}

function addResizeDiv(windowElement) {
    let resizeParent = document.createElement('div');
    resizeParent.classList.add('resize-parent');

    // L
    
    let resizeL = document.createElement('div');
    resizeL.classList.add('resize');
    resizeL.classList.add('left');
    resizeL.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'L')});

    // R

    let resizeR = document.createElement('div');
    resizeR.classList.add('resize');
    resizeR.classList.add('right');
    resizeR.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'R')});

    // T

    let resizeT = document.createElement('div');
    resizeT.classList.add('resize');
    resizeT.classList.add('top');
    resizeT.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'T')});

    // B

    let resizeB = document.createElement('div');
    resizeB.classList.add('resize');
    resizeB.classList.add('bottom');
    resizeB.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'B')});

    // TL

    let resizeTL = document.createElement('div');
    resizeTL.classList.add('resize');
    resizeTL.classList.add('top-left');
    resizeTL.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'TL')});

    // TR

    let resizeTR = document.createElement('div');
    resizeTR.classList.add('resize');
    resizeTR.classList.add('top-right');
    resizeTR.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'TR')});

    // BL

    let resizeBL = document.createElement('div');
    resizeBL.classList.add('resize');
    resizeBL.classList.add('bottom-left');
    resizeBL.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'BL')});

    // BR

    let resizeBR = document.createElement('div');
    resizeBR.classList.add('resize');
    resizeBR.classList.add('bottom-right');
    resizeBR.addEventListener('mousedown', function(e) {resizewindow(e, windowElement, 'BR')});

    // Parent

    resizeParent.appendChild(resizeR);
    resizeParent.appendChild(resizeL);
    resizeParent.appendChild(resizeT);
    resizeParent.appendChild(resizeB);

    resizeParent.appendChild(resizeTL);
    resizeParent.appendChild(resizeTR);
    resizeParent.appendChild(resizeBL);
    resizeParent.appendChild(resizeBR);

    windowElement.appendChild(resizeParent);
}

function removeFullscreen(windowElement) {
    windowElement.classList.remove('fullscreen');
    setTimeout(() => {windowElement.style.transition = ''}, 300);
    addResizeDiv(windowElement);
}

function fullScreen(windowElement) {
    windowElement.style.transition = 'all .25s';
    windowElement.classList.add('fullscreen');
    windowElement.getElementsByClassName('resize-parent')[0].remove();
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
        window.innerHTML = "<div id='window-test' class='window' style='position: absolute; top: 20%; left: 20%; z-index: 1' minx='200' miny='50'><div class='window-test-topbar draggable'></div></div>"
        let windowSpace = document.getElementById('window-space');
        windowSpace.appendChild(window);
        createWindow(document.getElementById('window-test'));
    });
}
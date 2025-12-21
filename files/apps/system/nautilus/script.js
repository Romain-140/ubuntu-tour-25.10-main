function openNewWindow(id, windowId) {
    let windowCss = document.createElement('link');
    windowCss.rel = "stylesheet";
    windowCss.href = 'files/sys/nautilus.css';
    windowCss.classList.add('nautilus-css');

    if (document.head.getElementsByClassName('nautilus-css').length === 0)
        document.head.appendChild(windowCss);

    const newWindow = document.createElement('div');

    let name = 'nautilus';

    const content = `<div id='${name}-window-${id}' class='${name}-window' style='position: absolute; top: 20%; left: 20%; z-index: 997'><div id='${name}-topbar-${id}' class='${name}-topbar'><div id='${name}-left-topbar-${id}' class='${name}-left-topbar'><div id='${name}-search-btn-${id}' class='${name}-btn'></div><span class='${name}-text'>Files</span></div><div id='${name}-btns-${id}' class='${name}-btns'><div id='minimize-btn-${id}'><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="17px" fill="#e3e3e3"><path d="M200-440v-80h560v80H200Z"/></svg></div><div id='fullscreen-btn-${id}'><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="17px" fill="#e3e3e3"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg></div><div id='close-btn-${id}'><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="17px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></div></div></div><div id='nautilus-left-bar-${id}' class='nautilus-left-bar'></div><div id='nautilus-content-${id}' class='nautilus-content'></div></div>`;

    newWindow.innerHTML = content;
    newWindow.classList.add('nautilus');
    newWindow.classList.add('window');
    newWindow.id = `window-${windowId}`;

    document.body.appendChild(newWindow);
}

function onStart() {
    return;
}
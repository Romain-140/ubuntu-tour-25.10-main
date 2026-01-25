let isWindowOpen = false;

function openUCraftWindow() {
    if (isWindowOpen) return;

    isWindowOpen = true;

    let window = document.createElement('div');
    window.innerHTML = JSON.parse(document.getElementById('json-data').innerHTML)["window template"];
    let windowSpace = document.getElementById('window-space');
    windowSpace.appendChild(window);
    createWindow(document.getElementById('window-start'));
}

function onStart() {
    openUCraftWindow()
}
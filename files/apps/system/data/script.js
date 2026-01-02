const data = {
    "window-test-topbar draggable": "<ul><li><a id='window-fullscreen'>Fullscreen</a></li><li><a id='close-window'>Close Window</a></li></ul>",
    "main-menu": "<ul><li><a id='option-1'>Notification Test</a></li><li><a id='option-2'>Window Test</a></li><li><a>Custom Option 3</a></li><hr><li><a>Option 4</a></li></ul>"
};

function onStart() {
    let jsonElement = document.getElementById('script-data');
    jsonElement.id = 'json-data';
    jsonElement.innerHTML = JSON.stringify(data);
}

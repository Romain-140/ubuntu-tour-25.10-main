const window_managerData = {
    "contextMenu" : {
        "window-topbar draggable": "<ul><li><a>Fullscreen</a></li><li><a>Close</a></li></ul>"
    }
};


function data_loader_load() {
    let data = document.createElement('div');
    data.id = 'window-manager_data';
    data.textContent = JSON.stringify(window_managerData);

    document.getElementById('system-data-loader').appendChild(data);
    document.querySelector('script[src$="window-manager/data.js"]').remove();
}

data_loader_load()
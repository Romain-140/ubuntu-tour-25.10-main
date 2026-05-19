const TestData = {
    'contextMenu': {
        'window-topbar draggable': "<ul><li><a>Fullscreen</a></li><li><a>Close</a></li></ul>"
    }
};

function data_loader_load() {
    let data = document.createElement('div');
    data.id = 'Test_data';
    data.textContent = JSON.stringify(TestData);

    document.getElementById('system-data-loader').appendChild(data);
    document.querySelector('[src="./files/data/apps/Test/data.js"]').remove();
}

data_loader_load()

// Clean
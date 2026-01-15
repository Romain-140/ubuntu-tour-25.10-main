function loadAppData(name) {
    let dataLoader = document.createElement('script');
    dataLoader.type = 'text/javascript';
    dataLoader.src = `./files/data/apps/${name}/data.js`;
    document.body.appendChild(dataLoader);
}

function onStart() {
    let dataLoader = document.createElement('div');
    dataLoader.id = 'system-data-loader';

    document.head.appendChild(dataLoader);
}

// Clean
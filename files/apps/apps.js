let jsonContent = {
    "data-loader": {"type": "system", "name": "data-loader"},
    "data": {"type": "system", "name": "data"},
    "icon-loader": {"type": "system", "name":"icon-loader"},
    "start-menu": {"type": "system", "name":"start-menu"},
    "login-menu": {"type": "system", "name": "login-menu"},
    "home-view": {"type": "system", "name": "home-view"},
    "browser-compatibility": {"type": "system", "name": "browser-compatibility"},
    "window-manager": {"type": "system", "name": "window-manager"},
    "notification-manager": {"type": "system", "name": "notification-manager"},
    "ucraft": {"type": "custom", "name": "ucraft"}
};

document.getElementById('apps-json').innerHTML = JSON.stringify(jsonContent);

// Clean

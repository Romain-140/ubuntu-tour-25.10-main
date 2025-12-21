const jsonContent = '{\
    "start-menu" : {\
        "type" : "system",\
        "name" : "start-menu"\
    },\
    "login-menu" : {\
        "type" : "system",\
        "name" : "login-menu"\
    },\
    "home-view" : {\
        "type" : "system",\
        "name" : "home-view"\
    },\
    "browser-compatibility" : {\
        "type" : "system",\
        "name" : "browser-compatibility"\
    },\
    "window-manager" : {\
        "type" : "system",\
        "name" : "window-manager"\
    },\
    "notification-manager" : {\
        "type" : "system",\
        "name" : "notification-manager"\
    },\
    "nautilus" : {\
        "type" : "system",\
        "name" : "nautilus",\
        "icon" : true\
    }\
}'

document.getElementById('apps-json').innerHTML = jsonContent;

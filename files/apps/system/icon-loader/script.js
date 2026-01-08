let JSONData;
let icons;

async function loadTopRightMenuIcons() {

    // // First line

    let battery = document.getElementById('menu-battery');
    let _icons = icons["battery-icons"];

    if (!navigator.userAgentData) {
        battery.innerHTML = icons["battery-error"];
    } else {
        let batteryInfo = await navigator.getBattery();
        if (batteryInfo.charging) _icons = _icons['charging']
        else _icons = _icons['discharging']

        if (batteryInfo.level < 0.1) battery.innerHTML = _icons['empty'];
        else if (batteryInfo.level < 0.3) battery.innerHTML = _icons['low'];
        else if (batteryInfo.level < 0.5) battery.innerHTML = _icons['medium'];
        else if (batteryInfo.level < 0.8) battery.innerHTML = _icons['high'];
        else _battery.innerHTML = icons['full'];
    }

    let screenshot = document.getElementById('menu-screenshot');
    screenshot.innerHTML = icons['top-right-menu-icons']['screenshot'];

    let settings = document.getElementById('menu-settings');
    settings.innerHTML = icons['top-right-menu-icons']['settings'];

    let lock = document.getElementById('menu-lock');
    lock.innerHTML = icons['top-right-menu-icons']['lock'];

    let shutdown = document.getElementById('menu-shutdown');
    shutdown.innerHTML = icons['top-right-menu-icons']['shutdown'];

    // // Ranges

    let sound = document.getElementById('menu-sound-icon');
    // TODO: adaptive

    let brightness = document.getElementById('menu-brightness-icon');
    brightness.innerHTML = icons['top-right-menu-icons']['brightness'];

    // // Large Items

    let performance = document.getElementById('performance-icon');
    performance.innerHTML = icons['top-right-menu-icons']['performances']['balanced']; // TODO: adaptive

    let nightLight = document.getElementById('night-light-icon');
    nightLight.innerHTML = icons['top-right-menu-icons']['night-light'];

    let darkStyle = document.getElementById('dark-style-icon');
    darkStyle.innerHTML = icons['top-right-menu-icons']['dark-style'];

    let doNotDisturb = document.getElementById('do-not-disturb-icon');
    doNotDisturb.innerHTML = icons['top-right-menu-icons']['do-not-disturb'];
}

function onStart() {
    JSONData = document.getElementById('json-data');
    icons = JSON.parse(JSONData.innerHTML);
    return;
}

// Will load all need icons
// Crete a function for each element to load
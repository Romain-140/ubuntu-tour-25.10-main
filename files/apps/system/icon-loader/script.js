let JSONData;
let icons;

async function loadTopRightMenuIcons() {

    // // First line

    // Battery

    async function setBatteryIcon() {
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
            else battery.innerHTML = icons['full'];
        }
    }

    if (localStorage.getItem('batteryUpdate')) {
        document.getElementById('menu-battery').innerHTML = icons["battery-error"];
        setInterval(setBatteryIcon, 3000);
    }
    else document.getElementById('menu-battery').innerHTML = icons["battery-error"];

    // Screenshot

    let screenshot = document.getElementById('menu-screenshot');
    screenshot.innerHTML = icons['top-right-menu-icons']['screenshot'];

    // Settings

    let settings = document.getElementById('menu-settings');
    settings.innerHTML = icons['top-right-menu-icons']['settings'];

    // Lock Screen

    let lock = document.getElementById('menu-lock');
    lock.innerHTML = icons['top-right-menu-icons']['lock'];

    // Shutdown

    let shutdown = document.getElementById('menu-shutdown');
    shutdown.innerHTML = icons['top-right-menu-icons']['shutdown'];

    // // Ranges

    // Sound

    function setSoundIcon() {
        let sound = document.getElementById('menu-sound-icon');
        if (localStorage.getItem('sound') === 0) sound.innerHTML = icons['sound-icons']['mute'];
        else if (localStorage.getItem('sound') <= 0.33) sound.innerHTML = icons['sound-icons']['low'];
        else if (localStorage.getItem('sound') <= 0.66) sound.innerHTML = icons['sound-icons']['medium'];
        else sound.innerHTML = icons['sound-icons']['high']
    }
    
    setSoundIcon();
    setInterval(setSoundIcon, 3000);

    // Brightness

    let brightness = document.getElementById('menu-brightness-icon');
    brightness.innerHTML = icons['top-right-menu-icons']['brightness'];

    // // Large Items

    let performance = document.getElementById('performance-icon');
    performance.innerHTML = icons['top-right-menu-icons']['performances']['balanced']; // TODO adaptive

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

// Clean
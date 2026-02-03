let data = {
    "main-menu": "<ul><li><a id='option-1'>Notification Test</a></li><li><a id='option-2'>Window Test</a></li><li><a>Custom Option 3</a></li><hr><li><a>Option 4</a></li></ul>",
    "connection-icons": {
        "low": '<img src="./files/icons/sys/Yaru/connection_low.svg" height="20px" width="20px"></img>',
        "medium" : '<img src="./files/icons/sys/Yaru/connection_med.svg" height="20px" width="20px"></img>',
        "high" : '<img src="./files/icons/sys/Yaru/connection_high.svg" height="20px" width="20px"></img>',
        "max" : '<img src="./files/icons/sys/Yaru/connection_max.svg" height="20px" width="20px"></img>'
    },
    "connection-error": '<img src="./files/icons/sys/Yaru/connection_error.svg" height="20px" width="20px"></img>',

    "battery-icons": {
        "charging": {
            "empty": '<img src="./files/icons/sys/Yaru/battery_charging_empty.svg" height="20px" width="20px"></img>',
            "low": '<img src="./files/icons/sys/Yaru/battery_charging_low.svg" height="20px" width="20px"></img>',
            "medium": '<img src="./files/icons/sys/Yaru/battery_charging_med.svg" height="20px" width="20px"></img>',
            "high": '<img src="./files/icons/sys/Yaru/battery_charging_high.svg" height="20px" width="20px"></img>',
            "full": '<img src="./files/icons/sys/Yaru/battery_charging_full.svg" height="20px" width="20px"></img>'
        },
        "discharging": {
            "empty": '<img src="./files/icons/sys/Yaru/battery_discharging_empty.svg" height="20px" width="20px"></img>',
            "low": '<img src="./files/icons/sys/Yaru/battery_discharging_low.svg" height="20px" width="20px"></img>',
            "medium": '<img src="./files/icons/sys/Yaru/battery_discharging_med.svg" height="20px" width="20px"></img>',
            "high": '<img src="./files/icons/sys/Yaru/battery_discharging_high.svg" height="20px" width="20px"></img>',
            "full": '<img src="./files/icons/sys/Yaru/battery_discharging_full.svg" height="20px" width="20px"></img>'
        }
    },
    "battery-error": '<img src="./files/icons/sys/Yaru/battery_error.svg" height="20px" width="20px"></img>',

    "sound-icons": {
        "mute": '<img src="./files/icons/sys/Yaru/sound_mute.svg" height="20px" width="20px"></img>',
        "low": '<img src="./files/icons/sys/Yaru/sound_low.svg" height="20px" width="20px"></img>',
        "medium": '<img src="./files/icons/sys/Yaru/sound_med.svg" height="20px" width="20px"></img>',
        "high": '<img src="./files/icons/sys/Yaru/sound_high.svg" height="20px" width="20px"></img>'
    },


    "top-right-menu menu": `<div class="menu-battery" id="menu-battery"></div><div style="grid-column:span 2"></div><div class="menu-item menu-icon" id="menu-screenshot"></div><div class="menu-item menu-icon" id="menu-settings"></div><div class="menu-item menu-icon" id="menu-lock"></div><div class="menu-item menu-icon" id="menu-shutdown"></div><div class="menu-icon menu-icon" id="menu-sound-icon"></div><div id="sound-selection" class="custom-input menu-range" type="range" style="--value:${localStorage.sound};" value="${localStorage.sound}"><span class="selector"></span></div><div stlye="grid-column: span 1"></div><div class="menu-icon menu-icon" id="menu-brightness-icon"></div><div id="brightness-selection" class="custom-input menu-range" type="range" style="--value:${localStorage.brightness};" value="${localStorage.brightness}"><span class="selector"></span></div><div stlye="grid-column: span 1"></div><div style="grid-column:span 8"></div><div class="large-menu-item large-menu-container off" id="menu-performance-item"><div class="large-menu-left" id="performance-quick-switch"><div class="large-menu-icon left" id="performance-icon"></div><div class="large-menu-text">Power Mode<br><span class="performance-subtext">Balanced</span></div></div><div class="large-menu-right" id="performance-settings"></div></div><div class="large-menu-item off single-item" id="menu-night-light"><div class="large-menu-icon" id="night-light-icon"></div><div class="large-menu-text">Night Light</div></div><div class="large-menu-item off single-item" id="menu-dark-style"><div class="large-menu-icon" id="dark-style-icon"></div><div class="large-menu-text">Dark Style</div></div><div class="large-menu-item off single-item" id="menu-dot-not-disturb"><div class="large-menu-icon" id="do-not-disturb-icon"></div><div class="large-menu-text">Do Not Disturb</div></div>`,
    "top-right-menu-icons": {
        "performances": {
            "power saver": '<img src="./files/icons/sys/Yaru/performance_saver.svg" height="20px" width="20px"></img>',
            "balanced": '<img src="./files/icons/sys/Yaru/performance_balanced.svg" height="20px" width="20px"></img>',
            "performance": '<img src="./files/icons/sys/Yaru/performance_performance.svg" height="20px" width="20px"></img>'
        },
        "night-light": '<img src="./files/icons/sys/Yaru/night_light.svg" height="20px" width="20px"></img>',
        "dark-style": '<img src="./files/icons/sys/Yaru/dark_style.svg" height="20px" width="20px"></img>',
        "do-not-disturb": '<img src="./files/icons/sys/Yaru/no_notification.svg" height="20px" width="20px"></img>',

        "brightness": '<img src="./files/icons/sys/Yaru/brightness.svg" height="20px" width="20px"></img>',
        "screenshot": '<img src="./files/icons/sys/Yaru/screenshot.svg" height="20px" width="20px"></img>',
        "settings": '<img src="./files/icons/sys/Yaru/settings.svg" height="20px" width="20px"></img>',
        "lock": '<img src="./files/icons/sys/Yaru/lock.svg" height="20px" width="20px"></img>',
        "shutdown": '<img src="./files/icons/sys/Yaru/shutdown.svg" height="20px" width="20px"></img>'
    },
    "arrow-right-1" : '<img src="./files/icons/sys/Yaru/arrow_right_1.svg" height="20px" width="20px"></img>',

    "window-fullscreen": '<img src="./files/icons/sys/Yaru/window_fullscreen.svg" height="20px" width="20px"></img>',
    "window-restore": '<img src="./files/icons/sys/Yaru/window_restore.svg" height="20px" width="20px"></img>',
    "window-close": '<img src="./files/icons/sys/Yaru/window_close.svg" height="20px" width="20px"></img>',
    "window-hide": '<img src="./files/icons/sys/Yaru/window_hide.svg" height="20px" width="20px"></img>'
};

function onStart() {
    let jsonElement = document.getElementById('script-data');
    jsonElement.id = 'json-data';
    jsonElement.innerHTML = JSON.stringify(data);
}

// TODO find icons (look into Ubuntu system files)
// TODO move each data to the app data (files/data/apps/[name]/data.js)
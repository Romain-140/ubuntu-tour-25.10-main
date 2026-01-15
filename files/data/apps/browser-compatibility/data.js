const browser_compatibilityData = {
    'Firefox_intro': {
        'title': 'Important',
        'content': 'You are currently using Firefox, which has limited browser-system interaction API.<br/>This means some feature will not be available (battery, connection, ...).',
        'choices': ['OK']
    },
    'Windows_intro': {
        'title': 'Welcome!',
        'content': 'Welcome to Ubuntu, dear Windows user!',
        'choices': ['Hi!']
    },
    "Mobile_intro": {
        'title': 'Warning',
        'content': "You're playing a dangerous game.<br/>This project was not made for mobile, so be careful.",
        "choices": ['OK']
    },
    "Generic_intro": {
        'title': 'Information',
        'content': "Welcome to this online Ubuntu 25.10!<br/>As this is only a web version, some (most) features aren't available (yet).<br/>If you discover any bug, please report it on my GitHub page.<br/>Thank you!",
        'choices': ['OK']
    }
};

function data_loader_load() {
    let data = document.createElement('div');
    data.id = 'browser-compatibility_data';
    data.textContent = JSON.stringify(browser_compatibilityData);

    document.getElementById('system-data-loader').appendChild(data);
    document.querySelector('script[src$="browser-compatibility/data.js"]').remove();
}

data_loader_load()

// Clean
function addBlockDiv() {
    const blockDiv = document.createElement('div');
    blockDiv.id = 'system-notification-block';
    blockDiv.className = "system-notification-block";
    blockDiv.classList.add('inactive');
    document.body.appendChild(blockDiv);
}

function addStyle() {
    const mainStyle = document.createElement('link');
    mainStyle.href = './files/apps/system/notification-manager/main.css';
    mainStyle.rel = 'stylesheet';
    document.head.appendChild(mainStyle);
}

function callSystemNotification(title, text, choices, red) { // title, text, choices
    document.getElementById('system-notification-block').classList.replace('inactive', 'active');
    let settings = `{"title":"${title}", "text":"${text}", "choices":${JSON.stringify(choices)}, "red":"${red}"}`;
    addNotificationChoice(settings);
}

function removeNotification() {
    document.getElementById('system-notification-block').classList.replace('active', 'inactive');
    document.getElementById('system-notification-main').classList.add('remove');
    setTimeout(() => {document.getElementById('system-notification-main').remove()}, 90);
}

function notificationChosen(e) {
    const target = e.target;
    let choice = e.target.id;
    choice = choice.slice(7);
    sessionStorage.setItem('notification-choice', choice);
    removeNotification();
}

function addNotificationChoice(settings) { // boxes, red, title, text, choice1, choice2

    let parsedSetting = JSON.parse(settings);

    let title = parsedSetting.title;
    let text = parsedSetting.text;

    let choices = parsedSetting.choices;
    let red = parsedSetting.red;

    let choicesDiv = document.createElement('div');
    choicesDiv.id = 'notification-choices';
    choicesDiv.style.gridTemplateColumns = "1fr ".repeat(choices.length);
    choicesDiv.classList.add('notification-choices');
    for (let choice in choices) {
        let cc = document.createElement('div');
        cc.classList.add('notification-div-choice')
        if (choice === red) {cc.classList.add('red')}
        cc.id = `choice-${choice}`;
        cc.textContent = choices[choice];
        choicesDiv.appendChild(cc);
    }

    const questionDiv = document.createElement('div');
    questionDiv.id = 'system-notification-main';
    questionDiv.classList.add('main-notification-div');
    questionDiv.innerHTML = `<h1>${title}</h1><p>${text}</p>`;
    questionDiv.appendChild(choicesDiv);

    document.body.appendChild(questionDiv);

    const elements = document.getElementsByClassName('notification-div-choice');

    for (let element = 0; element < elements.length; element++) {
        elements[element].addEventListener('click', notificationChosen);
    }
}

async function waitForChange(item) {
    while (sessionStorage.getItem(item) === '') {
        await new Promise(r => setTimeout(r, 100));
    }
}

function testStorage(key, previousValue, id) {
    if (sessionStorage.getItem(key) !== previousValue) {
        clearInterval(id);
        return true;
    }
}

function onStart() {
    addStyle();
    addBlockDiv();

    sessionStorage.setItem('notification-choice', '0');

    document.getElementById('option-1').addEventListener('click',function() {
        let id = setInterval(function() {
            if (testStorage('notification-choice', '0', id)) {
                if (sessionStorage.getItem('notification-choice') === '2') {
                    sessionStorage.setItem('notification-choice', '0');
                }
            }
        }, 75);
        callSystemNotification('Notification', 'This is a test notification with a long text. Please ignore it', ["OK", "I'm an idiot", "Cancel", "Test"], 1);
    });
    
    document.getElementById('script-notification-manager').outerHTML = '';
}
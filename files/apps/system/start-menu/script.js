function addStyle() {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = './files/apps/system/start-menu/main.css';
    document.head.append(style);
}

function addChoice() {
    let box = document.createElement('div');
    box.className = 'grub-box';

    // Ubuntu

    let choice = document.createElement('div');
    choice.id = 'ubuntu-25-10'
    choice.className = 'grub-choice';
    choice.innerHTML = '<span>*</span>Ubuntu 25.10 custom-kernel 1.0.0';
    box.appendChild(choice);

    choice = document.createElement('div');
    choice.id = 'ubuntu-25-04'
    choice.className = 'grub-choice';
    choice.innerHTML = '<span>*</span>Ubuntu 25.04 custom-kernel 1.0.0';
    box.appendChild(choice);

    // Possible add other OS in the future

    document.body.appendChild(box);
}

function getElementIndex(collection, element) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i] === element) {
            return i;
        }
    }
}

function removeBlack() {
    document.querySelector('.load-screen').classList.add('remove');
}

function removeGrub() {
    let black = document.createElement('div');
    black.classList.add('load-screen');
    document.body.appendChild(black);

    document.getElementsByClassName('grub-box').item(0).remove();
    window.removeEventListener('keydown', changeChoice);
    document.removeEventListener('contextmenu', function (e) {e.preventDefault()});
}

function changeChoice(event) {
    let choices = document.getElementsByClassName('grub-choice');
    let selected = document.getElementsByClassName('selected');

    if (selected.length === 0) {
        console.log('No selected item found');
        return;  // Exit early if no item is selected
    }

    let choiceID = getElementIndex(choices, selected.item(0));

    if (choiceID === -1) {
        console.log('Selected item is not in the choices collection');
        return;  // Exit if no valid index is found
    }
    
    if (event.key == 'ArrowDown') {
        if (choiceID < choices.length-1) {
            choiceID++;
            choices.item(choiceID).classList.add('selected');
            selected.item(0).classList.remove('selected');
        }

    }
    
    if (event.key == 'ArrowUp') {
        if (choiceID > 0) {
            choiceID--;

            let currentElement = selected.item(0);
            let nextElement = choices.item(choiceID);

            nextElement.classList.add('selected');
            currentElement.classList.remove('selected');
        }
    }

    if (event.key == 'Enter') {
        // loadKernels(selected.id);
        removeGrub();
        loadApp('login-menu')
        setTimeout(() => {
            removeBlack();
        }, 100);
    }

}

function addSelectionScript() {
    document.addEventListener('contextmenu', function (e) {e.preventDefault()})
    let selected = document.getElementById('ubuntu-25-10');
    selected.classList.add('selected');

    window.addEventListener('keydown', changeChoice);
}


// Add selectable start OS

function onStart() {
    addStyle();
    addChoice();
    addSelectionScript();
}
const openEyeCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';
const passwordHash = 1281629883;
var updateStyleInterval;

const generateHash = (string) => {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return hash;
};

function addMainMenu() {
	document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
	});

	const menuBackground = document.createElement('div');
	menuBackground.id = 'login-menu-background';
	menuBackground.classList.add('login-menu-background');
	let password = "<div id='user-input' class='user-input'><input type='password' id='user-password' class='user-password' placeholder='Password' onkeypress='sendPassword(event)' autofocus></input><i id='show-password' class='show-password'></i></div>"
	menuBackground.innerHTML = `<div id='user-login' class='user-login' style='height: ${window.innerHeight}px'><div id='user-icon' class='user-icon' style='width: ${window.innerHeight*0.2}px; left: ${(window.innerWidth-window.innerHeight*0.2)/2}px'></div><div id='username' class='username'>User</div>${password}</div>`;
	
	document.body.appendChild(menuBackground);
}

function updateStyle() {
	document.getElementById('user-login').style.height = `${window.innerHeight}px`;
	document.getElementById('user-icon').style.width = `${window.innerHeight*0.2}px`;
	document.getElementById('user-icon').style.left = `${(window.innerWidth-window.innerHeight*0.2)/2}px`;

	document.getElementById('user-input').style.left = `${(window.innerWidth*0.88/2 - 11)}px`;
}

function addStyle() {
	const style = document.createElement('link');
	style.rel = 'stylesheet';
	style.href = './files/apps/system/login-menu/main.css'
	document.head.appendChild(style);

	updateStyleInterval = setInterval(updateStyle, 100);
}

function hidePassword() {
	document.getElementById('show-password').innerHTML = openEyeCode;
	document.getElementById('user-password').setAttribute('type', 'password');
	document.removeEventListener('mouseup', hidePassword);
}

function setupFunctions() {
	// Setup the password hide
	let closesEyeCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="48" y1="40" x2="208" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M154.91,157.6a40,40,0,0,1-53.82-59.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M135.53,88.71a40,40,0,0,1,32.3,35.53" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M208.61,169.1C230.41,149.58,240,128,240,128S208,56,128,56a126,126,0,0,0-20.68,1.68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M74,68.6C33.23,89.24,16,128,16,128s32,72,112,72a118.05,118.05,0,0,0,54-12.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';
	let icon = document.getElementById('show-password');
	icon.innerHTML = openEyeCode;
	icon.addEventListener('mousedown', () => {
		icon.innerHTML = closesEyeCode;
		document.getElementById('user-password').setAttribute('type', 'text');
		document.addEventListener('mouseup', hidePassword);
	});
}

function wrongPassword() {
	let passwordElement = document.getElementById('user-input');
	passwordElement.classList.add('wrong-animation');
	setTimeout(() => {passwordElement.classList.remove('wrong-animation')}, 300);
}

function removeBlack() {
	document.getElementsByClassName('load-screen').item(0).classList.add('remove');
}

function loadPage() {
	document.getElementsByClassName('load-screen').item(0).classList.remove('remove');

	clearInterval(updateStyleInterval);
	removeEventListener('contextmenu', function(e) {
	    e.preventDefault();
	});
	document.getElementById('login-menu-background').remove();

	loadApp('home-view');

	setTimeout(removeBlack, 200)
}

function sendPassword(event) {
	if (event.key === 'Enter') {
		if (generateHash(document.getElementById('user-password').value) === passwordHash) {
			loadPage();
		} else {
			wrongPassword();
			document.getElementById('user-password').value = '';
		}
	}
}

function onStart() {
	addStyle();
	addMainMenu();
	setupFunctions();

	document.getElementById('script-login-menu').outerHTML = '';
}
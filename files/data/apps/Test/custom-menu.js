function loadMenuActions(menuElement, windowObject) {
    if (!menuElement) return;

    let data = {
        'fullscreen': windowObject.forceFullscreen,
        'close': windowObject.close
    };

    // AI - GPT-5 mini

    if (!menuElement._menuActionsBound) {
        menuElement.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li || !menuElement.contains(li)) return;
            const key = li.textContent.trim().toLowerCase();
            const fn = windowObject && data[key];
            if (typeof fn === 'function') {
                fn.call(windowObject, { menuElement, li, event: e });
            } else {
                console.warn('No action for', key);
            }
            
        });
        menuElement._menuActionsBound = true;
    }

    // AI - End
}
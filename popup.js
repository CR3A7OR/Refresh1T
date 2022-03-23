// On start click, start content.js
document.getElementById('start').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
        // WAY 2
        // chrome.tabs.sendMessage(activeTabs[0].id, { action: 'start' });
		chrome.storage.local.set({ action: 'start' });

    });
});

document.getElementById('stop').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
        // WAY 2
        // chrome.tabs.sendMessage(activeTabs[0].id, { action: 'start' });
		chrome.storage.local.set({ action: 'stop' });

    });
});


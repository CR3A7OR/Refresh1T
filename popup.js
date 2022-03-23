// On start click, start content.js
document.getElementById('start').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
        // WAY 2
        chrome.tabs.sendMessage(activeTabs[0].id, { action: 'start' });
    });
});
// https://stackoverflow.com/questions/38561136/chrome-extension-to-change-dom-with-a-button-in-extension-popup

// on stop send hash of value 0 to content
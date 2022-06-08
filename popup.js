/*
 * @module popup.js
 * - handle input for all check and text box elements
 * - start or stop functionality
 * @author CR3AT0R
 * @license MIT
 */

// On start click, start content.js
document.getElementById('start').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
		chrome.storage.local.set({ action: 'start' });
    });

    /* GETS TAB ID OF CURRENT TAB  */
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        var myTabId = tabs[0].id;
        chrome.storage.local.set({ tabID: myTabId });
    });
});

document.getElementById('stop').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
		chrome.storage.local.set({ action: 'stop' });
        chrome.storage.local.clear();
    });
});

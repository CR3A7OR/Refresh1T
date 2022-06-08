/*
 * @module background.js
 * - returns tab id of requesting tab
 * @author CR3AT0R
 * @license MIT
 */

/* RETURNS THE TAB ID OF THE TAB SENDING MESSAGE*/
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "getID") {
        sendResponse({tab: sender.tab.id});
     }
});

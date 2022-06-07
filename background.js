/* RETURNS THE TAB ID OF THE TAB SENDING MESSAGE*/
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "getID") {
        sendResponse({tab: sender.tab.id});
     }
});

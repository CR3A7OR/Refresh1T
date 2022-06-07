/* RETURNS THE TAB ID OF THE TAB SENDING MESSAGE*/
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "getID") {
        sendResponse({tab: sender.tab.id});
     }
});

/* OLD METHOD CHECKING VALUE AGAINST SAVED PREVIOUS
let preHash = '';
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === 'content'){
        console.log(msg.text);
        console.log(sender.tab.id);

        if (msg.text === sender.tab.id) {
            if (preHash === '') { preHash = msg.subject; response("true"); return true;}
            if (msg.subject == preHash){
                console.log(msg.subject);
                response("true");
                return true;
            }
            else {
                response("false");
                return true;
            }
        }else {
            response("false");
            return true;
        }
    }
});
*/

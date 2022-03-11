let preHash = '';

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === 'content'){
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
    }
});
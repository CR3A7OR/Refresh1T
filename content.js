/*
 * @module content.js
 * - apply hash interaction to javascript elements
 * @author CR3AT0R
 * @license MIT
 */

let hash = '';
var preHash = '';

/* FUNCTION CREATES HASH OF PARAMETER PASSED */
async function digestMessage(message) {
    const utfENcode = new TextEncoder().encode(message);                     
    const hashBuffer = await crypto.subtle.digest('SHA-256', utfENcode);           
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}

/* RETRIEVES VALUE OF POPUP.JS ACTIONS */
chrome.storage.local.get("action").then(
    function(action) {
        if (action.action == "start"){
            digest();
        }
    }
)

/* LISTENS FOR CHANGE IN THE VALUE OF action TO CONTINUE OR STOP  */
chrome.storage.onChanged.addListener(function(changes) {
    var action = changes['action'];
    if(action.newValue === 'start') {
        /* ESTABLISHES INITIAL HASH VALUE OF WEBSITE AND STORES IT */
        digestMessage(document.documentElement.innerHTML).then(digestHex => {
            localStorage.setItem('hash', digestHex);
            digest();
        });
        
    }
    else if (action.newValue === 'stop') {
        console.log('DONE');
    }
    return true;
});

/* MAIN CODE THAT REFRESHES SITE IF HASH VALUE IS THE SAME AND  */
function digest(){
    var tab;
    /* RETRIEVES IF OF TAB THAT INTERACTED WITH popup.js */
    chrome.storage.local.get("tabID",function(item) {
        window.tab=item["tabID"]

        /* HASHES SOURCE CODE OF WEBSITE */
        digestMessage(document.documentElement.innerHTML).then(digestHex => {
            hash = digestHex;
            /* ACQUIRES TAB ID OF CURRENT TABS AND CHECKS TO ONLY REFRESH MATCHING TAB */
            chrome.runtime.sendMessage({ from: 'content', text: "getID" }, mytabId => {
                if (window.tab === mytabId.tab){
                    preHash = localStorage.getItem('hash');
                    if (hash == preHash || preHash == null){
                        location.reload(true)
                    }
                    else {
                        localStorage.setItem('hash', hash);
                    }        
                }
            });
            
        });
    });
}

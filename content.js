let hash = '';

async function digestMessage(message) {
    const utfENcode = new TextEncoder().encode(message);                     
    const hashBuffer = await crypto.subtle.digest('SHA-256', utfENcode);           
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}

chrome.storage.local.get("action").then(
    function(action) {
        if (action.action == "start"){
            digest();
        }
    }
)

chrome.storage.onChanged.addListener(function(changes) {
    //if(request.action === 'start') {
    var action = changes['action'];
    if(action.newValue === 'start') {
        digest();
        location.reload(true);
    }
    else if (action.newValue === 'stop') {
        console.log('DONE');
    }
    return true;
});

function digest(){
    
    digestMessage(document.documentElement.innerHTML).then(digestHex => {

        hash = digestHex
        console.log(hash);
        chrome.runtime.sendMessage({
            from: 'content',
            subject: hash,
        }, (response) => { 
        
            if (response == "true"){
                location.reload(true)
            }
            else {
                console.log('NEW HASH:', response);
            } 
        
        });

    });
}

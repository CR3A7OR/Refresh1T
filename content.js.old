let hash = '';

async function digestMessage(message) {
    const utfENcode = new TextEncoder().encode(message);                     
    const hashBuffer = await crypto.subtle.digest('SHA-256', utfENcode);           
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}

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

import messageTypes from "../messages/messageTypes";
import {init} from "./popupConn";

let conn = init();

conn.postMessage({
    "type": messageTypes.INIT,
    payload: {}
}).then(function (state){
    if(state.account.did){
        const did = document.getElementById('create-account-form').elements.did;
        did.value = state.account.did;
    }
});


document.getElementById("createButton").addEventListener('click', async function (event) {

    conn.postMessage({
        "type": messageTypes.CREATE
    }).then(function (state){
        const did = document.getElementById('create-account-form').elements.did;
        did.value = state.account.did;
    })

});

document.getElementById("encryptButton").addEventListener('click', async function (event) {
    const $encryption = document.getElementById('encryption-form');
    const did = $encryption.elements.did;
    const input = $encryption.elements.input;

    conn.postMessage({
        "type": messageTypes.ENCRYPT_TEXT,
        payload: {
            input: input.value,
            did: did.value
        }
    }).then(function (state){
        input.value = state.encryptedMessageQueue.pop().value;
    });

});

document.getElementById("decryptButton").addEventListener('click', async function (event) {
    const input = document.getElementById("decryption-form").elements.input;
    conn.postMessage({
        "type": messageTypes.DECRYPT_TEXT,
        payload: {
            input: input.value
        }
    }).then(function (state){
        input.value = state.decryptedMessageQueue.pop().value;
    })

});

function onChange(){

    let lastSelectedForm = null;
    return function (node) {
        if(node.hasAttribute("checked")){
            lastSelectedForm = document.getElementById(""+node.dataset.for);
            lastSelectedForm.classList.add("show");
        }

        node.addEventListener('change', function (event) {
            lastSelectedForm?.classList.remove("show");
            const form = document.getElementById(""+event.target.dataset.for);
            form.classList.add("show");
            lastSelectedForm = form;
        });
    };
};

document.getElementsByName("opt").forEach(onChange());
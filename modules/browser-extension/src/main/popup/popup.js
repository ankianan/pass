import {encryptTextForDID, decryptText} from "@pass/core/src/main/ContentManager";
import AccountManager from "@pass/core/src/main/AccontManager";


let account = null

document.getElementById("encryptButton").addEventListener('click', async function (event) {
    const $encryption = document.getElementById('encryption-form');
    const did = $encryption.elements.did;
    const input = $encryption.elements.input
    input.value = await encryptTextForDID(input.value, did.value);
});

document.getElementById("createButton").addEventListener('click', async function (event) {
    if(!account){
        account = await AccountManager.create();
        const did = document.getElementById('create-account-form').elements.did;
        did.value = account.did;
    }
});

document.getElementById("decryptButton").addEventListener('click', async function (event) {
    const input = document.getElementById("decryption-form").elements.input;
    input.value = await decryptText(input.value, account.privateKey);
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
import '@decentralized-identity/ion-tools';
import AccountManager from "@pass/core/src/main/AccontManager";
import messageTypes from "./messages/messageTypes";
import {decryptText, encryptTextForDID} from "@pass/core/src/main/ContentManager";
import {getBrowser} from "./helper/crossBrowser";

let account;

/**
 *
 * @type {{account: {did: string}, decryptedMessageQueue: [{value: string}], encryptedMessageQueue:[{value: string}]}}
 */
let state = {
    account: {},
    decryptedMessage: "",
    encryptedMessage: ""
}

getBrowser().runtime.onConnect.addListener(function (port){

    port.onMessage.addListener(async function(msg) {

        if(msg.type === messageTypes.INIT){
            state = {...state, ...msg.payload}
        }
        else if(msg.type === messageTypes.CREATE) {
            if(!state.account.did){
                account = await AccountManager.create();
                state.account.did = account.did;
            }
        } else if(msg.type === messageTypes.DECRYPT_TEXT){
            try {
                state.decryptedMessage = await decryptText(msg.payload.input, account.privateKey)
            }catch (e){
                state.decryptedMessage = "Can't be decrypted";
            }

        } else if(msg.type === messageTypes.ENCRYPT_TEXT){
            const {input, did} = msg.payload;
            state.encryptedMessage = await encryptTextForDID(input, did)
        }

        port.postMessage(state);
    });


})
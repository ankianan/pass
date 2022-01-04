import AccountManager from "../../main/AccontManager";
import {decryptText, encryptTextForDID} from "../../main/ContentManager";

window.test = async function (){
    const walletAlice = await AccountManager.create();
    const walletBob = await AccountManager.create();

    const messageForBob = await encryptTextForDID('Alice: Hi Bob, How are you?',walletBob.did);
    const messageForAlice = await encryptTextForDID('Bob: Hi Alice, I am good.',walletAlice.did);

    console.log('%c' + await decryptText(messageForBob, walletBob.privateKey), 'color: lightgreen');
    console.log(await decryptText(messageForAlice, walletAlice.privateKey));
};

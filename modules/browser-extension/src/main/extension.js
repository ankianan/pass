import messageTypes from "./messages/messageTypes";
import {init} from "./helper/conn";
const conn = init("Content script conn");

document.body.insertAdjacentHTML("beforeend", '' +
    '<span id="tooltip" style="position: fixed; cursor: pointer; display: none; background: rgb(252, 251, 250); font-size: 18px; border-radius:5px; padding: 0 3px;">🔍</span>');

const tooltip = document.getElementById("tooltip");

let lastSelection = null
document.addEventListener('mousemove', (event) => {

    const selection = window.getSelection().toString()
    if (selection) {
        tooltip.style.display = "block";
        if (lastSelection !== selection) {
            lastSelection = selection;

            tooltip.style.left = event.clientX + 'px';
            tooltip.style.top = event.clientY + 20 + 'px';
            conn.postMessage({
                "type": messageTypes.DECRYPT_TEXT,
                payload: {
                    input: window.getSelection().toString()
                }
            }).then(function (state){
                tooltip.title = state.decryptedMessage;
            })
        }
    } else {
        tooltip.style.display = "none";
    }
});

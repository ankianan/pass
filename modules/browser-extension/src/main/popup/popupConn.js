import {getBrowser} from "../helper/crossBrowser";

export function init() {
    let callbackQueue = [];
    const port = getBrowser().runtime.connect({
        name: "Popup conn"
    });
    port.onMessage.addListener(function (state) {
        const pop = callbackQueue.pop();
        pop ? pop(state) : null;
    });

    return {
        postMessage(action){
            port.postMessage(action);
            return new Promise(resolve=>{
                callbackQueue.unshift(resolve);
            });
        }
    };
}
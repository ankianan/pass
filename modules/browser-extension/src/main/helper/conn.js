import {getBrowser} from "../helper/crossBrowser";

export function init(name) {
    let callbackQueue = [];
    const port = getBrowser().runtime.connect({
        name: name
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
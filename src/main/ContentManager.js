import * as jose from 'jose';
import {ALGORITHM, ENCRYPTION} from "./Constants";
import {getDidDoc} from "./helper/DIDHelper";

async function encryptText(publicKey, payload) {
    const jwe = await new jose.CompactEncrypt(
        new TextEncoder().encode(
            payload
        )
    )
        .setProtectedHeader({alg: ALGORITHM, enc: ENCRYPTION})
        .encrypt(publicKey)

    return jwe;
}

export async function decryptText(jwe, privateKey) {
    const {plaintext} = await jose.compactDecrypt(jwe, privateKey)
    return new TextDecoder().decode(plaintext)
}

export async function encryptTextForDID(text, did) {
    const response = await getDidDoc(did);

    const rsaPublicKey = await jose.importJWK(response.didDocument.verificationMethod[0].publicKeyJwk, ALGORITHM)

    const jwe = await encryptText(rsaPublicKey, text);
    return jwe;
}

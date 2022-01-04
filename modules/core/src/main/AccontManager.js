import * as jose from 'jose';
import {ALGORITHM} from "./Constants";

export default class AccountManager {
    constructor(did, privateKey) {
        this.did = did;
        this.privateKey = privateKey;
    }

    static async create(){
        const {publicKey, privateKey} = await jose.generateKeyPair(ALGORITHM)

        const publicKeyJwk = await jose.exportJWK(publicKey);


        let did = new ION.DID({
            content: {
                publicKeys: [
                    {
                        id: 'key-1',
                        type: 'JsonWebKey',
                        publicKeyJwk,
                        purposes: ['authentication']
                    }
                ],
                services: [
                    {
                        id: 'domain-1',
                        type: 'LinkedDomains',
                        serviceEndpoint: 'https://foo.example.com'
                    }
                ]
            }
        });

        return new AccountManager(await did.getURI(), privateKey);
    }
}
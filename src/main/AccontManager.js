import * as jose from 'jose';
import {ALGORITHM} from "./Constants";

export default class Wallet{
    constructor(privateKey, did) {
        this.privateKey = privateKey;
        this.did = did
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

        return new Wallet(privateKey, did);
    }
}
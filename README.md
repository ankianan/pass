# Pass

Is a tool to safely share content among set of people. It uses DID to restrict content access.

### Technologies
* ION (DID) : https://github.com/decentralized-identity/ion-tools
* JOSE (Encryption/ Decryption): https://github.com/panva/jose

### Install

- Run `yarn`

### Test

- Run `yarn:build`
- Run `http-server`
- Import `dist/browser-extension`

### Demo

[![Watch the video](https://user-images.githubusercontent.com/4686410/148703377-75cf29a9-49d2-46e2-8728-02ea954b0ced.png)](https://drive.google.com/file/d/1aa7MP4kAgimkCQofe3Y4XezseBSbJH5b/view?usp=sharing)

### Architecture
- Wallet: A key manager, that stores private/public key pair per identity per consumer.
  - Maintains a public endpoint to search set of registerd DIDs by user name   
- Identtiy: Each DID is an identity. 
  - One might want to maintain different identity on facebook and github.
- Consumer: Component encrypts/decrypt the content for set of users:
  - Can be browser extention, a CLI library or a dedicated App
- Relay: Component that allow consumer and wallet to communicate.


![image](https://user-images.githubusercontent.com/4686410/149643355-20ee0263-f21e-47d3-94f4-3a5bc8fa07cf.png)
https://app.diagrams.net/#DPass%20architecture



### FAQ
- Use case 
  - Prevent hack
    - A Facebook, which is end-to-end encrypted. That allow you to actually share content only with selected people (excluding even Facebook).
      - Isn’t it is same as WhatsApp end-to-end encrypted chat? 
        - Yes, but WhatsApp encryption only works within WhatsApp and is not available to other platforms outside it.
  - Paid content
    - A GitHub repo hosting encrypted content restricting access to set of user or corporates. Good for montezing open source work by developer.
- What is the objective?  
  - To give back user control of their data and let them decide with whom to share.
- Which other mediums can be target?  
  - Any collaboration medium (Insta, Github) that needs data to be shared among set of people.

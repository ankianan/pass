# Pass

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

### FAQ
- Use case 
  - Prevent hack
    - A Facebook, which is end-to-end encrypted. That allow you to actually share content only with selected people (excluding even Facebook).
      - Isn’t it is same as WhatsApp? 
        - No, WhatsApp  doesn’t have advance social networking features like memory, likes, comments etc. 
        - We want to re-use existing platform capabilities but just make the data exchange more safer.
  - Paid content
    - A GitHub repo hosting encrypted content restricting access to set of user or corporates. Good for montezing open source work by developer.
- What is the objective?  
  - To give back user control of their data and let them decide with whom to share.
- Which other mediums can be target?  
  - Any collaboration medium (Insta, Github) that needs data to be shared among set of people.


### Todos
- Allow encrypt/decrypt capability for both browser/cli content gateways.
- Allow user to login from multiple devices.
- Allow encryption for more than one DID.
- Allow referring group of target DIDs.

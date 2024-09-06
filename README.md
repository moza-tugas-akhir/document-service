# Non-Blockchain Service [Document Engine Service]
Used for both systems (non-blockchain based (MongoDB)/blockchain based(IPFS)) to generate the data and document, sent through axios connected to the server.

## Must follow through first
- Start the blockchain-based system (wip.js) via this path clientApp/blockchain / non-blockchain-based system (serverNB.js) via this path clientApp/nonblockchain first.
- Then run this repository.


### Steps in Running the Non-Blockchain System:
- **Non-Blockchain-based system: Mongo DB**
    1. `npm run dev`  📍 ServerNB.js
    2. Create User  / Login through BRUNO
    3. paste the token in .env 📍 .env `API_TOKEN` **document-service**
    4. fill `whichService = 'minio';` 📍 index.js*
    5. `npm run dev`  📍 index.js* 


### Steps in Running the Blockchain System:
- **Blockchain-based system: IPFS**
    1. `npm run dev`  📍 wip.js
    2. Create User 
    3. Login through BRUNO
    4. paste the token in .env 📍 .env `API_TOKEN` **document-service**
    5. fill `whichService = '';` 📍 index.js*
    6. `npm run dev`  📍 index.js*

#### Notes
*from this repository

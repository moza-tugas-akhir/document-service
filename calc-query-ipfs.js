import { queryByUserIdFromIPFS, queryByDocIdFromIPFS } from './query-ipfs.js';
import { performance } from 'perf_hooks';
import { appendResQueryUserId, appendResQueryDocId } from './store-res-ipfs.js';

// variable for calculating response time
let avgResTime = 0;
let maxResTime = 0;
let minResTime = Infinity;

// A function used for automated testing purpose only

// Calculating the response time for querying the file by doc Id and user Id from IPFS
export async function queryByUserIdViaIPFS(userId) {
  // Query the file by user Id from IPFS
  for (let i = 0; i < 30; i++) {
    const start = performance.now();

    // Without token
    // const data = await queryByUserIdFromIPFS(userId);

    // With token get it from environment variable
    const token = process.env.API_TOKEN_IPFS;
    const data = await queryByUserIdFromIPFS(userId, token);

    const end = performance.now();
    let resTime = end - start;
    await appendResQueryUserId(resTime);
    avgResTime += resTime;
    if (resTime > maxResTime) {
      maxResTime = resTime;
    }
    if (resTime < minResTime) {
      minResTime = resTime;
    }
  }

  return { avgResTime, maxResTime, minResTime };
}

export async function queryByDocIdViaIPFS(userId, docId) {
  // Query the file by doc Id from IPFS
  for (let i = 0; i < 30; i++) {
    const start = performance.now();

    // Without token
    // const data = await queryByDocIdFromIPFS(docId);

    // With token get it from environment variable
    const token = process.env.API_TOKEN_IPFS;
    const data = await queryByDocIdFromIPFS(userId, docId, token);

    const end = performance.now();
    let resTime = end - start;
    await appendResQueryDocId(resTime);
    avgResTime += resTime;
    if (resTime > maxResTime) {
      maxResTime = resTime;
    }
    if (resTime < minResTime) {
      minResTime = resTime;
    }
  }

  return { avgResTime, maxResTime, minResTime };
}

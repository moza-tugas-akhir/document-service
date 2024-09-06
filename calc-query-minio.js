import {
  queryByUserIdFromMinio,
  queryByDocIdFromMinio,
} from './query-minio.js';
import { performance } from 'perf_hooks';
import {
  appendResQueryUserId,
  appendResQueryDocId,
} from './store-res-minio.js';

// variable for calculating response time
let avgResTime = 0;
let maxResTime = 0;
let minResTime = Infinity;

// A function used for automated testing purpose only
// Calculating the response time for querying the file by doc Id and user Id from MinIO
export async function queryByUserIdViaMinio(userId) {
  for (let i = 0; i < 30; i++) {
    // Query the file by user Id from MinIO
    const start = performance.now();

    // Without token; switch on when running manually?
    // const token = null;
    // const data = await queryByUserIdFromMinio(userId, token);

    // With token get it from environment variable; switch on when running automatically
    const token = process.env.API_TOKEN;
    const data = await queryByUserIdFromMinio(userId, token);

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

export async function queryByDocIdViaMinio(docId) {
  for (let i = 0; i < 30; i++) {
    // Query the file by doc Id from MinIO
    const start = performance.now();

    // Without token; switch on when running manually?
    // const token = null;
    // const data = await queryByDocIdFromMinio(docId, token);

    // With token get it from environment variable; switch on when running automatically
    const token = process.env.API_TOKEN;
    const data = await queryByDocIdFromMinio(docId, token);

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

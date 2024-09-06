import express from 'express';
import dotenv from 'dotenv';
import { handleMinio } from './handle-minio.js';
import { handleIPFS } from './handle-ipfs.js';
dotenv.config();

// running express app
const app = express();
app.use(express.json());

async function main() {
  const whichService = 'minio';
  if (whichService === 'minio') {
    await handleMinio();
  } else {
    // Send files to the blockchain service
    await handleIPFS();
  }
}

main().catch((err) => {
  console.error('Error in main function:', err);
});

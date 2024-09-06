import express from 'express';
import { generateFakeData, saveDataToRootFile } from './generate-fake-data.js';
import { generatePDFs } from './generate-pdf.js';
import { performance } from 'perf_hooks';
import { sendFileToBlockchain } from './send-file-to-blockchain-service.js';
import { appendResCreateDoc } from './store-res-ipfs.js';
import {
  queryByDocIdViaIPFS,
  queryByUserIdViaIPFS,
} from './calc-query-ipfs.js';

// running express app
const app = express();
app.use(express.json());

export async function handleIPFS() {
  // variable for calculating response time
  let avgResTime = 0;
  let maxResTime = 0;
  let minResTime = Infinity;

  // try catch block for generating the data
  try {
    const fakeData = generateFakeData();
    const tempFilePath = saveDataToRootFile(fakeData);

    console.log('Fake data successfully created');
    console.log(`Temporary file created at ${tempFilePath}`);
  } catch (error) {
    console.error('Error generating fake data:', error);
  }

  let generatedFiles;
  let userIdArr = [];
  let docIdArr = [];
  const sendMethod = 'auto'; // 'manual' or 'auto'

  // try catch block for generating mockup NIB pdf file
  try {
    generatedFiles = generatePDFs(sendMethod);
  } catch (error) {
    console.error('Error generating PDFs:', error);
  }

  for (const file of generatedFiles) {
    console.log('file path: ', file.path);
    const metadata = {
      userId: file.metadata.userId,
      docId: file.metadata.docId,
      docName: file.metadata.docName,
      // docType: file.metadata.docType,
      // timestamp: file.metadata.timestamp,
    };

    if (sendMethod === 'manual') {
      // Just generated the pdf files and not hitting the endpoint directly
      // Create doc dari minio/ipfs harus hit endpoint manual [trigger dari user -- via postman/bruno] buat demo
    } else if (sendMethod === 'auto') {
      const start = performance.now();
      // Kalo otomasi untuk testing, karena udah apply user login jadinya access denied
      // Send the PDF to the IPFS (blockchain service)
      await sendFileToBlockchain(file.path, file.intendedFileName, metadata);

      userIdArr.push(metadata.userId);
      docIdArr.push(metadata.docId);

      const end = performance.now();
      let resTime = end - start;
      await appendResCreateDoc(resTime);
      avgResTime += resTime;
      if (resTime > maxResTime) {
        maxResTime = resTime;
      }
      if (resTime < minResTime) {
        minResTime = resTime;
      }
    }
  }

  // outside of for loop
  if (sendMethod === 'auto') {
    console.log('###########################################################');
    console.log(
      'Calculating the average response time for sending files to IPFS'
    );
    console.log('Average response time:', avgResTime / generatedFiles.length);
    console.log('Max response time:', maxResTime);
    console.log('Min response time:', minResTime);
    console.log('###########################################################');
  }

  // Query the file by user Id from IPFS
  const userId = userIdArr[0];

  try {
    console.log('Querying file with user id: ', userId);
    const queryUserIdRes = await queryByUserIdViaIPFS(userId);
    console.log('###########################################################');
    console.log('Querying file by user Id from IPFS');
    console.log(
      'Calculating the average response time for querying a file to IPFS by user Id'
    );
    console.log(
      'Average response time:',
      queryUserIdRes.avgResTime / generatedFiles.length
    );
    console.log('Max response time:', queryUserIdRes.maxResTime);
    console.log('Min response time:', queryUserIdRes.minResTime);
    console.log('###########################################################');
  } catch (error) {
    console.error('Error querying file by user Id:', error);
  }

  // Query the file by doc Id from IPFS
  const docId = docIdArr[0];
  try {
    console.log('Querying file with docid: ', docId);
    const queryDocIdRes = await queryByDocIdViaIPFS(userId, docId);
    console.log('###########################################################');
    console.log('Querying file by doc Id from IPFS');

    console.log(
      'Calculating the average response time for querying a file to IPFS by doc Id'
    );
    console.log(
      'Average response time:',
      queryDocIdRes.avgResTime / generatedFiles.length
    );
    console.log('Max response time:', queryDocIdRes.maxResTime);
    console.log('Min response time:', queryDocIdRes.minResTime);
    console.log('###########################################################');
  } catch (error) {
    console.error('Error querying file by doc Id:', error);
  }
}

// handleIPFS().catch((err) => {
//   console.error('Error in handle IPFS function:', err);
// });

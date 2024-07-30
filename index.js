import express from 'express';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { generateFakeData, saveDataToTempFile } from './generate-fake-data.js';
import { generatePDFs } from './generate-pdf.js';
import { sendFileToBlockchain } from './send-file-to-blockchain-service.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// running express app
const app = express();
app.use(express.json());

// ambil url blockchain service dari env

// generate mockup NIB pdf file
async function main() {
  try {
    const fakeData = generateFakeData();
    const tempFilePath = saveDataToTempFile(fakeData);

    console.log('Fake data successfully created');
    console.log(`Temporary file created at ${tempFilePath}`);
  } catch (error) {
    console.error('Error generating fake data:', error);
  }

  try {
    generatePDFs();
  } catch (error) {
    console.error('Error generating PDFs:', error);
  }

  //   try {
  //     const generatedFiles = generatePDFs();
  //     for (const file of generatedFiles) {
  //       const metadata = {
  //         userid: file.metadata.userid,
  //         docid: file.metadata.docId,
  //         docname: file.metadata.docName,
  //         doctype: file.metadata.docType,
  //         timestamp: file.metadata.timestamp,
  //       };
  //       await sendFileToBlockchain(file.path, metadata);
  //     }
  //   } catch (error) {
  //     console.error('Error generating PDFs:', error);
  //   }
}

main().catch((err) => {
  console.error('Error in main function:', err);
});

// sending file to bc service using axios -> http post req

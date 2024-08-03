import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { generateFakeData, saveDataToTempFile } from './generate-fake-data.js';
import { generatePDFs } from './generate-pdf.js';
import { sendFileToBlockchain } from './send-file-to-blockchain-service.js';
import { sendPdfToMinio } from './send-pdf-to-minio.js';

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
    const generatedFiles = generatePDFs();
    for (const file of generatedFiles) {
      const metadata = {
        userId: file.metadata.userId,
        docId: file.metadata.docId,
        docName: file.metadata.docName,
        // docType: file.metadata.docType,
        // timestamp: file.metadata.timestamp,
      };

      // Send the PDF to MinIO
      // await sendPdfToMinio(file.path, metadata);

      // try {
      //   // , 'test-bucket'
      //   console.log(`Sent ${file.intendedFileName} to MinIO`);
      // } catch (error) {
      //   console.error(
      //     `Failed to send ${file.intendedFileName} to MinIO:`,
      //     error.message
      //   );
      // }

      // Send the PDF to the blockchain service
      await sendFileToBlockchain(file.path, file.intendedFileName, metadata);
    }
  } catch (error) {
    console.error('Error generating PDFs:', error);
  }
}

main().catch((err) => {
  console.error('Error in main function:', err);
});

// sending file to bc service using axios -> http post req

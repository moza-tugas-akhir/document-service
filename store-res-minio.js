import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function appendResCreateDoc(resTime) {
  const folderPath = path.join(__dirname, 'response-times-minio');
  const filePath = path.join(folderPath, 'minio_upload_times.txt');

  try {
    // Create folder if it doesn't exist
    await fs.mkdir(folderPath, { recursive: true });

    // Append the response time to the file
    const timestamp = new Date().toISOString();
    const data = `${timestamp}: ${resTime}ms\n`;
    await fs.appendFile(filePath, data);

    // console.log(`Response time (${resTime}ms) appended to ${filePath}`);
  } catch (error) {
    console.error('Error appending response time:', error);
  }
}

export async function appendResQueryUserId(resTime) {
  const folderPath = path.join(__dirname, 'response-times-minio');
  const filePath = path.join(folderPath, 'minio_q_userId_times.txt');

  try {
    // Create folder if it doesn't exist
    await fs.mkdir(folderPath, { recursive: true });

    // Append the response time to the file
    const timestamp = new Date().toISOString();
    const data = `${timestamp}: ${resTime}ms\n`;
    await fs.appendFile(filePath, data);

    // console.log(`Response time (${resTime}ms) appended to ${filePath}`);
  } catch (error) {
    console.error('Error appending response time:', error);
  }
}

export async function appendResQueryDocId(resTime) {
  const folderPath = path.join(__dirname, 'response-times-minio');
  const filePath = path.join(folderPath, 'minio_q_docId_times.txt');

  try {
    // Create folder if it doesn't exist
    await fs.mkdir(folderPath, { recursive: true });

    // Append the response time to the file
    const timestamp = new Date().toISOString();
    const data = `${timestamp}: ${resTime}ms\n`;
    await fs.appendFile(filePath, data);

    // console.log(`Response time (${resTime}ms) appended to ${filePath}`);
  } catch (error) {
    console.error('Error appending response time:', error);
  }
}

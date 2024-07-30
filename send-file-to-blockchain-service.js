import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

export async function sendFileToBlockchain(filePath, metadata) {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('userid', metadata.userid);
    form.append('docid', metadata.docId);
    form.append('docname', metadata.docName);
    form.append('doctype', metadata.docType);
    form.append('timestamp', metadata.timestamp);

    const response = await axios.post(
      `${process.env.BLOCKCHAIN_SERVICE_URL}/api/createdoc/`,
      form,
      {
        headers: form.getHeaders(),
      }
    );

    console.log('File sent to blockchain service successfully:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

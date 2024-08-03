import axios from 'axios';
// import { promises as fs } from 'fs';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';

export async function sendPdfToMinio(pdfPath, metadata) {
  // , bucketName
  console.log('Uploading PDF to MinIO');
  try {
    // const fileBuffer = await fs.readFile(pdfPath);
    const formData = new FormData();

    // Append the file using createReadStream
    formData.append('file', fs.createReadStream(pdfPath), {
      filename: path.basename(pdfPath),
      contentType: 'application/pdf',
    });

    formData.append('docid', metadata.docId);
    formData.append('userid', metadata.userId);
    formData.append('docname', metadata.docName);

    const response = await axios.post(
      'http://localhost:7070/api/createdoc/',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log('PDF uploaded successfully');
    return response.data;
  } catch (err) {
    console.error(`Error uploading PDF: ${err.message}`);
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      console.error(err.request);
    }
    throw err;
  }
}

import axios from 'axios';
// import { promises as fs } from 'fs';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';

// buat minio & ipfs
// bikin encode decode userid pke jwt token, terus dipake buat entry & query doc
// create doc kirim dok & token AJA

export async function sendPdfToMinio(pdfPath, metadata) {
  console.log('Uploading PDF to MinIO');

  try {
    // const fileBuffer = await fs.readFile(pdfPath);
    const formData = new FormData();

    formData.append('file', fs.createReadStream(pdfPath), {
      filename: path.basename(pdfPath),
      contentType: 'application/pdf',
    });

    formData.append('docid', metadata.docId);
    formData.append('userid', metadata.userId);
    formData.append('docname', metadata.docName);

    const headers = {
      ...formData.getHeaders(),
    };
    headers.Authorization = `Bearer ${process.env.API_TOKEN}`;

    const response = await axios.post(
      `${process.env.MINIO_URL}/api/createdoc/`,
      formData,
      {
        // for debugging
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        // timeout: 15000, // 15 seconds timeout
      }
    );

    console.log('PDF uploaded successfully');
    return response.data;
  } catch (err) {
    console.error(`Error uploading PDF: ${err.message}`);
    if (err.response) {
      console.error(
        'Server responded with:',
        err.response.status,
        err.response.data
      );
    } else if (err.request) {
      console.error('No response received:', err.request);
    } else {
      console.error('Error setting up request:', err.message);
    }
    throw err;
  }
}

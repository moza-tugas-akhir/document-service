import path from 'path';
import fs from 'fs';
import { jsPDF } from 'jspdf';
import { fileURLToPath } from 'url';
import { Faker, id_ID, en } from '@faker-js/faker';

// Faker instance with Indonesian locale
const faker = new Faker({
  locale: [id_ID, en],
});

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const rootDir = path.resolve(__dirname, '..');

export function generatePDFs(sendMethod) {
  // Read data from file
  // const rawData = fs.readFileSync(
  //   path.join(__dirname, 'temp', 'fakeData.json'),
  //   'utf-8'
  // );
  const rawData = fs.readFileSync(
    path.join(__dirname, 'fakeData.json'),
    'utf-8'
  );

  const data = JSON.parse(rawData);

  // for testing api
  const generatedFiles = [];

  // Iterate over each object in the data array
  data.forEach((item, index) => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text('Nomor Induk Berusaha', 105, 15, null, null, 'center');
    const numericString = faker.string.numeric({
      length: 13,
      allowLeadingZeros: false,
    });
    doc.text(numericString, 105, 25, { align: 'center' });

    let yPos = 30;
    doc.setFontSize(12);
    // doc.text(`Item ${index + 1}:`, 20, yPos);
    yPos += 20;

    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'userId') {
        doc.setFontSize(10);
        // doc.text(`${key}: ${value}`, 30, yPos);
        if (key === 'name') {
          doc.text(`Nama                 : ${value}`, 30, yPos);
        } else if (key === 'docId') {
          doc.text(`ID Dokumen       : ${value}`, 30, yPos);
        }
        yPos += 7;
      }
      // if (key !== 'docName' && key !== 'timestamp') {
      //   doc.setFontSize(10);
      //   // doc.text(`${key}: ${value}`, 30, yPos);
      //   if (key === 'name') {
      //     doc.text(`Nama                 : ${value}`, 30, yPos);
      //   } else if (key === 'docId') {
      //     doc.text(`ID Dokumen       : ${value}`, 30, yPos);
      //   } else if (key === 'docType') {
      //     doc.text(`Jenis Dokumen  : ${value}`, 30, yPos);
      //   }
      //   yPos += 7;
      // }
    });

    let pdfFileSaved, pdfFileName, pdfPath;

    if (sendMethod === 'manual') {
      // Save the PDF with a unique name
      pdfFileSaved = `${item.docName}`;
      // pdfFileName = item.docName;
      pdfFileName = pdfFileSaved;

      const tempNamedDir = path.join(__dirname, 'temp-named');
      if (!fs.existsSync(tempNamedDir)) {
        fs.mkdirSync(tempNamedDir, { recursive: true });
      }

      pdfPath = path.join(__dirname, 'temp-named', pdfFileSaved);
    } else if (sendMethod === 'auto') {
      // Save the PDF with a unique name
      pdfFileSaved = `Generated NIB ${index + 1}.pdf`;
      pdfFileName = item.docName;
      pdfPath = path.join(__dirname, 'temp', pdfFileSaved);
    }

    // const pdfFileSaved = `Generated NIB ${index + 1}.pdf`;
    // const pdfFileName = item.docName;
    // const pdfPath = path.join(__dirname, 'temp', pdfFileSaved);

    // Save the PDF document
    fs.writeFileSync(pdfPath, doc.output(), 'binary');

    console.log(`Document titled ${pdfFileName} generated successfully!`);

    generatedFiles.push({
      path: pdfPath,
      intendedFileName: `${pdfFileName}`,
      metadata: item,
    }); //for testing API
  });

  console.log('All PDFs generated successfully!');

  return generatedFiles; //for testing API
}

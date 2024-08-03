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

export function generatePDFs() {
  // Read data from file (assuming JSON format)
  const rawData = fs.readFileSync(
    path.join(__dirname, 'temp', 'fakeData.json'),
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

    // Save the PDF with a unique name
    // const pdfFileName = `${item.docName}.pdf`;
    const pdfFileSaved = `Generated NIB ${index + 1}.pdf`;
    const pdfFileName = item.docName;
    const pdfPath = path.join(__dirname, 'temp', pdfFileSaved);

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

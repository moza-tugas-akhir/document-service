// import { faker } from '@faker-js/faker/locale/id_ID';
import { Faker, id_ID, en } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Faker instance with Indonesian locale
const faker = new Faker({
  locale: [id_ID, en],
});

// Generate 30 fake data entries
function generateFakeData() {
  const fakeData = [];
  // ganti upper bound untuk testing
  for (let i = 0; i < 30; i++) {
    // Generate a new user ID
    // const userId = uuidv4();
    const userId = Math.random().toString(12).substring(7);
    const name = faker.person.firstName();
    const secondName = faker.person.firstName();
    const fullName = name + ' ' + secondName;
    const docId = faker.string.uuid(); //docId = `document_${userId}` keep kalo bisa bedain antara user id & doc id
    // const docType = 'NIB'; application/pdf [ga perlu dimodify for now]
    // const timestamp = faker.date.recent({ days: 10 }); // Use a single argument for days

    fakeData.push({
      userId: userId,
      name: fullName,
      docId: docId,
      // docName: `${name}${secondName}-${docId}-${docType}.pdf`,
      docName: `${name}${secondName}-${docId}.pdf`,
      // docType: docType,
      // timestamp: timestamp,
    });
  }
  return fakeData;
}

// // Save data to a temporary JSON file in a specific directory
// function saveDataToTempFile(data) {
//   // Define the directory within the repository to save the temporary file
//   const tempDir = path.join(__dirname, 'temp');

//   // Ensure the directory exists
//   if (!fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir);
//   }

//   // Construct full path to the temp file
//   const tempFilePath = path.join(tempDir, 'fakeData.json');

//   // Write data to the file in JSON format
//   fs.writeFileSync(tempFilePath, JSON.stringify(data, null, 2));

//   // Return the path to temp file
//   return tempFilePath;
// }

// Save data to a JSON file in the root directory
function saveDataToRootFile(data) {
  // Construct full path to the file in the root directory
  const filePath = path.join(__dirname, 'fakeData.json');

  // Write data to the file in JSON format
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`Data saved to ${filePath}`);

  // Return the path to the file
  return filePath;
}

// Delete the temporary file
// function deleteTempFile(filePath) {
//   try {
//     fs.unlinkSync(filePath);
//     console.log(`Temporary file ${filePath} deleted successfully`);
//   } catch (err) {
//     console.error(`Error deleting temporary file ${filePath}`, err);
//   }
// }

export { generateFakeData, saveDataToRootFile };

// Ensure the temporary file is deleted when the program stops
// process.on('exit', () => {
//   const tempFilePath = path.join(__dirname, 'temp', 'fakeData.json');
//   deleteTempFile(tempFilePath);
// });

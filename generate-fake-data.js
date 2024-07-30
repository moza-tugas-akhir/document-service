// import { faker } from '@faker-js/faker/locale/id_ID';
import { Faker, id_ID, en } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Faker instance with Indonesian locale
const faker = new Faker({
  locale: [id_ID, en],
});

// Generate 30 fake data entries
function generateFakeData() {
  const fakeData = [];
  for (let i = 1; i < 31; i++) {
    const name = faker.person.firstName();
    const secondName = faker.person.firstName();
    const fullName = name + ' ' + secondName;
    const docId = faker.string.uuid();
    const docType = 'NIB';
    const timestamp = faker.date.recent({ days: 10 }); // Use a single argument for days

    fakeData.push({
      name: fullName,
      docId: docId,
      docName: name + secondName + '-' + docId + '-' + docType + '.pdf',
      docType: docType,
      timestamp: timestamp,
    });
  }
  return fakeData;
}

// Save data to a temporary JSON file in a specific directory
function saveDataToTempFile(data) {
  // Define the directory within your repository where you want to save the temporary file
  const tempDir = path.join(__dirname, 'temp');

  // Ensure the directory exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Construct the full path to the temporary file
  const tempFilePath = path.join(tempDir, 'fakeData.json');

  // Write the data to the file in JSON format
  fs.writeFileSync(tempFilePath, JSON.stringify(data, null, 2));

  // Return the path to the temporary file
  return tempFilePath;
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

export { generateFakeData, saveDataToTempFile };

// Ensure the temporary file is deleted when the program stops
// process.on('exit', () => {
//   const tempFilePath = path.join(__dirname, 'temp', 'fakeData.json');
//   deleteTempFile(tempFilePath);
// });

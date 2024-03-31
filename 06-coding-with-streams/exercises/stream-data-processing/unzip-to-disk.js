import AdmZip from 'adm-zip';

// Load the zip file
const zipFilePath = process.argv[2]; //'london_crime_by_lsoa.csv.zip';
const zip = new AdmZip(zipFilePath);

// Extract the content of the zip file
zip.extractAllTo('', true);

// Assuming there is only one file in the zip, get the first entry
const zipEntries = zip.getEntries();
if (zipEntries.length > 0) {
//  const firstEntry = zipEntries[0];
  
  // Read and parse the CSV content
//   const csvData = firstEntry.getData().toString('utf8');
//   const rows = csvData.split('\n');
//   for (const row of rows) {
//     console.log(row); // Process each row of the CSV file
//   }
}
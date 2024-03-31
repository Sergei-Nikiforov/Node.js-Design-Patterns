import StreamZip from 'node-stream-zip';
import { Iterate } from './iterate-records.js';
import { parse } from 'csv-parse';
// const zip = new StreamZip({ file: process.argv[2], storeEntries: true });

// zip.on('ready', () => {
//     console.log('Entries read: ' + zip.entriesCount);
//     for (const entry of Object.values(zip.entries())) {
//         const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
//         console.log(`Entry ${entry.name}: ${desc}`);
//     }
//     // Do not forget to close the file once you're done
//     zip.close()
// });

// const extract = (extracted) => {
//     let zip = new StreamZip({
//       file: process.argv[2],
//       storeEntries: true
//     })

//     zip.on('error', console.error)

//     zip.on('ready', () => {
//       zip.extract(null, '', (err) => {
//         if (err) {
//           return console.error(err)
//         }
//         return extracted()
//       })
//     })
//   }


const extract = async () => {
    const zip = new StreamZip.async({ file: process.argv[2], storeEntries: true });
    const entries = await zip.entries();
    const name = Object.values(entries)[0].name;
    const csvParser = parse({ columns: true });
    const inputStream = await zip.stream(name);

//    inputStream.pipe(process.stdout);
    inputStream.pipe(csvParser)
    .pipe(new Iterate())
    .on('end', () => zip.close());
  }

  extract()
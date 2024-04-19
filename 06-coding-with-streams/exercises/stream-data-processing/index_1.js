import StreamZip from 'node-stream-zip';
import { Iterate } from './iterate-records.js';
import { parse } from 'csv-parse';
import { LeastCommonCrime } from './least-common.js';
import { NumberOfCrimesOverYears } from './number-of-crimes.js'
import { FilterByCity } from './london/filter-by-city.js';
import { DangerousArea } from './london/dangerous-area.js';
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


  class InputStream {
    constructor(inputStream) {
        this.inputStream = inputStream;
    }

    static async factory() {
        const zip = new StreamZip.async({ file: process.argv[2], storeEntries: true });
        const entries = await zip.entries();
        const name = Object.values(entries)[0].name;
        const csvParser = parse({ columns: true });
        const readableStream = await zip.stream(name);
        const inputStream = readableStream.pipe(csvParser);

        return new this(inputStream);
    }

    process() {
        this.leastCommonCrime();
        this.crimeNumberOverYears();
        this.londonCrimes();
    }

    crimeNumberOverYears() {
        this.inputStream
            .pipe(NumberOfCrimesOverYears.factory())
            .pipe(process.stdout)
            .on('end', () => zip.close())
    }

    londonCrimes() {
        this.inputStream
//            .pipe(new FilterByCity('City of London'))
            .pipe(new DangerousArea())
            .pipe(process.stdout)
            .on('on', () => zip.close())
    }

    leastCommonCrime() {
        this.inputStream
            .pipe(LeastCommonCrime.factory())
            .pipe(process.stdout)
            .on('end', () => zip.close())
    }

  }

  (await InputStream.factory()).process();
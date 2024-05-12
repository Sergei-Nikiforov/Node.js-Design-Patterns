import StreamZip from 'node-stream-zip';
import { Iterate } from './iterate-records.js';
import { parse } from 'csv-parse';
import { LeastCommonCrime } from './least-common.js';
import { NumberOfCrimesOverYears } from './number-of-crimes.js'
import { FilterByCity } from './london/filter-by-city.js';
import { DangerousArea } from './london/dangerous-area.js';
import { MostCommonPerArea } from './most-common-per-area.js';
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
    constructor(inputStream, forkNumber) {
        this.inputStream = inputStream;
        this.forkNumber = forkNumber;
    }

    static async factory() {
        const zip = new StreamZip.async({ file: process.argv[2], storeEntries: true });
        const entries = await zip.entries();
        const name = Object.values(entries)[0].name;
        const csvParser = parse({ columns: true });
        const readableStream = await zip.stream(name);
        const inputStream = readableStream.pipe(csvParser);
        let forkNumber = 4;

        return new this(inputStream, forkNumber);
    }

    process() {
        this.crimeNumberOverYears();
        this.dangerouseArea();
        this.mostCommonPerArea();
        this.leastCommonCrime();
    }

    crimeNumberOverYears() {
        this.inputStream
            .pipe(NumberOfCrimesOverYears.factory())
            .pipe(process.stdout)
            .on('end', () => this.closeStream()())
    }

    dangerouseArea() {
        this.inputStream
//            .pipe(new FilterByCity('City of London'))
            .pipe(new DangerousArea())
            .pipe(process.stdout)
            .on('end', () => this.closeStream()())
    }

    commonCrimePerArea() {
        this.inputStream
            .pipe()
            .on('end', () => this.closeStream()())
    }

    mostCommonPerArea() {
        this.inputStream
            .pipe(MostCommonPerArea.factory())
            .pipe(process.stdout)
            .on('end', () => this.closeStream())
    }

    leastCommonCrime() {
        this.inputStream
            .pipe(LeastCommonCrime.factory())
            .pipe(process.stdout)
            .on('end', () => this.closeStream())
    }

    closeStream() {
        if (--this.forkNumber === 0) zip.close();
    }

  }

  (await InputStream.factory()).process();

import { createGunzip, } from 'zlib';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { Iterate } from './iterate-records.js';
import StreamZip from 'node-stream-zip';

class StreamDataProcessing {
    constructor(fileName, inputStream, csvParser) {
        this.fileName = fileName;
        this.inputStream = inputStream;
        this.csvParser = csvParser;
    }

    static decompres(fileName) {
        let zip = new StreamZip({
            file: fileName,
            storeEntries: true
        })

        zip.on('ready', () => {
            zip.extract(null, '', (err) => {
                if (err) {
                return console.error(err)
                }
        //        return extracted()
            })
        })

        return zip;
    }

    static factory() {
        const fileName = process.argv[2];
//        const zip = new StreamZip({ file: 'london_crime_by_lsoa.csv.zip', storeEntries: true });
        const inputStream = createReadStream(fileName);
//        const inputStream = this.decompres(fileName);
        console.log('inputStream!!', inputStream);
        const csvParser = parse({ columns: true });

        return new this(fileName, inputStream, csvParser);
    }



    fn() {
        this.inputStream
//        .pipe(process.stdout)
        .pipe(this.csvParser)
        .pipe(new Iterate())
        .pipe(process.stdout)
    }

    process() {
        console.log('111111');
        this.fn();
    }
}

StreamDataProcessing.factory().process();
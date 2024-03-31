import { createBrotliCompress, createDeflate, createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { PassThrough } from 'stream';
    
class InputStream {
    constructor(fileName, inputStream) {
        this.fileName = fileName;
        this.inputStream = inputStream;
    }

    static factory() {
        const fileName = process.argv[2];
        const inputStream = createReadStream(fileName);

        return new this(fileName, inputStream);
    }
    
    observeBytes(fileName) {
        let bytesWritten = 0;
        const monitor = new PassThrough();
        monitor.on('data', chunk => {
            bytesWritten += chunk.length;
        })
        
        monitor.on('finish', () => {
            console.log(`${fileName}. ${bytesWritten} bytes written. Compression end time ${new Date()}`)
        })
        return monitor;
    }

    brIputStream() {
        this.inputStream
            .pipe(createBrotliCompress())
            .pipe(this.observeBytes(`${this.fileName}.br`))
            .pipe(createWriteStream(`${this.fileName}.br`))
            .on('finish', () => {
                console.log('File br successfully compressed', new Date());
            })
    }

    dfInputStream() {
        this.inputStream
            .pipe(createDeflate())
            .pipe(this.observeBytes(`${this.fileName}.df`))
            .pipe(createWriteStream(`${this.fileName}.df`))
            .on('finish', () => {
                console.log('File df successfully compressed', new Date());
            })
    }

    gzInputStream() {
        this.inputStream
            .pipe(createGzip())
            .pipe(this.observeBytes(`${this.fileName}.gz`))
            .pipe(createWriteStream(`${this.fileName}.gz`))
            .on('finish', () => {
                console.log('File gz successfully compressed', new Date());
            })
    }

    process() {
        console.log('compression_start', new Date());

        this.brIputStream();
        this.dfInputStream();
        this.gzInputStream();
    }

}

InputStream.factory().process()
import { Transform } from 'stream';

export class NumberOfCrimesOverYears extends Transform {
    constructor (options = {}) {
        options.objectMode = true;
        super(options);
        this.numberOfCrimes = {};
    }
    
    static factory() {
        return new this();
    }

    collectCrimes(record) {
        if (record.year in this.numberOfCrimes) {
            this.numberOfCrimes[record.year] += +record.value;
            return;
        }

        this.numberOfCrimes[record.year] = +record.value;
    }

    _transform (record, enc, cb) {
        this.collectCrimes(record);
        cb();
    }

    _flush (cb) {
        this.push(`year - ${JSON.stringify(this.sortYear())}\n`);
        cb();
    }

    sortYear() {
        return Object.entries(this.numberOfCrimes).sort((a, b) => a[1] - b[1]);
    }

}
import { Transform } from 'stream';

export class LeastCommonCrime extends Transform {
    constructor (options = {}) {
        options.objectMode = true;
        super(options);
        this.leastOfMajourCrimes = {};
        this.leastOfMinorCrimes = {};
    }
    
    static factory() {
        return new this();
    }

    collectCrimes(record) {
        this.collectMajour(record);
        this.collectMinor(record);
    }

    collectMajour(record) {
        if (record.major_category in this.leastOfMajourCrimes) {
            this.leastOfMajourCrimes[record.major_category] += +record.value;
            return;
        }

        this.leastOfMajourCrimes[record.major_category] = +record.value;
    }

    collectMinor(record) {
        if (record.minor_category in this.leastOfMinorCrimes) {
            this.leastOfMinorCrimes[record.minor_category] += +record.value;
            return;
        }

        this.leastOfMinorCrimes[record.minor_category] = +record.value;
    }


    _transform (record, enc, cb) {
        this.collectCrimes(record);
        cb();
    }

    _flush (cb) {
        this.push(`major_category - ${JSON.stringify(this.sortMajourResult())}\n`);
        this.push(`minor_category - ${JSON.stringify(this.sortMinorResult())}\n`);
        cb();
    }

    sortMajourResult() {
        return Object.entries(this.leastOfMajourCrimes).sort((a, b) => a[1] - b[1]);
    }

    sortMinorResult() {
        return Object.entries(this.leastOfMinorCrimes).sort((a, b) => a[1] - b[1]);
    }

}
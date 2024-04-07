import { Transform } from 'stream'

export class LeastCommonCrime extends Transform {
    constructor (options = {}) {
        options.objectMode = true;
        super(options);
        this.total = 0;
        this.leastOfMajourCrimes = {};
        this.leastOfMinorCrimes = {};
    }
    
    static factory() {

        return new this();
    }

    collectCrimesByMajourCategory(record) {
        if (record.major_category in this.leastOfMajourCrimes) {
            this.leastOfMajourCrimes[record.major_category] += +record.value;
            return;
        }

        this.leastOfMajourCrimes[record.major_category] = +record.value;
    }

    _transform (record, enc, cb) {
        this.collectCrimesByMajourCategory(record);
        cb();
    }

    _flush (cb) {
//        this.push(`${JSON.stringify(this.leastOfMajourCrimes)}\n`);
        this.push(`${JSON.stringify(this.sortResult())}\n`);
        cb();
    }

    sortResult() {
        return Object.entries(this.leastOfMajourCrimes).sort((a, b) => a[1] - b[1]);
    }

}
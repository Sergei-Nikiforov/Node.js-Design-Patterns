import { Transform } from 'stream';

export class MostCommonPerArea extends Transform {
    constructor (options = {}) {
        options.objectMode = true;
        super(options);
        this.mostCommonCrime = {};
    }

    static factory() {
        return new this();
    }

    collectCrimes(record) {
        this.collectCategory(record, 'major_category');
        this.collectCategory(record, 'minor_category');
    }

    collectCategory(record, category) {
        if (!(record.borough in this.mostCommonCrime)) this.mostCommonCrime[record.borough] = {};
        if (!(category in this.mostCommonCrime[record.borough])) this.mostCommonCrime[record.borough][category] = {};
  
        this.copyCategory(record, category);
    }

    copyCategory(record, category) {
        if (record[category] in this.mostCommonCrime[record.borough][category]) {
            this.mostCommonCrime[record.borough][category][record[category]] += +record.value;
            return;
        }
        
        this.mostCommonCrime[record.borough][category][record[category]] = +record.value;
    }

    _transform(record, enc, cb) {
        this.collectCrimes(record);
        cb();
    }

    _flush (cb) {
        this.sortResults();
        cb();
    }

    sortResults() {
        for (const borough of Object.keys(this.mostCommonCrime)) {
            for (const category of Object.keys(this.mostCommonCrime[borough])) {
                this.push(`${borough} - ${category} - ${JSON.stringify(Object.entries(this.mostCommonCrime[borough][category]).sort((a, b) => a[1] - b[1]))}\n`);
            }
        }

    }
}
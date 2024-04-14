import { Transform } from 'stream';

export class DangerousArea extends Transform {
    constructor (options = {}) {
        options.objectMode = true;
        super(options);
        this.areaList = {};
    }

    collectCrimes(record) {
        if (record.borough in this.areaList) {
            this.areaList[record.borough] += +record.value;
            return;
        }

        this.areaList[record.borough] = +record.value;
    }

    _transform (record, enc, cb) {
        this.collectCrimes(record);
        cb();
    }

    _flush (cb) {
        this.push(`The most dangerous areas - ${JSON.stringify(this.sortAreas())}\n`);
        cb();
    }

    sortAreas() {
        return Object.entries(this.areaList).sort((a, b) => a[1] - b[1]);
    }

}
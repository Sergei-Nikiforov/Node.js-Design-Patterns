import { Transform } from 'stream';

export class FilterByCity extends Transform {
    constructor (city, options = {}) {
        options.objectMode = true;
        super(options);
        this.city = city;
    }

    _transform (record, enc, cb) {
        if (record.borough === this.city) this.push(record);
        cb();
    }

}
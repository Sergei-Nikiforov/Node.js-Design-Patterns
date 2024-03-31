import { Transform } from 'stream';

export class Iterate extends Transform {
    constructor (options = {}) {
      options.objectMode = true
      super(options)
    }
  
    _transform (record, enc, cb) {
      console.log('record!!', JSON.stringify(record));
      cb()
    }
  }
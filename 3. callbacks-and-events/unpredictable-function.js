import { readFile } from 'fs';

const cache = new Map();

export function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        // invoked synchronously
        console.log('synchronously!!', filename);
        cb(cache.get(filename));
    } else {
        // asynchronous function
        console.log('asynchronously!!', filename);
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data);
            cb(data);
        })
    }
}
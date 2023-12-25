import { readFile } from 'fs';

const cache = new Map();

export function consistentDeferredReadAsync(filename, callback) {
    if (cache.has(filename)) {
        // deferred callback invocation
//        setImmediate(() => callback(cache.get(filename)), 0);
        process.nextTick(() => callback(cache.get(filename)));
    } else {
        // asynchronous function
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data);
            callback(data);
        })
    }
}
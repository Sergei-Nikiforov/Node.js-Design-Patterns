import { inconsistentRead } from './unpredictable-function.js';

function createFileReader(filename) {
    const listeners = [];

    inconsistentRead(filename, value => {
        console.log('listeners_length!!', listeners.length);
        listeners.forEach(listener => {
            console.log('listener!!', listener);
            listener(value)
        })
    })

    return {
        onDataReady: listener => listeners.push(listener),
    }
}

const reader1 = createFileReader('data.txt');
console.log('Start!!', reader1);
reader1.onDataReady(data => {
    console.log(`First call data: ${data}`);
    
    // ...sometime later we try to read again from
    // the same file
    const reader2 = createFileReader('data.txt');
    reader2.onDataReady(data => {
        console.log(`Second call data: ${data}`);
    })
})
console.log('End!!');
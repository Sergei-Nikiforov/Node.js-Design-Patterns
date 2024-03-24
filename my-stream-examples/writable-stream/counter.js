const { Writable } = require('stream');

class Counter extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString());

        callback();
    }
}

const counter = new Counter({ highWaterMark: 2 });

// for(let i = 1; i < 1000; i += 1) {
//    counter.write(Buffer.from(`${i}`, 'utf8'));
    // const canWrite = counter.write(Buffer.from(`${i}`, 'utf8'));

    // console.log(`Can we write bunch of data? ${canWrite}`);
  
    // if (!canWrite) {
    //     events.once(counter, 'drain');
    //     console.log('drain event fired.');
    // }
// }

(async () => {
    for (let i = 1; i < 1000; i += 1) {
      const canWrite = counter.write(Buffer.from(`${i}`, 'utf8'));
  
      console.log(`Can we write bunch of data? ${canWrite}`);
  
      if (!canWrite) {
        await events.once(counter, 'drain');
        console.log('drain event fired.');
      }
    }
  })();
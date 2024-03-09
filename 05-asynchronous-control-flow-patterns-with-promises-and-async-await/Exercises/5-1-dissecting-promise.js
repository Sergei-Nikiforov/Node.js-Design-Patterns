function delayError (milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { reject(new Error(`Error after ${milliseconds}ms`)) }, milliseconds);
    });
}

function delay(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(new Date()); }, milliseconds);
    })
}

Promise.all = () => {
    const promises = [delay(10000), delay(5000), delayError(100)];
    return new Promise((resolve, reject) => {
        const results = [];
    
        if (!promises.length) {
            resolve(results);
            return;
        }
    
        let pending = promises.length;
    
        promises.forEach((promise, idx) => {
            Promise.resolve(promise).then((value) => {
                results[idx] = value;
                pending--;

                if (pending === 0) {
                    resolve(results);
                }
            }, reject);
        });
    });
};

Promise.all().then(data => console.log(data)).catch(err => console.log(`End!! ${err}`))

// ***************************************************************************************
// Promise.myAll = function (values) {
//     return new Promise((resolve, reject) => {
//         let results = [];
//         let completed = 0;

//         values.forEach((singlePromise, index) => {
//             singlePromise.then((res) => {
//                 results[index] = res;
//                 completed++;
//                 if (completed === values.length) resolve(results);
//             }).catch((e) => { reject(e); });
//         });
//     });
// };
  
//   function task(time) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => resolve(time), time);
//     });
//   }

//   function delayError (milliseconds) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => { reject(new Error(`Error after ${milliseconds}ms`)) }, milliseconds);
//     });
// }
  
//   const taskList = [task(1000), task(5000), task(3000), ];
  
// Promise.myAll(taskList).then(results => { console.log("got results", results); }).catch(console.error);
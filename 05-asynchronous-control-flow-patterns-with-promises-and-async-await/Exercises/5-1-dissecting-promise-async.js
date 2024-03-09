function delayError(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { reject(new Error(`Error after ${milliseconds}ms`)) }, milliseconds) 
    });
}

function delay(milliseconds) {
    return new Promise((resolve, reject) => { 
        setTimeout(() => { resolve(new Date()) }, milliseconds)
    })
}

async function processTasks() {
    return new Promise((resolve, reject) => {
        const promises = [delay(10000), delay(5000), delay(10000), delayError(200)];
        const results = [];
        
        if (!promises.length) {
            resolve(results);
            return;
        }
    
        let pending = promises.length;

        promises.forEach(async (promise, idx) => {
            try {
                results[idx] = await processOnePromise(promise);
                pending--;
    
                if (pending === 0) {
                    resolve(results);
                }
                
            } catch (e) {
                console.log(`processTasks_err!! ${e}`);
                reject(e);
            }
            
        }, )
    })
}

async function processOnePromise(promise) {
    return Promise.resolve(promise);
}

processTasks().then(data => console.log(data)).catch(data => console.log(`End!! ${data}`))
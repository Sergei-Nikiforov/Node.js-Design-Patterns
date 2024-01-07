function asyncOperation(cb) {
    process.nextTick(cb);
}

function task1(cb) {
    asyncOperation(() => {
        cb();
        console.log("Task 1 is done!!");
    });
}

function task2(cb) {
    asyncOperation(() => {
        cb();
        console.log("Task 2 is done!!");
    });
}

function task3(cb) {
    asyncOperation(() => {
        console.log("Last task start!!");
        cb();
        console.log("Last task end!!");
        console.log("Task 3 is done!!");
    });
}

export function tasks() {
    return [ task1, task2, task3 ];
}
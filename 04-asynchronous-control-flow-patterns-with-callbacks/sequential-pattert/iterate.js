import { tasks } from './tasks.js';

function iterate(index) {
    if (index === tasks().length) {
        return finish();
    }

    const task = tasks()[index];
    task(() => iterate(index + 1));
}

function finish() {
    console.log('Iteration completed!!');
}

iterate(0);

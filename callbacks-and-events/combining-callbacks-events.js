import { glob, Glob } from 'glob';

const g_event = new Glob('*.txt', { withFileTypes: true });
const g_async = await glob('*.txt', { withFileTypes: true });

g_event.stream().on('data', path => {
    console.log('g_event!!', path.fullpath(), path.isDirectory(), path.readdirSync().map(e => e.name));
})

g_async.map(el => console.log('g_async!!', el.name));
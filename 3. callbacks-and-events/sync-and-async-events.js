import { EventEmitter } from 'events';
import { readFileSync } from 'fs';

class FindRegex extends EventEmitter {
    constructor (regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile (file) {
        this.files.push(file);
        return this;
    }

    find () {
        for (const file of this.files) {
            let content;
            let match;
            try {
                content = readFileSync(file, 'utf8');
                process.nextTick(() => this.emit('fileread', file));
                match = content.match(this.regex);
            } catch (err) {
                this.emit('error', err);
            }

            
            if (match) {
                match.forEach(elem => this.emit('found', file, elem));
            }
        }

        return this;
    }

}

const findRegexInstance = new FindRegex(/hello \w+/);

findRegexInstance
    .addFile('fileA.txt')
    .addFile('fileB1.json')
    // this listener is invoked
    .on('found', (file, match) => console.log(`[Before] Matched "${match}"`))
    .on('error', err => console.error(`[Before] Error emitted ${err.message}`))
    .find()
    // this listener is never invoked
    .on('fileread', file => console.error(`File emitted ${file}`))
    .on('found', (file, match) => console.log(`[After] Matched "${match}"`))
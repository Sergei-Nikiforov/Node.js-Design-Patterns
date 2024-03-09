import { EventEmitter } from 'events';

function callbackAndEvents(inputMs, callback) {
    const eventEmitter = new EventEmitter();
    let count = 0;
    let msCount = 50;
    const stamp = Date.now();
    
    if (!(stamp % 5)) {
        process.nextTick(() => eventEmitter.emit('error_outer', stamp));
        callback(`[callback_outer] ${stamp} is divisible by 5`);
        return eventEmitter;
    };

    function repeatingFunc() {
        const stamp = Date.now();
        console.log('stamp!!', stamp, stamp % 5);

        if (inputMs / msCount < 1) return callback(`[callback_inner] number of tick events: ${count}`);
        if (inputMs < msCount) return callback(`[callback_inner] number of tick events: ${count}`);
        if (!(stamp % 5)) {
            process.nextTick(() => eventEmitter.emit('error_inner', stamp));
            return callback(`[callback_inner] ${stamp} is divisible by 5`);
        }

        console.log('msCount!!', inputMs, msCount);
        count++;
        msCount+=50;
        eventEmitter.emit('tick', count);

        repeatingFunc();
    }

    repeatingFunc();

    return eventEmitter;
    
}

callbackAndEvents(500, message => {console.log(message)})
.on('tick', tick => console.log('Event:', tick))
.on('error_outer', stamp => console.error(`[error_outer] ${stamp} is divisible by 5`))
.on('error_inner', stamp => console.error(`[error_inner] ${stamp} is divisible by 5`));

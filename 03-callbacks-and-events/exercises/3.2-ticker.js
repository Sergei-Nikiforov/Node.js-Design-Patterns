import { EventEmitter } from 'events';

function callbackAndEvents(inputMs, callback) {
    const eventEmitter = new EventEmitter();
    let count = 0;
    let msCount = 50;

    function repeatingFunc() {
        if (inputMs / msCount < 1) return callback(count);
        if (inputMs < msCount) return callback(count);

        console.log('msCount!!',inputMs, msCount);
        count++;
        msCount+=50;
        eventEmitter.emit('tick', count)

        setTimeout(repeatingFunc, 50);
    }

    setTimeout(() => repeatingFunc(), 50);

    return eventEmitter;
    
}

callbackAndEvents(500, count => {console.log('number of tick events: ', count )})
.on('tick', tick => console.log('Event:', tick));

import transform from 'parallel-transform';
 
const stream = transform(10, (data, callback) => { // 10 is the parallism level
    setTimeout(() => {
        console.log('data in stream', data);
        callback(null, data);
    }, Math.random() * 2000);
});
 
for (let i = 0; i < 10; i++) {
    stream.write(`${i}`);
}
stream.end();
console.log('end!!');
 
stream.on('data', data => {
    console.log('Listening data', data); // prints 0,1,2,...
});

stream.on('end', () => {
    console.log('stream has ended');
});
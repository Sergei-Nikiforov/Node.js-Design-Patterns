import { readFile } from 'fs';

function readJSONThrows(filename, callback) {
    readFile(filename, "utf8", (err, data) => {
        if (err) {
            return callback(err);
        }

        callback(null, JSON.parse(data));
    });
}

process.on('uncaughtException', (err) => {
    console.error(`'uncaughtException: ${err.message}`)
    // Terminates the application with 1 (error) as exit code.
    // Without the following line, the application would continue
    process.exit(1);
})
.on('unhandledRejection', (err) => {
    console.error(`'unhandledRejection: ${err.message}`)
})

nonexistentFunc();

try {
    readJSONThrows('invalid_json.json', (err, data) => console.error(err));
} catch (error) {
    console.log('This will NOT catch the JSON parsing exception');
}
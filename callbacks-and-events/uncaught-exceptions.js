import { readFile } from 'fs';

function readJSONThrows(filename, callback) {
    readFile(filename, "utf8", (err, data) => {
        if (err) {
            return callback(err);
        }

        callback(null, JSON.parse(data));
    });
}

try {
    readJSONThrows('invalid_json.json', (err, data) => console.error(err));
} catch (error) {
    console.log('This will NOT catch the JSON parsing exception');
}
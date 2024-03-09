import fs from 'fs';

const sourceFiles = ['fileA.txt', 'fileB.txt', 'fileC.txt'];
const destFile = 'destFile.txt';

function saveFile (filename, contents, cb) {
    fs.writeFile(filename, contents, cb);
}

function concatFiles(sourceFiles, destFile, cb) {
    let content = '';

    function iterate(index, content, cb) {
        if (index === sourceFiles.length) {
            saveFile(destFile, content, err => {
                if (err) return cb(err, null);
            })

            return cb(null, content);
        }
    
        const file = sourceFiles[index];
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) cb(err, null);
            content += data;
    
            iterate(index + 1, content, cb);
        })
    }
    
    iterate(0, content, cb);
}

concatFiles(sourceFiles, destFile, (err, data) => {
    if (err) return console.log(`Error!! ${ err }`);

    console.log(`Iteration completed!! ${ data }`);
})
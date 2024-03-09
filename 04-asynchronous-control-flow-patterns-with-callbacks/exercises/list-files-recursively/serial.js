// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

import fs from 'fs';
import path from 'path';

let walk = (dir, done) => {
  let results = [];

  fs.readdir(dir, (err, list) => {
    if (err) return done(err);

    let index = 0;

    function next() {
      let file = list[index++];

      if (!file) return done(null, results);

      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    };

    next();

  });
};

walk('../', (err, results) => {
    if (err) throw err;
    console.log(results);
});
// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

import fs from 'fs';
import path from 'path';

let walk = (dir, done) => {
  let results = [];

  fs.readdir(dir, (err, list) => {
    if (err) return done(err);

    let pending = list.length;

    if (!pending) return done(null, results);

    list.forEach(file => {
      file = path.resolve(dir, file);

      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });

  });
};

walk('../', (err, results) => {
    if (err) throw err;
    console.log(results);
});
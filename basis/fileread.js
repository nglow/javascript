const fs = require('fs');

fs.readFile('fileread-sample.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

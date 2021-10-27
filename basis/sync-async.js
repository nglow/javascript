const fs = require('fs');

// Sync
console.log('A')
const result = fs.readFileSync('./data/sample.txt', 'utf-8');
console.log(result);
console.log('B');

// Async
console.log('A')
fs.readFile('./data/sample.txt', 'utf-8', (err, result) => {
  if (err) console.log(err);
  console.log(result);
});
console.log('B');

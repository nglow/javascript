const http = require('http');
const fs = require('fs');
const url = require('url');

function template() {

}

const app = http.createServer((req, res) => {
  let query = url.parse(req.url, true).query;
  let pathname = url.parse(req.url, true).pathname;
  let title = query.id === undefined ? 'ANONYMOUS' : query.id.toUpperCase();

  if (pathname === '/') {
    fs.readFile(`./data/${title.toLowerCase()}.txt`, 'utf-8', (err, data) => {
      if (err) throw err;

      fs.readdir('./data', (error, fileList) => {
        console.log(fileList);

        let list = '<ol>';
        for (let file of fileList) {
          list += '<li>' + file + '</li>'
        }
        list += '</ol>';

        let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Title</title>
          <h1>Web</h1>
        </head>
        <body>
        ${list}
        <div>
          <h3>${title}</h3>
          <p>${data}</p>
        </div>
        </body>
        </html>`;

        res.writeHead(200);
        res.end(template);
      })
    });
  } else {
    res.writeHead(200);
    res.end('Not Found');
  }

});

app.listen(3000);

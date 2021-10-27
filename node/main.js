const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

function getTemplate(fileList) {
  let list = '<ol>';
  for (let file of fileList) {
    list += '<li>' + file + '</li>'
  }
  list += '</ol>';

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Title</title>
          <h1>Web</h1>
        </head>
        <body>
        ${list}
        `;
}

const app = http.createServer((req, res) => {
  let query = url.parse(req.url, true).query;
  let pathname = url.parse(req.url, true).pathname;
  let title = query.id === undefined ? 'ANONYMOUS' : query.id.toUpperCase();
  console.log(query.id);

  if (pathname === '/') {
    fs.readFile(`./data/${title.toLowerCase()}.txt`, 'utf-8', (err, data) => {
      if (err) throw err;

      fs.readdir('./data', (error, fileList) => {
        console.log(fileList);

        let temp = title === 'ANONYMOUS' ? '<a href="/create">create</a>' : `<a href="/update?id=${title}">update</a>
                                                                            <form action="/delete_process" method="post">
                                                                              <input type="hidden" name="id" value="${title}">
                                                                              <input type="submit" value="delete">
                                                                            </form>`;
        let template = getTemplate(fileList) + temp + `
          <div>
            <h3>${title}</h3>
            <p>${data}</p>
          </div>
          </body>
          </html>
        `;
        res.writeHead(200);
        res.end(template);
      })
    });
  } else if (pathname === '/create') {
    fs.readdir('./data', (error, fileList) => {
      console.log(fileList);

      let template = getTemplate(fileList) + `
        <form action="/create_process" method="post">
          <p>
        <!--    <label>-->
        <!--      What-->
              <input type="text" name="title" placeholder="title">
        <!--    </label>-->
          </p>
          <p>
        <!--    <label for="">What</label>-->
            <textarea name="description" placeholder="description" cols="30" rows="10"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`;

      res.writeHead(200);
      res.end(template);
    })
  } else if (pathname === '/create_process') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      console.log(post.title);
      console.log(post.description);
      fs.writeFile(`./data/${title}.txt`, description, 'utf-8', (err) => {
        res.writeHead(302, {Location: `/?id=${title}`});
        res.end();
      })
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', (error, fileList) => {
      fs.readFile(`./data/${query.id}.txt`, 'utf-8', (err, description) => {
        const title = query.id;
        console.log(query.id);
        let template = getTemplate(fileList) + `
        <form action="/update_process" method="post">
          <p>
        <!--    <label>-->
        <!--      What-->
            <input type="text" name="id" value="${title}" readonly hidden>
            <input type="text" name="title" placeholder="title" value="${title}">
        <!--    </label>-->
          </p>
          <p>
        <!--    <label for="">What</label>-->
            <textarea name="description" placeholder="description" cols="30" rows="10">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`;

        res.writeHead(200);
        res.end(template);
      });
    })
  } else if (pathname === '/update_process') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    })
    req.on('end', () => {
      const post = qs.parse(body);
      const id = post.id.toLowerCase();
      const title = post.title.toLowerCase();
      const description = post.description;
      fs.rename(`./data/${id}.txt`, `./data/${title}.txt`, (err) => {
        if (err) console.log(err);
        fs.writeFile(`./data/${title}.txt`, description, 'utf-8', (err) => {
          if (err) console.log(err);
          res.writeHead(302, {Location: `/?id=${title}`});
          res.end();
        });
      })
    })

  } else if (pathname === '/delete_process') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    })
    req.on('end', () => {
      const post = qs.parse(body);
      const id = post.id.toLowerCase();
      fs.unlink(`./data/${id}.txt`, (err) => {
        res.writeHead(302, {Location: `/`});
        res.end();
      })
    })
  } else {
    res.writeHead(200);
    res.end('Not Found');
  }
});

app.listen(3000);

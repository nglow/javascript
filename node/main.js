const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template')
const sanitizeHtml = require('sanitize-html')
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'database'
});
connection.connect();

const app = http.createServer((req, res) => {
  let query = url.parse(req.url, true).query;
  let pathname = url.parse(req.url, true).pathname;

  let id = Number(query.id);
  let title = '';
  let description = '';
  if (isNaN(id)) {
    title = 'anonymous';
    description = 'Welcome Page';
  }

  if (pathname === '/') {
    connection.query(`SELECT * FROM topic`, (error, topics) => {
      if (error) throw error;
      let temp = '';
      if (isNaN(id)) temp = '<a href="/create">create</a>'
      else {
        title = topics.filter(topic => topic.id === id)
          .map(topic => topic.title);
        description =  topics.filter(topic => topic.id === id)
          .map(topic => topic.description);
        temp = `<a href="/update?id=${title}">update</a>
                    <form action="/delete_process" method="post">
                      <input type="hidden" name="id" value="${title}">
                      <input type="submit" value="delete">
                    </form>`;
      }

      let html = template.html(topics.map(x => x.title)) + temp + `
          <div>
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
          </body>
          </html>
        `;
      res.writeHead(200);
      res.end(html);
    });
  } else if (pathname === '/create') {
    connection.query(`SELECT * FROM topic`, (error, topics) => {
      if (error) throw error;
      let html = template.html(topics.map(topic => topic.title)) + `
        <form action="/create_process?id=${id}" method="post">
          <p>
        <!--    <label>-->
        <!--      What-->
              <input type="text" name="title" placeholder="Title">
        <!--    </label>-->
          </p>
          <p>
        <!--    <label for="">What</label>-->
            <textarea name="description" placeholder="Description" cols="30" rows="10"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`;

      res.writeHead(200);
      res.end(html);
    })
  } else if (pathname === '/create_process') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      const post = qs.parse(body);
      const title = sanitizeHtml(post.title);
      const description = sanitizeHtml(post.description);
      console.log(post.title);
      console.log(post.description);
      console.log(Date.now());
      connection.query(`insert into topic (title, description, created, author_id) 
                            values (?, ?, NOW(), ?)`, [title, description, 3],
                      (error, result) => {
                        if (error) throw error;
                        console.log(result);
                        res.writeHead(302, {Location: `/?id=${result.insertId}`});
                        res.end();
                      })

      // fs.writeFile(`./data/${title}.txt`, description, 'utf-8', (err) => {
      //   res.writeHead(302, {Location: `/?id=${title}`});
      //   res.end();
      // })
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', (error, fileList) => {
      fs.readFile(`./data/${query.id}.txt`, 'utf-8', (err, description) => {
        const title = query.id;
        console.log(query.id);
        let html = template.html(fileList) + `
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
        res.end(html);
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
      const title = sanitizeHtml(post.title).toLowerCase()
      const description = sanitizeHtml(post.description).toLowerCase();
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

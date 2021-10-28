const http = require('http');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template')
const sanitizeHtml = require('sanitize-html')
const mysql = require('mysql');
const {auth} = require("mysql/lib/protocol/Auth");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});
connection.connect();

const app = http.createServer((req, res) => {
  let query = url.parse(req.url, true).query;
  let pathname = url.parse(req.url, true).pathname;

  let id = Number(query.id);
  let title = '';
  let description = '';
  let author = '';
  if (isNaN(id)) {
    title = 'Hi';
    description = 'Welcome Page';
    author = 'page owner'
  }

  if (pathname === '/') {
    connection.query(`SELECT t.id          as id,
                             t.title       as title,
                             t.description as description,
                             a.id          as author_id,
                             a.name        as author_name
                      FROM topic as t
                               inner join author as a on t.author_id = a.id`, (error, topics) => {
      if (error) throw error;
      let temp = '';
      if (isNaN(id)) temp = '<a href="/create">create</a>'
      else {
        title = topics.filter(topic => topic.id === id)
          .map(topic => topic.title);
        description = topics.filter(topic => topic.id === id)
          .map(topic => topic.description);
        author = topics.filter(topic => topic.id === id)
          .map(topic => topic.author_name);
        temp = `<a href="/update?id=${id}">update</a>
                <form action="/delete_process" method="post">
                  <input type="hidden" name="id" value="${id}">
                  <input type="submit" value="delete">
                </form>`;
      }
      let html = template.html(topics.map(x => x.id), topics.map(x => x.title)) + temp + `
          <div>
            <h3>${title}</h3>
            <p>${description}</p>
            <p>by ${author}</p>
          </div>
          </body>
          </html>
        `;
      res.writeHead(200);
      res.end(html);
    });
  } else if (pathname === '/create') {
    connection.query(`SELECT *
                      FROM topic`, (error, topics) => {
      if (error) throw error;
      connection.query(`select *
                        from author`, (error, authors) => {
        if (error) throw error;

        let tag = '';
        for (let i = 0; i < authors.length; i++) {
          tag += `<option value="${authors[i].id}">${authors[i].name}</option>`
        }
        let html = template.html(topics.map(x => x.id), topics.map(topic => topic.title)) + `
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
            <select name="author">
              ${tag}
            </select>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`;

        res.writeHead(200);
        res.end(html);
      })

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
      const authorId = post.author;
      connection.query(`insert into topic (title, description, created, author_id)
                        values (?, ?, NOW(), ?)`, [title, description, authorId],
        (error, result) => {
          if (error) throw error;
          console.log(result);
          res.writeHead(302, {Location: `/?id=${result.insertId}`});
          res.end();
        })
    });
  } else if (pathname === '/update') {
    connection.query(`SELECT *
                      FROM topic`, (error, topics) => {
      connection.query(`select *
                        from author`, (error, authors) => {
        if (error) throw error;
        let authorId = Number(topics.filter(topic => topic.id === id)
          .map(topic => topic.author_id));
        let tag = '';
        for (let i = 0; i < authors.length; i++) {
          if (authors[i].id === authorId)
            tag += `<option value="${authors[i].id}" selected>${authors[i].name}</option>`
          else
            tag += `<option value="${authors[i].id}">${authors[i].name}</option>`
        }

        const title = topics.filter(topic => topic.id === id)
          .map(topic => topic.title);
        const description = topics.filter(topic => topic.id === id)
          .map(topic => topic.description);
        let html = template.html(topics.map(x => x.id), topics.map(topic => topic.title)) + `
        <form action="/update_process" method="post">
          <p>
        <!--    <label>-->
        <!--      What-->
            <input type="text" name="id" value="${id}" readonly hidden>
            <input type="text" name="title" placeholder="title" value="${title}">
        <!--    </label>-->
          </p>
          <p>
        <!--    <label for="">What</label>-->
            <textarea name="description" placeholder="description" cols="30" rows="10">${description}</textarea>
          </p>
             <select name="author">
              ${tag}
            </select>
          <p>
            <input type="submit">
          </p>
        </form>`;

        res.writeHead(200);
        res.end(html);
      });

    });
  } else if (pathname === '/update_process') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    })
    req.on('end', () => {
      const post = qs.parse(body);
      const id = post.id.toLowerCase();
      const title = sanitizeHtml(post.title)
      const description = sanitizeHtml(post.description)
      const authorId = post.author
      connection.query(`update topic
                        set title = ?,
                            description = ?,
                            author_id = ?
                        where id = ?`, [title, description, authorId, id],
        (error, result) => {
          if (error) throw error;
          console.log(result);
          res.writeHead(302, {Location: `/?id=${id}`});
          res.end();
        })
    })
  } else if (pathname === '/delete_process') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    })
    req.on('end', () => {
      const post = qs.parse(body);

      connection.query(`delete
                        from topic
                        where id = ?`, [post.id],
        (error, result) => {
          if (error) throw error;
          res.writeHead(302, {Location: `/`});
          res.end();
        });
    })
  } else {
    res.writeHead(200);
    res.end('Not Found');
  }
});

app.listen(3000);

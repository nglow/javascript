const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World'));
app.get('/page', (req, res) => res.send('Hello World in /page'));

app.listen(port, () => console.log('Example app listening on port 3000'));


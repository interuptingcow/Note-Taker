const express = require("express");
const path = require('path');
const PORT = 3001;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/develop/public/notes.html'));
  });

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
const express = require("express");
const path = require('path');
const PORT = 3001;
const app = express();
const fs = require('fs');
const uuid = require('uuid');

app.use(express.static('develop/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

const showNotes = () => {
  const notes = fs.readFileSync(path.join(__dirname, "Develop/db/db.json"))
  return JSON.parse(notes);
}

const saveNote = (notes) => {
  fs.writeFileSync(path.join(__dirname, "Develop/db/db.json"), JSON.stringify(notes));
}
app.get("/api/notes", (req, res) => {
    let notes = showNotes();
    res.json(notes);
})

app.post("/api/notes", (req, res) => {
  const newNote = {...req.body, id:uuid.v4()};
  let notes = showNotes();
  notes.push(newNote);
  saveNote(notes);
  res.json(notes);
})

app.delete("/api/notes/:id", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
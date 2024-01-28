// Import required modules
const express = require("express");
const path = require('path');
const PORT = 3001; // Port number for the server
const app = express(); // Create an Express application
const fs = require('fs'); // File system module for interacting with the file system
const uuid = require('uuid'); // Module for generating unique identifiers (UUIDs)

// Middleware setup
app.use(express.static('develop/public')); // Serve static files from 'develop/public' directory
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded data with extended option

// Route to serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// Route to serve the notes HTML page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

// Function to read and show existing notes from the file
const showNotes = () => {
  const notes = fs.readFileSync(path.join(__dirname, "Develop/db/db.json")); // Read the JSON content of the file
  return JSON.parse(notes); // Parse and return the JSON data
}

// Function to save notes to the file
const saveNote = (notes) => {
  fs.writeFileSync(path.join(__dirname, "Develop/db/db.json"), JSON.stringify(notes)); // Write JSON representation of notes to the file
}

// API endpoint to get existing notes
app.get("/api/notes", (req, res) => {
  let notes = showNotes(); // Retrieve existing notes
  res.json(notes); // Send the list of notes in JSON format
})

// API endpoint to add a new note
app.post("/api/notes", (req, res) => {
  const newNote = { ...req.body, id: uuid.v4() }; // Create a new note with a unique identifier
  let notes = showNotes(); // Retrieve existing notes
  notes.push(newNote); // Add the new note
  saveNote(notes); // Save the updated notes to the file
  res.json(notes); // Send the updated list of notes in JSON format
})

// API endpoint to delete a note by ID
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id; // Get the ID of the note to be deleted
  const notes = showNotes(); // Retrieve existing notes
  const updateNotes = [];

  // Iterate through existing notes and exclude the one to be deleted
  for (const note of notes) {
    if (note.id !== noteId) {
      updateNotes.push(note);
    }
  }

  saveNote(updateNotes); // Save the updated notes to the file
  res.json(updateNotes); // Send the updated list of notes in JSON format
})

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
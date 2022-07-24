const { v4: uuidv4 } = require('uuid');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { notesArray }  = require ('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const newNote = (body, notesArray) => {
    const noteToAdd = body;
    notesArray.push(noteToAdd);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({notesArray}, null, 2)
    )
    return noteToAdd
}

const deleteNote = (noteToRemove, notesList) => {
    let indextoSplice = notesList.findIndex(noteList => noteList.id === noteToRemove)
    notesArray.splice(indextoSplice, 1)
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({notesArray}, null, 2)
    )
}

app.get("/api/notes", (req, res) => { // gets existing notes listed in left hand column
    let storedNotes = notesArray
    res.json(storedNotes)
})

app.post("/api/notes", (req,res) => { // adds new note to db.json when using save button
    req.body.id = uuidv4()
    const note = newNote(req.body, notesArray)
    res.json(note)
})

app.delete("/api/notes/:id", async (req, res) => {
    let { id } = req.params
    const removedNotes = await deleteNote(id, notesArray)
    res.json(removedNotes)
})

app.get("/", (req, res) => { // gets index.html for landing page THEN I am presented with a landing page with a link to a notes page
    res.sendFile(path.join(__dirname, "./public/index.html)"));
});

app.get("/notes", (req, res) => { // gets notes.html for /notes path 
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
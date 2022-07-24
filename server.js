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

// id = () => uuidv4() //testing uuid
// console.log(id())

// 
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column --> probably needs db.json
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page ---> it already does that wym
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

const newNote = (body, notesArray) => {
    const noteToAdd = body;
    notesArray.push(noteToAdd);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({notesArray}, null, 2)
    )
    return noteToAdd
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

app.patch("/api/notes/:id", (req,res) => {
    //idk what im doing here ill fix this
    const findNote = notesArray.find(findNote.id == req.params.id)
    if (!findNote) return res.sendStatus(404);
    findNote.completed = !findNote.completed;
    res.json(findNote)
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
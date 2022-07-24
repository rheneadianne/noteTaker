const fs = require('fs');
const path = require('path')
const { notesArray }  = require ('./../db/db.json')

const newNote = (body, notesArray) => { //adds new note based on body
    const noteToAdd = body;
    notesArray.push(noteToAdd);
    fs.writeFileSync(
        path.join(__dirname, "./../db/db.json"),
        JSON.stringify({notesArray}, null, 2)
    )
    return noteToAdd
}

const deleteNote = (noteToRemove, notesList) => {
    let indextoSplice = notesList.findIndex(noteList => noteList.id === noteToRemove) // finds index in array of note with that id
    notesArray.splice(indextoSplice, 1) //removes note from array
    fs.writeFileSync(
        path.join(__dirname, "./../db/db.json"),
        JSON.stringify({notesArray}, null, 2)
    )
}

module.exports = {
    newNote,
    deleteNote
}
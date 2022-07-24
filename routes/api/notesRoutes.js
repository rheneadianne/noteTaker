const router = require('express').Router();
const { newNote, deleteNote} = require("./../../lib/noteslib.js")
const { notesArray }  = require ('./../../db/db.json')
const { v4: uuidv4 } = require('uuid');

router.get("/notes", (req, res) => { // gets existing notes listed in left hand column
    let storedNotes = notesArray
    res.json(storedNotes)
})

router.post("/notes", (req,res) => { // adds new note to db.json when using save button
    req.body.id = uuidv4()
    const note = newNote(req.body, notesArray)
    res.json(note)
})

router.delete("/notes/:id", async (req, res) => { // deletes selected notes
    let { id } = req.params
    const removedNotes = await deleteNote(id, notesArray)
    res.json(removedNotes)
})

module.exports = router;
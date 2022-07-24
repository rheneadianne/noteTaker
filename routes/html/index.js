const path = require('path');
const router = require('express').Router();

router.get("/", (req, res) => { // gets index.html for landing page THEN I am presented with a landing page with a link to a notes page
    res.sendFile(path.join(__dirname, "./../../public/index.html"));
});

router.get("/notes", (req, res) => { // gets notes.html for /notes path 
    res.sendFile(path.join(__dirname, "./../../public/notes.html"));
  });

module.exports = router;
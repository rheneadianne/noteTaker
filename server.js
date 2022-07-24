const { v4: uuidv4 } = require('uuid');
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

id = () => uuidv4() //testing uuid
console.log(id())


app.get("/", (req, res) => { // gets index.html for landing page
    res.sendFile(path.join(__dirname, "./public/index.html)"));
});

app.get("/notes", (req, res) => { // gets notes.html for /notes path
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
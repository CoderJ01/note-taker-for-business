const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

app.use(express.static('public'));

// __dirname indicates absolute path
app.get('/', (req, res) => {
    res.sendFile(__dirname, '/public/index.html');
});

// // GET request for notes
// app.get('/api/notes', (req, res) => {
//     res.json(`${res.method} request received to get a single note`);
// });

// POST request to add notes
app.post('/api/notes', (req, res) => {
    //Log that post was received
    console.info(`${res.method} request received to add a new note`);

    //create parameter to store notes
    const notes = req.body;

    // If notes are present, store in an object
    if(notes) {
        const newNote = {
            title, 
            text
        }

        // convert data into a string
        const stringNote = JSON.stringify(newNote);

        // write string into a file
        fs.writeFile('/db/db.json', stringNote, (error) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log(`Note for ${newNote.title} has been written in the JSON file`);
            }
        });

        const response = {
            status: 'Success!',
            body: newNote
        }

        console.log(response);
        res.json(response);
    }
    else {
        res.json('Error in posting note');
    }
});
const router = require('express').Router();
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote

} = require('../../lib/notes');
let { notes } = require('../../db/db');

// send a request to get the notes
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.body) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// send a request to look for the notes by id
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

// send a request to create a new note if validation is confirmed
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted');
    }
    else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// delete the note
// DISCLAIMER: In order for the notes to delete, another one must be add afterwards for the deleted
// ones to stay gone
// if user does not add a note right after deleting the unwanted note,
// then notes will reappaer when the system is restarted (via 'npm start')
// This bizarre issue shall be fixed soon
router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    const deleted = notes.find(note => note.id === id);
    if (deleted) {
        notes = notes.filter(note => note.id !== id);
        res.status(200).json(deleted);
    }
    else {
        res.status(404).json.apply({ message: "Note you are looking for does not exist"});
    }
    console.log(deleted);
    console.log(notes);
    
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return notes;    
});

module.exports = router;
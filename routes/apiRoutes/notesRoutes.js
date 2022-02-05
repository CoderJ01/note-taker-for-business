const router = require('express').Router();
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote

} = require('../../lib/notes');
let { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.body) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

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

router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    const deleted = notes.filter(note => note.id === id);
    if (deleted) {
        notes = notes.filter(note => note.id !== id);
        location.reload();
    }
    else {
        res.status(404).json.apply({ message: "Note you are looking for does not exist"});
    }
});

module.exports = router;
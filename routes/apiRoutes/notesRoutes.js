const router = require('express').Router();
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote

} = require('../../lib/notes');
const { notes } = require('../../db/db.json');

router.get('/note,', (res, req) => {
    let results = notes;
    if (req.body) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/note:id', (req, res) => {
    const result = findById(req.parameters.id, notes);
    if (result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

router.post('/note', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted');
    }
    else {
        const note = createNewNote(req.body, notes);
    }
});
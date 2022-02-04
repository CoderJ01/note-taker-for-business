const fs = require('fs');
const path = require('path');

var filterByQuery = (query, notes) => {
    let filteredResults = notes;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }

    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }

    return filteredResults;
}

var findById = (id, notes) => {
    const result = notes.filter(note => note.id === id)[0];
    return result;
}

var createNewNote = (body, notes) => {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return note;
}

var validateNote = (note) => {
    if (!note.title || typeof note.title !== "String") {
        return false;
    }

    if (!note.text || typeof note.text !== "String") {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
}
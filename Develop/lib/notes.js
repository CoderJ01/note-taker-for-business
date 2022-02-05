const fs = require('fs');
const path = require('path');

// filter the results
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

// create a unique id for each note
var findById = (id, notes) => {
    const result = notes.filter(note => note.id === id)[0];
    return result;
}

// create a new note
var createNewNote = (body, notes) => {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return note;
}

// validate the title and text of each note
// save button will not appear unless user puts both title and name
var validateNote = (note) => {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }

    if (!note.text || typeof note.text !== "string") {
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
const fs = require('fs');
const path = require('path');


var filterByQuery = (query, note) => {
    let filteredResults = note;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }

    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }

    return filteredResults;
}

var findById = (id, note) => {
    const result = note.filter(note => note.id === id)[0];
    return result;
}

var createNewNote = (body, note) => {
    const note = body;
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json')
        // JSON.stringify({ title }, null, 2)
    );
    return title;
}

var validateTitle = (title) => {
    if (!title.text || typeof title.text !== "String") {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateTitle
}
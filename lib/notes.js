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
        //JSON.stringify({ note }, null, 2)
    );
    return note;
}

var validateNote = (note) => {
    if (!note.title || typeof title.title !== "String") {
        return false;
    }

    if (!note.text || typeof title.note !== "String") {
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
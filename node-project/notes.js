//console.log('Starting notes.js');

const fs = require('fs');

// module.exports.age = 100;

// module.exports.addNote = function ( ) {
//   console.log('addNote');
//   return 'New note';
// };

// module.exports.add = function (a, b) {
//   return a + b;
// };

// var addNote = function () {
//
// };

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title: title,
    body: body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var readNote = notes.filter((note) => note.title === title);
  return readNote.length === 0 ? null : readNote[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var notesToKeep = notes.filter((note) => note.title !== title);
  saveNotes(notesToKeep);
  return notes.length !== notesToKeep.length;
};

module.exports = {
  addNote: addNote,
  getAll: getAll,
  getNote: getNote,
  removeNote: removeNote,
  logNote: function (note) {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  }
};

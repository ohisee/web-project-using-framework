//console.log('Starting app');

const fs = require('fs');
//const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

//var res = notes.addNote();
// console.log(_.isString(true));
// console.log(_.isString('string'));
// console.log(_.uniq([1, 2, 1, 1, 'a', 'A']));

//console.log('Result: ', notes.add(9, -2));

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `hello project created by ${user.username} exported age ${notes.age}`, function(error) {
//   if (error) {
//     console.log('Unable to write to file');
//   }
// });

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
//var command = process.argv[2];
var command = argv._[0];
// console.log('Command:', command);
// console.log('Command:', process.argv);
// console.log('Command:', argv);

if (command === 'add') {
  //console.log('Adding new note');
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('note created');
    notes.logNote(note);
  } else {
    console.log('note title taken');
  }
} else if (command === 'list') {
  //console.log('Listing all notes');
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  //console.log('Reading note');
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('note found');
    notes.logNote(note);
  } else {
    console.log('note not found');
  }
} else if (command === 'remove') {
  //console.log('Removing note');
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}

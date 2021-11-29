const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const command = process.argv[2]

yargs.version('1.0.0')

yargs.command({
    command: 'add',
    describe: 'adding a new note',
    builder: {
        title: {
            describe: 'note\'s title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note\'s content',
            demandOption: true,
            type: 'string'
        }
    },  
    handler(argv) {
       notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'read',
    description: 'reading the note',
    builder: {
        title: {
            description: 'title for the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})


yargs.command({
    command: 'remove',
    describe: 'removing a new note',
    builder: {
        title: {
            describe: 'note\'s title',
            demandOption: true,
            type: 'string'    
        }
    }, 
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    description: 'listing the notes',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()


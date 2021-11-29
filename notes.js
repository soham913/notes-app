const fs = require('fs');
const chalk = require('chalk');
const { green } = require('chalk');

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title,body) => {
    const notes = loadNotes()

    let duplicateNotes = notes.filter((note) => note.title === title)

    duplicateNotes.length === 0 ? (() => {
        notes.push({
            title,
            body
        })
            console.log(chalk.green.inverse('Note added!'));
    })() : console.log(chalk.red.inverse('Title taken!'));

    saveNote(notes)
}

const loadNotes = () => {
    try {
        const allNotes = fs.readFileSync('notes.json');
        const allParsedNotes = JSON.parse(allNotes);
        return allParsedNotes;
    } catch(e) {
        return [];
    }
}

const saveNote = (notes) => {
    const parsedData = JSON.stringify(notes)
    fs.writeFileSync('notes.json', parsedData)
}

const removeNote = (title) => {
    let notes = loadNotes();
    const newNotes = notes.filter(function(note) {
        return note.title !== title
    })
    if(newNotes.length > 0)
        console.log(chalk.green('Note Removed!'))
    else
        console.log(chalk.red('Note not found!'))
    saveNote(newNotes)
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note)
    {
        console.log(chalk.inverse(`${note.title}`));        
        console.log(`${note.body}`);
    }    
    else
        console.log(chalk.red.inverse('No note found!'));
}

module.exports = { getNotes, listNotes, addNote, removeNote, readNote };
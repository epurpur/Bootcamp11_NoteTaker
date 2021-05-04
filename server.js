/**
 * Main server module
 */

const express = require('express');
const path = require('path');
const fs = require('fs');


//read notes data from db.json
let notes = fs.readFileSync('./db/db.json');
notes = JSON.parse(notes);


const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));  //loads static css resource



/********/
/*Routes*/
/********/

//GET data from database
//Homepage
app.get('/', (request, response) => response.sendFile(path.join(__dirname, './public/index.html')));   //sends html file upon request

//Notes Page
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, './public/notes.html')));   //sends html file upon request

//api view of notes
app.get('/api/notes', (request, response) => response.json(notes));   //sends json data of notes upon request

//POST Data to database
app.post('/api/notes', (request, response) => {

    //add object to notes array
    const newNote = request.body

    //log data in console
    console.log("Adding Note: ", newNote);

    //add data to notes array
    notes.push(newNote);

    response.end();
});


//DELETE Data from database
app.delete('/api/notes/:id', (request, response) => {

    const selectedNoteID = request.params.id;
    console.log(`Removing item with id: ${selectedNoteID}`);

    // //remove item from notes array
    notes = notes.filter(note => note.id != selectedNoteID);

    response.end();
});

//makes app go
app.listen(PORT, () => console.log(`Note Taker app listening on PORT: ${PORT}`));
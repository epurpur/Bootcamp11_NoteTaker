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
app.get('/', (request, response) => response.sendFile(path.join(__dirname, './public/index.html')));

//Notes Page
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, './public/notes.html')));

//view all notes
app.get('/api/view', (request, response) => response.json(notes));

//api view of notes
app.get('/api/notes', (request, response) => response.json(notes));


//POST Data to database
app.post('/api/notes', (request, response) => {

    //add object to notes array
    const newNote = request.body

    //log data in console
    console.log(newNote);

    //add data to notes array
    notes.push(newNote);

    response.end();
});


//DELETE Data from database
app.delete('/api/notes/:id', (request, response) => {

    const selectedNoteID = request.params.id;
    console.log(`Removing item with id: ${selectedNoteID}`);


    // //remove item from notes array
    // notes.forEach((item) => {
    //     if (item.id === selectedNoteID) {
    //         console.log(item);
    //         notes.splice(item, 1);
    //     }
    // });


    response.end();
});

//makes app go
app.listen(PORT, () => console.log(`Note Taker app listening on PORT: ${PORT}`));
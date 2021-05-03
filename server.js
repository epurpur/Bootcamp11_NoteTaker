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

//this is where I read data in from db.json file
//TODO

/********/
/*Routes*/
/********/

//Homepage
app.get('/', (request, response) => response.sendFile(path.join(__dirname, './public/index.html')));

//Notes Page
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, './public/notes.html')));

//view all notes
app.get('/api/view', (request, response) => response.json(notes));




//makes app go
app.listen(PORT, () => console.log(`Note Taker app listening on PORT: ${PORT}`));
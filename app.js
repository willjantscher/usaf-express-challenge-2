//to initialize
    //npm init
    //npm install express
//node app.js to run


const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//input json
const students = require('./students.json')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//code for handling requests

app.get('/students', (req, res) => {
    res.send(students)
})
// GET http://localhost:3016/students

app.get('/students/search', (req, res) => {
    let name = req.query.name;
    //console.log(name);
    let student = students.find(student => student.name === name);
    res.send(student);
})
// GET http://localhost:3016/students/?name=Bob




const port = 3016
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




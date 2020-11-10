//to initialize
    //npm init
    //npm install express
//node app.js to run


const express = require('express')
const app = express()
const bodyParser = require('body-parser')   //allows you to parse through requests

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
    console.log(name);
    let results = students.filter(student => student.name === name);
    res.send(results);
})
// GET http://localhost:3016/students/search?name=Jane

app.get('/students/:studentId', (req, res) => {
    let id = req.params.studentId;
    //console.log(id);
    let result = students.find(student => student.id === parseInt(id))
    res.send(result);
})
// GET http://localhost:3016/students/1

app.get('/grades/:studentId', (req, res) => {
    let id = req.params.studentId;
    // console.log(id);
    let student = students.find(student => student.id === parseInt(id));
    console.log(student)
    res.send(student.grades)
})
// GET http://localhost:3016/grades/1

//could just pass id in as part of the body, and them post to db as that. did this way to experiment
app.post('/grades/:studentID', (req, res) => {
    let {grades} = req.body;
    let id = req.params.studentID;
    //let input = [req.body, "id": studentID]
    //console.log(id)
    console.log(req.body)
    if(grades && id) {
        //students.push(req.body)   //would do this if we passed in student id with req.body
        result = { status: "Success", message: "The grades have been posted" }
    } 
    else {
        result = { status: "Failed", message: "The grades have not been posted" }
        res.status(400);
    }
    res.json(result)
})
// POST http://localhost:3016/grades/1
// {
//     "grades": 
//     {
//         "Math": "B",
//         "History": "C"
//     }
// }

app.post('/register', (req, res) => {
    let {name, id, grades} = req.body;
    //console.log(req.body)
    if(name && id && grades) {
        students.push(req.body)
        result = { status: "Success", message: "The student has been registered" }
    } 
    else {
        result = { status: "Failed", message: "The student has not been registered" }
        res.status(400);
    }
    res.json(result)
})
// POST http://localhost:3016/register
// {
//     "name": "Will",
//     "id": 14,
//     "grades": {
//         "Math": "A",
//         "English": "A"
//     }
// }


const port = 3016
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id: 1 , name: "course1"},
    {id: 2 , name: "course2"},
    {id: 3 , name: "course3"},
];

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.query);
});

app.post('/api/courses', (req,res) => {
    
    //schema defines the type of our object
    const {error} = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

/*app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course is not found with the given ID');
    res.send(course);

});*/

//Inserting a course
app.put('/api/courses/:id', (req,res) => {
    
    //Find the course that we have to update
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course is not found with the given ID');
    

    //Validate
    //If invalid return error 400 - Bad request
    const {error} = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;
    res.send(course);
    //Return the updated course
});

//updating resources
app.put('/api/courses/:id', (req,res) => {
    
    //Find the course that we have to update we exit
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course is not found with the given ID');
    

    //Validate
    //If invalid return error 400 - Bad request we exit 
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;
    res.send(course);
    //Return the updated course
});

//updating resources
app.delete('/api/courses/:id', (req,res) => {
    
    //Find the course that we have to update we exit
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course is not found with the given ID');
    

    //Delete
    //If invalid return error 400 - Bad request we exit 
    const index = courses.indexOf();
    courses.splice(index,i);

    //Return the deleted course
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}

// for the deployment i use enviroment variable to set the port
//i use process.env that is the enviroment variable for the process
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port `+port));
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name: 'Course1'},
    {id:2, name: 'Course2'},
    {id:3, name: 'Course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with given ID was not found.');
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    //if not existing, return 404
    if (!course){
        res.status(404).send('This course with given ID was not found.');
    }

    //Validate
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    //if invalid, return 400
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };

    //Update course
    course.name = req.body.name;

    //return the updated course
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return   Joi.validate(req.body, schema);

    //if invalid, return 400
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
}


const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id:1, name: 'Course1'},
    {id:2, name: 'Course2'},
    {id:3, name: 'Course3'}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with given ID was not found.');
    }
    res.send(course);
});

router.post('/', (req, res) => {
    const {error} = validateCourse(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with given ID was not found.');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return   Joi.validate(course, schema);
};


module.exports = router;
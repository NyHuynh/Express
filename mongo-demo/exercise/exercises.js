const mongoose = require('mongoose');

//connect
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.err('Could not connect to MongoDB...'))

//create a schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
})

//create model
const Course = mongoose.model('Course', courseSchema);

//EX1:
//get all published backend courses, sort by name, display name and author
async function getCourses1() {
    return await Course
        .find({isPublished: true, tags:'backend'})
        .sort({name: 1})
        .select('name author')
        // .count();
}

/* EX2:
get all published frontend and backend courses,
sort by price in descending order, display name and author  */
async function getCourses2(){
    return await Course
    .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
    // .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort('-price')
    .select('name author price')
}

/* EX3:
get all the published courses that are $15 or more,
or have the world 'by' in title
 */
async function getCourses3(){
    return await Course
        .find({isPublished: true})
        .or([
            { price: { $gte: 15 } }, 
            { name: /.*by.*/i }
        ])
        .sort('-price')
        .select('name author price')
}




//run
async function run(){
    const courses = await getCourses3();
    console.log(courses);
}

run();

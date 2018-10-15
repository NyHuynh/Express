const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.err('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tag: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean    
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tag: ['Angular', 'frontend'],
        isPublished: true
    });
    const result = course.save();
    console.log(result);    
}

async function getCourse(){
    const courses = await Course
    .find({author: 'Mosh', isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tag: 1});
    console.log(courses);
}

// getCourse();



async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set: {
            isPublished: false,
            author: 'Ny Huynh'
        }
    });

    console.log(course);
}

// updateCourse('5bc3ff7e6171e129d40fd857');

async function removeCourse(id){
    const course = await Course.findByIdAndRemove(id);

    console.log(course);
}

removeCourse('5bc3ff7e6171e129d40fd857');



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
async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tag: ['Node', 'backend'],
        isPublished: true
    });
    
    const result = course.save();
    console.log(result);    
}
createCourse();
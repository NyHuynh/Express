
const config = require('config');
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require('express');
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('Public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

app.set('view engine', 'pug');
app.set('views', './views');

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(logger);


app.use(function(req, res, next) {
    console.log('Authentication...');
    next();
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



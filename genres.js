const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/genre')
    .then(() => { console.log('Connected to MongoDB...') })
    .catch(() => { console.log('Could not connect to MongoDB.') })

// const genres = [
//   { id: 1, name: 'Action' },  
//   { id: 2, name: 'Horror' },  
//   { id: 3, name: 'Romance' },  
// ];

const genreSchema = new mongoose.Schema({
    name: {
        // required: true,
        // minlength: 5,
        // maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

app.get('/api/genres', async (req, res) => {
    const genre = await Genre.find().sort('name');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name });
    genre.save();

    res.send(genre);
});

app.put('/api/genres/:id', async(req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name, new: true});
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

app.delete('/api/genres/:id', async (req, res) => {
    const genre = Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

app.get('/api/genres/:id', async (req, res) => {
    const genre = Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
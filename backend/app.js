const express = require('express');
const app = express();

const mongoose = require('mongoose');

//Models
const Category = require('./models/Category');


//Db connection
const dbCredentials = require('../dbCredentials');
mongoose.connect(`mongodb+srv://car_rent_admin:${dbCredentials.dbPassword}@cluster0.pkvplib.mongodb.net/`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée : ', error));

//Allow app to read body request
app.use(express.json());

//Routes
app.post('/api/categories', (req, res, next) => {
    delete req.body._id;
    const category = new Category({
        ...req.body
    });

    category.save()
        .then(() => res.status(200).json({message: 'Category saved'}))
        .catch(error => res.status(400).json({error}))
})

app.get('/api/categories', (req, res, next) => {
    Category.find()
      .then(categories => res.status(200).json(categories))
      .catch(error => res.status(400).json({ error }));
  });

app.get('/api/categories/:id', (req, res, next) => {
    Category.findOne({_id: req.params.id})
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(404).json({ error }));
});

app.delete('/api/categories/:id', (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Category deleted'}))
      .catch(error => res.status(404).json({ error }));
});

app.put('/api/categories/:id', (req, res, next) => {
    Category.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Category updated'}))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbCredentials = require('../dbCredentials');

mongoose.connect(`mongodb+srv://car_rent_admin:${dbCredentials.dbPassword}@cluster0.pkvplib.mongodb.net/`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée : ', error));

app.use(express.json());


module.exports = app;
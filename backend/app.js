const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path: '../.env'});

const mongoose = require('mongoose');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');


//Db connection
mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PWD}@cluster0.pkvplib.mongodb.net/`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée : ', error));

//Allow app to read body request
app.use(express.json());

//Routes
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
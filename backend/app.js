const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const helpers = require('./helpers');
const swaggerUi = require('swagger-ui-express');
const app = express();

const port = helpers.normalizePort(process.env.PORT || '3000');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Car Rent',
      description: 'Learning Campus Car Rent API documentation',
      contact: {
        name: 'MBrillaud'
      },
      servers: [`http://localhost:${port}`]
    },
    schemes: ['http', 'https'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./routes/*.js"]
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

dotenv.config({path: '../.env'});

const mongoose = require('mongoose');

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


//Db connection
mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PWD}@cluster0.pkvplib.mongodb.net/`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée : ', error));

//Allow app to read body request
app.use(express.json());

app.use(cors());

//Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/auth', usersRoutes);
app.use('/api/orders', ordersRoutes);

module.exports = app;
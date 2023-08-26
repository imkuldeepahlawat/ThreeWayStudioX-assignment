const mongoose = require('mongoose');
require('dotenv').config();

const { app, server } = require('./app'); // Importing app and server from app.js

const mongoDbUrl = process.env.MONGODB_URL;
const port = process.env.PORT;
let mongoConnection;

mongoose.connect(mongoDbUrl)
  .then(() => {
    console.log('MongoDb is connected');
    mongoConnection = mongoose.connection;

    server.listen(port, () => {
      console.log('Server is listening on', port);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

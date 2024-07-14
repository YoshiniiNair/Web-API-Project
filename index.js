require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connect = require('./connection');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

const moviesRouter = require('./route/movies');
app.use('/movies', moviesRouter);


// Start the server
const startServer = async () => {
    await connect();
    /*
    app.listen(3000, () => console.log('Server started'));
    */
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  };
  
  startServer();
// Start the server ended
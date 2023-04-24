const cors = require('cors');
module.exports = (app) => {
  app.use(cors({
    //set origin to the frontend url
    origin: 'http://localhost:3000',
    // allow the following methods
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allow the following headers
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
};








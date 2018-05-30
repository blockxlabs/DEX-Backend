// Declare Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import Models
import models from './models';

// Initialize express
const app = express();
app.use(cors({ origin: 'http://localhost:8000' }));
app.use(bodyParser.json());

// Run server
models.sequelize.sync({}).then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 8000...');
  });
});

// Declare Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import Models
import models from './models';
import coinOrder from './models/coinOrder';
import coinOrderType from './models/coinOrderType';
import { EHOSTUNREACH } from 'constants';
import product from './models/product';

// Initialize express
const app = express();
const allowedOrigins = ['http://localhost:8000'];
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  }),
);

app.use(bodyParser.json());

models.CoinOrder.belongsTo(models.User);
models.CoinOrder.belongsTo(models.Product);
models.CoinOrder.belongsTo(models.CoinOrderType);

// Run server
models.sequelize.sync({}).then(() => {
  app.listen(8000, () => {
    console.log('Server is running on port 8000...');
  });
});

// create a user
app.post('/api/users', (req, res) => {
  User.create(req.body).then(user => res.json(user));
});

app.get('/api/users', (req, res) => {
  models.User.findAll().then(users => res.json(users));
});

// find orders belonging to one user or all orders
app.get('/api/orders/:userId?', (req, res) => {
  let query;
  if (req.params.userId) {
    query = models.CoinOrder.findAll({
      include: [
        {
          model: models.CoinOrderType,
        },
        { model: models.Product },
      ],
      where: { userId: req.params.userId },
    });
  } else {
    query = models.CoinOrder.findAll();
  }
  return query.then(orders => res.json(orders));
});

// find orders belonging to one user or all orders
app.get('/api/products', (req, res) => {
  let query = models.Product.findAll();

  return query.then(products => res.json(products));
});

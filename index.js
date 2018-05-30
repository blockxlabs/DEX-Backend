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
app.use(cors({ origin: 'http://localhost:8000' }));
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

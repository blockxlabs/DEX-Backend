// Using express: http://expressjs.com/

var express = require('express');
var mysql = require('mysql2');
var cors = require('cors');
var app = express();
var server = app.listen(8000);
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));

// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
// This is how we'll load data
var fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blockx_dex',
});
connection.connect(err => {
  if (err) throw err;
  console.log('Connected!');
});

// Route for getting all the product
app.get('/products', productList);

// Callback
function productList(req, res, next) {
  connection.query(
    'SELECT product.Id,product.name,product.logo,stock.quantity, product.price FROM `product` join stock on product.Id = stock.Product_Id',
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    },
  );
}

// Route for getting all the product
app.get('/orders/:user_id', orderList);

// Callback
function orderList(req, res, next) {
  var user_id = Number(req.params.user_id);
  connection.query(
    'SELECT order_coin.*, product.name,product.logo from order_coin join product on product.Id = order_coin.Product_Id where User_Id =?',
    [user_id],
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    },
  );
}

app.post('/purchase', urlencodedParser, purchase);

function purchase(req, res, next) {
  console.log('posting');
  var id = req.body.Product_Id;
  connection.query(
    'select * from stock WHERE Product_Id = ?',
    [id],
    (err, result) => {
      if (err) throw err;
      var stock = result[0].quantity;

      if (stock > req.body.Quantity) {
        const order = {
          User_Id: req.body.User_Id,
          Product_Id: req.body.Product_Id,
          Quantity: req.body.Quantity,
          Order_Type: 1,
          price: req.body.price,
        };

        stock = stock - req.body.Quantity;
        console.log(stock);
        connection.query(
          'UPDATE stock SET quantity = ?  Where Product_Id = ?',
          [stock, id],
          (err, result) => {
            if (err) throw err;
            console.log('Updated');
          },
        );

        connection.query(
          'INSERT INTO order_coin SET ?',
          order,
          (err, result) => {
            if (err) throw err;

            res.send('buy');
          },
        );
      }
    },
  );
}

app.post('/sell', urlencodedParser, purchase);

function purchase(req, res, next) {
  console.log('posting');
  var id = req.body.Product_Id;
  connection.query(
    'select * from stock WHERE Product_Id = ?',
    [id],
    (err, result) => {
      if (err) throw err;
      var stock = result[0].quantity;

      const order = {
        User_Id: req.body.User_Id,
        Product_Id: req.body.Product_Id,
        Quantity: req.body.Quantity,
        Order_Type: 2,
        price: req.body.price,
      };

      stock = stock + req.body.Quantity;
      console.log(stock);
      connection.query(
        'UPDATE stock SET quantity = ?  Where Product_Id = ?',
        [stock, id],
        (err, result) => {
          if (err) throw err;
          console.log('Updated');
        },
      );

      connection.query('INSERT INTO order_coin SET ?', order, (err, result) => {
        if (err) throw err;

        res.send('sell');
      });
    },
  );
}

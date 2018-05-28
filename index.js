// Using express: http://expressjs.com/

var express = require('express');
var mysql = require('mysql');
const cors = require('cors');
var app = express();
var server = app.listen(8080);
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

// Declare User ID
var user_id = 1;

// Route for getting all the product
app.get('/products', productList);

// Callback
function productList(req, res, next) {
  connection.query(
    'SELECT product.Id,product.name,product.logo,stock.quantity FROM `product` join stock on product.Id = stock.Product_Id',
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    },
  );
}

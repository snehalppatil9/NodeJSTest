// C:\Program Files\MongoDB\Server\6.0\data\
const express = require('express')
var expressValidator = require('express-validator')
const app = express();
let bodyParser = require('body-parser');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//calling express validator
app.use(expressValidator());


var port = process.env.PORT || 8080;
// Launch app to listen to specified port
var server = app.listen(port, () => {
  console.log("Running RestHub on port " + port);
});

// mongoose connection
const mongoose = require('mongoose');
const route = require('../backend/api-routes');
app.use('/', route);

const mdbConfig = require('./config/database.js');
mongoose.connect(mdbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to database...!");
}).catch(err => {
  console.log("Could not connect to the database....!");
  process.exit();
})
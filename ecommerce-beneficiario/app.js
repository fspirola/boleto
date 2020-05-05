/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser= require('body-parser');

// Cloudant requires
// var cloudant = require('cloudant');
// var config = require('./env.json');

// // DB de propostas
// var dbname = 'propostas';

// // cria conexão
 var db; //= cloudant.db.use(dbname);

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

//Declarando um logger para verificar as rotas que estao sendo requisitadas.
const logger = require('morgan');
app.use(logger('dev'));

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

// setting the views directory
app.set('views', './src/views');

// setting ejs as our view engine
app.set('view engine', 'ejs');

// importing routes
var propostaRouter = require('./src/routes/propostaRoutes.js')(db);

/*
* Routing Configuration
*/

app.get('/', function(req, res) {
  res.render('april');
});

// rotas de proposta
app.use('/proposta',propostaRouter);



// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

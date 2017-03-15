/**** Libraries ****/
var express = require("express");
var session = require('express-session');
var ios = require('socket.io-express-session');

var app = express();
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var pass_hash = require('password-hash');

/**** Custom libraries ****/
var database = require('./libs/database.js');
var pass_init = require('./libs/passport.js')(app, database, passport, pass_hash);

/**** App configuration ****/
app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* 1 day cookie */
var my_session = session({
  store: new FileStore(),
  secret: 'jig2017jig',
  saveUninitialized: true,
  resave: true,
  duration: 60 * 60 * 24 * 1000
});

app.use(cookieParser());
app.use(my_session);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

/**** IO session config ****/
io.use(ios(my_session));

/**** Include routing & socket ****/
require('./app/routes.js')(app, database, io, passport, pass_hash, router);
require('./app/socket.js')(app, database, io);

/**** Connection DB - Server ****/
database.connect('localhost', 'root', 'root', 'jig');

/**** Listenning ****/
server.listen(3000);

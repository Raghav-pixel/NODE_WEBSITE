var express = require('express');
var app = express();
var port = process.env.PORT || 8080
var session = require('express-session');
var mongoose = require('mongoose');

var passport = require('passport');
var morgan = require('morgan');


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

//	Connect to the database
mongoose.connect('mongodb+srv://raghav:khanna@cluster0-k1zot.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

//	set the view engine
app.set('view engine', 'ejs');

//	set up our express application
app.use(morgan('dev')); 
app.use(cookieParser()); //	read cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//	required for passport
app.use(session({secret:'ilovewine',
				resave: false,
				saveUninitialized: false})); //	session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//	Acquire the routes
require('./config/passport')(passport);
require('./app/routes')(app, passport);


//	PORT
app.listen(port);
console.log(`the magic happens at ${port}`);


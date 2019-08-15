module.exports = (app, passport) =>{
//	HOME PAGE
app.get('/', (req,res) =>{
	res.render('index');
});


//	LOGIN PAGE
app.get('/login', (req,res) =>{
	res.render('login', {message: req.flash('loginMessage')});
});

//	process the login form
app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

//	SIGNUP FORM
app.get('/signup', (req,res) =>{
	res.render('signup', {message: req.flash('signupMessage')});
});

//	process the signup form
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/profile',
	failureRedirect	: '/signup',
	failureFlash : true
}));

//	PROFILE SECTION
//	we will have to know if the user is logged in
//	we will use route middleware to verify this(the isLoggedIn function)
app.get('/profile', isLoggedIn, (req,res) =>{
	res.render('profile', {
		user: req.user // get the user out of session and pass it to the template
	});
});

//	LOGOUT
app.get('/logout', (req,res) =>{
	req.logout();
	res.redirect('/');
});

//	route middleware to check if the user is logged in
function isLoggedIn(req,res,next){

	//	if user is authenticated in session then carry on
	if(req.isAuthenticated())
		return next();

// if not then redirect to the home page
	res.redirect('/');
}
}

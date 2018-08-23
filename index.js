// This is the APP entry point;
// package.json appears when you npm init; 

// Require stuff;  bring the packages into the code base;
// the documentation says we need to require it.
var bodyParser = require('body-parser');          // Body-parser parses incoming request bodies in a middleware. In this case it works for the form input.
var ejsLayouts = require('express-ejs-layouts');	// We can have one layout page, and that we can use <%- body %>  
var express = require('express');  					//  Bring the express package into the Code; 


// Declare global variables:
var app = express();  // initialing an express app. So app is an express app. 

// Set and use statements, we normally refer them as middleware;
app.set('view engine', 'ejs');    // express requires a view engine, ejs is a node package; 
app.use(express.static(__dirname + '/public/'));  // adding the public folder to the routes  // __dirname is directory name of the current folder;
									// serve Static files such as images, css and JavaScript file (like the front end). 
app.use(ejsLayouts);       // use the ejsLayouts here;

// Make the code to come through as string or array; 
app.use(bodyParser.urlencoded({extended: false}));  // when you use a form, the data you typed in the form can come to the back end. 


// Include controllers/routers; The middleware to extend the back end index.js file (this file).
app.use('/articles', require('./controllers/articles'));
app.use('/authors', require('./controllers/authors'));  // require indicates that running on the back end.
app.use('/comments', require('./controllers/comments'));
app.use('/tags', require('./controllers/tags'));


// Define routes 
app.get('/', function(req, res){   // request and response
	res.render('home');   // res.render give it a path, the path looks into the views and then adds the path from views;
						//   res.render means show  the page in the argument;  THIS case shows the home page;		
});


// Wildcard for routes     // anything that's not defind here going to show the error page; 
app.get('*', function(req, res) {   // * is the wild card operator for catch all  
	console.log('wildcard route');
	res.render('error');
});

// Hey! Listen!@  
app.listen(3000);   // tells what port to use, localhost is the name for genetic client.  


// everytime when you render something the view engine is telling the browser to insert the ejs files from the views folders into the layout.ejs. (the name for the views folder and layout.ejs can NOT be changed)
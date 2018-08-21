var express = require('express');
var router = express.Router();
var db = require('../models'); // add it to the database 

router.get('/', function(req, res){
	db.author.findAll().then(function(allAuthors){
		res.render('authors/index', {authors: allAuthors});
	}).catch(function(err){
		console.log(err);
		//res.send('bad things happened');
		res.render('error');
	})
	//res.render('authors/index');  // render already look for views pages 
});

router.get('/new', function(req, res){
	res.render('authors/new');
});

router.get('/:id', function(req, res){	// found the author ID
	//res.send('author show page goes here');
	db.author.findOne({
		where: { id: req.params.id },	//where has its own object 
		include: [db.article]
	}).then(function(foundAuthor){
		res.render('authors/show', {author: foundAuthor});  // pass the author that we found to the show page 
	}).catch(function(err){
		//res.send('can\'t find that author!');
		res.render('error');
	});
});

router.post('/', function(req, res){
	console.log(req.body);
	db.author.create(req.body).then(function(createAuthor){ //access the author model 
		res.redirect('/authors/' + createAuthor.id);
	}).catch(function(err){
		console.log(err);
		//res.send('derp');
		res.render('error');
	});    
	//res.send('/authors POST route reached');
});

module.exports = router;

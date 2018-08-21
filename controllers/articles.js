var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	db.article.findAll().then(function(allArticles){
		res.render('articles/index', {articles: allArticles});	// render already look for views pages 
	}).catch(function(err){
		console.log(err);
		res.send('oooops');
	});
});

router.get('/new', function(req, res){
	db.author.findAll().then(function(allAuthors){
		res.render('articles/new', {authors: allAuthors});
	}).catch(function(err){
		console.log(err);
		res.send('oops');
	});
	// res.render('articles/new', {authors: []});
});

router.get('/:id', function(req, res){
	//res.send('article show page goes here');
	db.article.findOne({
		where: {id: req.params.id},
		include: [db.author]
	}).then(function(foundArticle){
		res.render('articles/show', {article: foundArticle});
	}).catch(function(err){
		console.log(err);
		res.send('oooops');
	});
});

router.post('/', function(req, res){
	//res.send('articles POST route reached!');
	if (req.body.authorId !== 0) {
		console.log(req.body);
		db.article.create(req.body).then(function(createdArticle){
			res.redirect('/articles/' + createdArticle.id); //created the article and the id is created.
		}).catch(function(err){
			console.log(err);
			res.send('Nooooooooo');
		});
	}
	else{
		res.redirect('/articles/new')
	}
});

module.exports = router;

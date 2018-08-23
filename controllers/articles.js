var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models'); // bring in your database in. // when you need to bring in files, you can bring the files as well;


// this code querying the database;
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

// this route shows the information  for the article+:id page: 
router.get('/:id', function(req, res){
	//res.send('article show page goes here');
	db.article.findOne({		// db.tableName.functionName is sequelized query.
		where: {id: req.params.id},
		include: [db.author, db.comment, db.tag]
	}).then(function(foundArticle){
		db.author.findAll().then(function(allAuthors){
			res.render('articles/show', {article: foundArticle, authors: allAuthors}); // the second argument sends the data( allAuthors ) to the ejs file.  
		}).catch(function(err){      // there two queries here 
			console.log(err);
		//res.send('oooops');
		res.render('error');
	});
	}).catch(function(err){
		console.log(err);
		//res.send('oooops');
		res.render('error');
	});
});


router.post('/', function(req, res){
	//res.send('articles POST route reached!');
	if (req.body.authorId > 0) {
		//console.log(req.body);
		db.article.create(req.body).then(function(createdArticle){
			// Parse the tags (if there are any)
			var tags = [];
			if (req.body.tags) {
				tags = req.body.tags.split(',');
			}
			if (tags.length > 0) {
				// Loop through tags, create if needed, the add relation in join table;
				async.forEach(tags, function(t, done){
					// This code runs for each individual tag we need to add
					db.tag.findOrCreate({
						where: {name: t.trim()}
					}).spread(function(newTag, wasCreated){
						createdArticle.addTag(newTag).then(function(){
							done(); // tells async, this iteration is all finished!
						}); // add the tags to the database:   						
					});
				}, function(){
					// This code runs when EVERYTHING IS 100% DONE!
					res.redirect('/articles/' + createdArticle.id); 
				});

			/*  Darn: this HAS TIMING Issues!
				tags.forEach(function(t) {
					db.tag.findOrCreate({
						where: {name: t.trim()}
					}).spread(function(newTag, wasCreated){  // normal thing that is gonna give you
						createdArticle.addTag(newTag);
						// <instance model1>.add<model2>(<instance model2>)
					});      
				});
				res.redirect('/articles/' + createdArticle.id);    */

			} 
			else {
			res.redirect('/articles/' + createdArticle.id); //created the article and the id is created.
		}
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





module.exports = function(io){	
	
	const express = require('express');
	const router = express.Router();
	// could use one line instead: const router = require('express').Router();
	const tweetBank = require('../tweetBank');
	const bodyParser = require('body-parser');

	router.use(bodyParser.urlencoded({extended:false}));
	router.use(bodyParser.json());

	router.get('/', function (req, res) {
		let tweets = tweetBank.list();
		res.render( 'index', { tweets: tweets, showForm:true } );
	});

	router.get('/users/:name',function(req,res){
		var name = req.params.name;
		console.log("name: " + name + " " + typeof name);
		var list = tweetBank.find({name:name});
		res.render('index',{tweets:list,showForm:true,username:name});
	});

	router.get('/tweets/:id',function(req,res){
		var id = parseInt(req.params.id);
		var list = tweetBank.find({id:id});
		res.render('index',{tweets:list});
	});

	router.post('/tweets',function(req,res){
		//console.log("req.body: " + req.body);
		var name = req.body.name;
		var text = req.body.text;
		var newTweet = tweetBank.add(name,text);
		io.sockets.emit('newTweet',newTweet);		
		res.redirect('/');
	});

	return router;
};

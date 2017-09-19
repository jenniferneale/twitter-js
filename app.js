const express = require( 'express' );
const app = express();
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes');

/*app.use(function(req,res,next){
	console.log(req.method + " " + req.url + " " + 200);
	next();
});*/

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views',{
	noCache:true,
	autoescape:true,
	express:app
	}); // point nunjucks to the proper directory for templates

nunjucks.render('index.html', function (err, output) {
    console.log("Output: " + output);
});

app.use(volleyball);
app.use('/',routes);
app.use(express.static('public'));

app.listen(3000,function(request,response){
	console.log("I'm listening!");
});

/*var locals = {
    title: 'Wizards of the 4th Age:',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'},
		{ name: 'Omri Sr.'}
    ]
};

app.get('/',function(req,res){
	res.render('index',locals);
});

app.get('/tweets/num',function(req,res){
	
});*/
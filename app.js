const express = require( 'express' );
const app = express();
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const socketio = require('socket.io');

/*app.use(function(req,res,next){
	console.log(req.method + " " + req.url + " " + 200);
	next();
});*/

var server = app.listen(3000,function(request,response){
	console.log("I'm listening!");
});

const io = socketio.listen(server);
console.log("server: " + server);

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views',{
	noCache:true,
	autoescape:true,
	express:app
	}); // point nunjucks to the proper directory for templates

app.use(volleyball);
//app.use('/',routes); //conflicted once routes was no longer a list of res/req handlers, but a single function
var router = routes(io);
console.log("router: " + typeof router);
app.use('/',router);
app.use(express.static('public'));

nunjucks.render('index.html', function (err, output) {
    if(err) console.log("Error: " + err);
});
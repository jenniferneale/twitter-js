const express = require( 'express' );
const app = express();

app.get('/',function(req,res){
	res.send("Why hello there!");
});

app.get('/news',function(req,res){
	res.send("Sunny with a chance of meatballs?");
});

app.listen(3000,function(request,response){
	console.log("I'm listening!");
});



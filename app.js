const express = require( 'express' );
const app = express();

app.get('/',function(req,res){
	res.send("Why hello there!");
});


app.listen(3000,function(request,response){
	console.log("I'm listening!");
});



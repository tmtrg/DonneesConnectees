var express = require('express');
var app = express();
var cors = require('cors');

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var data={};
var id=0;

app.use(express.static('html'));

app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, x-Requested-With');
	next();
});


app.post("/annotation", cors(), function(req, res){
	var body = req.body;
	data[id]=body;
	console.log(data);
	id++;
	res.send();
});


app.get("/IdAnnot", function(req, res){
	var IdAnnot = req.query.Annot;
	
	var Exist=Object.keys(data).includes(IdAnnot);
	
	var ChoixFormat=req.query.FormatIdAnnot;
	
	console.log(req.headers['accept']);
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
	
	console.log(req.headers['accept']);
	
	res.format ({
		   'text/html': function() {
			    if (Exist){
				   res.send(data[IdAnnot]); 
			    }
			    else {
				   res.send("aucune annotation n'est associée à cette clé");
			    }
		   },

		   'application/json': function() {
			    if (Exist){
				   res.send(data[IdAnnot]); 
			    }
			    else {
				   res.send("aucune annotation n'est associée à cette clé");
			    }
			}
	});
	
});




app.get("/AllAnnot", function(req, res){
	var ChoixFormat=req.query.FormatAllAnnot;
	
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
		
	res.format ({
		   'text/html': function() {
			  res.send(data); 
		   },

		   'application/json': function() {
			  res.send(data);
			}
	});
	
});


app.get("/URI", function(req, res){
	var IdURI = req.query.AnnotURI;
	
	var ChoixFormat=req.query.FormatAnnotURI;
	
	var tabRep=[]
	
	for (key in data){
		if (data[key]["URI"]==IdURI){
			tabRep.push({"IdAnnotation" : data[key], "Commentaire" : data[key]["Commentaire"]});
		}
	}
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
		
	res.format ({
		   'text/html': function() {
			  res.send(tabRep); 
		   },

		   'application/json': function() {
			  res.send(tabRep);
			}
	});
	
});





app.listen(port, function(){
	console.log('serveur listening on port : '+port);
})
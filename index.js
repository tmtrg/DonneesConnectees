var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

//localhost:3000 pour voir les ressources

app.get("/toto", function(request, response){
    response.send("salut toto");
});


app.listen(port, function(){
    console.log('serveur listening on port : '+port);
});
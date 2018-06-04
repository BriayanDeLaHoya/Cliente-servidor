var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var Forecastlo = require("forecastio");
var http = require('http');

var app = express();

//Aquí va la llave 
var weather = new Forecastlo("17e975ba8a1461ab5e4dc9a5057630e5");

app.use(express.static(path.resolve(__dirname,"public")));
app.set("views", path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("index");
});


app.get("/",function(req, res){
    res.send("/armas.ejs")
});
app.get("/armas",function(req, res){
    res.render("armas")
});

app.get("/",function(req, res){
    res.render("/clases.ejs")
});

var publicPath = path.resolve(__dirname,'public');
app.use('/recursos',express.static(publicPath));

app.get("/clases",function(req, res){
    res.render("clases")
    var app = express();



app.use((Request,Response) => {
    Response.writeHead(200,{'Content-Type':'text/plain'});
    Response.end('No se encuentra ningun archivo');

});

});

app.get("/",function(req, res){
    res.render("/victimas.ejs")
});

app.get("/victimas",function(req, res){
    res.render("victimas")

    var IP_Malvada = "192.168.1.161";
    app.use((request,Response,next)=>{
        if (request.ip === IP_Malvada){
            Response.status(401).send("Intento de acceso denegado no eres un zombie");
        }else{
            next();
        }

    });

});










app.get(/^\/(\d{5})$/,function(req,res,next){
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location.zipcode){
        next();
        return;
    }

    var latitude = location.latitude;
    var longitude = location.longitude;

    weather.forecast(latitude, longitude, function(err, data){
        if(err){
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });
});

app.use(function(req,res){
    res.status(404).render("404");
});
app.listen(3000);


var express = require(express);
var path = requiere(path);
var http = requiere(http);

var app = express();

var IP_MALVADA = "128.95.40.1";

app.use((request,response,next)=>{
    if(request.ip === IP_MALVADA){
        response.status(401).send("Intento de acceso no autorizado");
    
    }else{
        next();
    }
});
var publicPath = path.join(__diname,'public');
app.use('recursos',express.static(publicPath));

app.get('/',(request, response)=>{
    response.end('Bienvenido a mi pagina principal');
})
http.createServer(app).listen(3000);

app.get('/about',(request))
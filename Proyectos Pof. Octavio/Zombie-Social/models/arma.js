var bcrypt=require("bcrypt-nodejs");
var mongoose = require("mongoose");

var SALT_FACTOR = 10;

var armaSchema = mongoose.Schema({
    descripcion:{type:String,required:true},
    fuerza:{type:Number,required:true},
    categoria:{type:String,required:true},
    municiones:{type:Boolean},
});

var Arma = mongoose.model("armas",armaSchema);
module.exports = Arma;
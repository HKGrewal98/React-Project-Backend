var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ResturantSchema = new Schema({
    name:String
 },{collection:'resturants'})
 
 module.exports = {
     "resturant" : mongoose.model('resturant', ResturantSchema)
 }
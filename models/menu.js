const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
   name:String,
   description:String,
   price:Number,
   available:String
},{collection:'menu'})

module.exports = {
    "menu" : mongoose.model('menu', MenuSchema)
}



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : String,
    password : String,
    email : String,
    phone : String,
    resturantId:String,
    isAdmin: Schema.Types.Boolean
},{collection:'users'})

module.exports = {
    "users" : mongoose.model('users',UserSchema)
}
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId : String,
    address : {
        city:String,
        street:String,
        postalCode:String,
        houseNo:String
    },
    totalAmount:Number,
    isCompleted:Boolean,
    order:[
        {
            itemId:String,
            amount:Number,
            price:Number
        }
    ]

 },{collection:'orders'})

 module.exports = {
    "orders" : mongoose.model('orders', OrderSchema)
}
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId : String,
    address : {
        city:String,
        street:String,
        postal:String,
        houseNo:String
    },
    totalAmount:Number,
    isCompleted:Boolean,
    order:[
        {
            id:String,
            amount:Number,
            price:Number
        }
    ],
    payment:{
         name:String,
         cardNumber:String,
         cvv:String,
         expiry:String,
         paymentMode:String
    }
 },{collection:'orders'})

 module.exports = {
    "orders" : mongoose.model('orders', OrderSchema)
}

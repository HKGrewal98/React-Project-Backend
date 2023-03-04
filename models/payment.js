const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    customerId : String,   
    name:{type:String, required :true},
    cardNumber: { type: String, required: true },
    cardExpiry: { type: String, required: true },
    cardCvv: { type: String, required: true },
    amount: { type: Number, required: true },
    modeOfPayment:{ type: String, required: true },
    dateOfPayment:String
},{collection:'payment'})

module.exports = {
    "payment" : mongoose.model('payment', PaymentSchema)
}



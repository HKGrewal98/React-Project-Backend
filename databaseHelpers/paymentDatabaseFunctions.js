const paymentDB = require('../models/payment').payment
function addPayment(data,res){

    const pay = new paymentDB
    pay.customerId = data.id
    pay.cardNumber = data.cardNumber
    pay.cardExpiry = data.expiry
    pay.cardCvv = data.cvv
    pay.amount = data.amount
    pay.modeOfPayment = data.mode
    pay.dateOfPayment = data.date

    pay.save(function(err,result){
        if(err){
            console.log(err)
            return res.json({error:err})
        }
        return res.json({status:"SUCCESS",message:`Payment details added.`})
    })    
}

module.exports = {addPayment}
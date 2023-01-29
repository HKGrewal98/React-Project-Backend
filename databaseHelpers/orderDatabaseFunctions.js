const orderDB = require('../models/orders').orders
const {sendOrderConfirmation} = require('../authenticate/sendEmail')

function saveOrder(data,res){
    const order = new orderDB
    
    order.customerId = data.id
    order.address = data.address
    order.totalAmount = data.totalAmount
    order.isCompleted = data.isCompleted
    order.order = data.order

    order.save(function(err,result){
        if(err){
            console.log(err)
            return res.json({error:err})
        }
        sendOrderConfirmation("grewalharkanwal36@gmail.com",data.order)
       return res.json({status:"SUCCESS",message:`Order created with id ${result._id}.`})
    })
}

module.exports = {saveOrder}
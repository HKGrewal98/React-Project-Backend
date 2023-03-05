const orderDB = require("../models/orders").orders;
const userDB = require('./userDatabaseFunctions')
const { sendOrderConfirmation } = require("../authenticate/sendEmail");

async function saveOrder(data, res) {

  const {houseNo,street,postal,city} = data.orderAddress
  if(data.user.id === '' || houseNo === '' , street === '' ||
     postal === '' || city === '' || data.userOrder.length===0 || data.totalAmount===0){
      return res.status(400).json({status:"FAILURE",message:"Order Incomplete.Please select the food items from the menu."})
     }

  try{
     
    const order = new orderDB
    order.customerId = data.user?.id
    order.address = data.orderAddress
    order.totalAmount = data.totalAmount
    order.isCompleted = true
    order.order = data.userOrder
    order.payment = data.payment

    order.save(async function(err,result){
      if(err){
         console.log(err)
         return res.status(500).json({status:"FAILURE",message:err.message})
      }
      console.log(result)
      const userInfo = await userDB.getUser(data.user.id)
      sendOrderConfirmation(data.user.email,data.userOrder,data.totalAmount)
      console.log(userInfo)
      return res.json({status:"SUCCESS",message:`Order created successfully with id ${result._id}.`})
    })


  }catch(error){
     console.log(err)
     return res.status(500).json({status:"FAILURE",message:err.message})
  }

}

module.exports = { saveOrder };

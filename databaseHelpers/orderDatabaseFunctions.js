const orderDB = require("../models/orders").orders;
const menuDB = require('../models/menu').menu
const userDB = require('./userDatabaseFunctions')
const { sendOrderConfirmation } = require("../authenticate/sendEmail");
const resturantId = "65348fa2368660f0a932b73e"

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
    order.orderDate = new Date()
    order.resturantId = resturantId

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

function getDateBasedOnStatus(status){
  let date =  new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  switch(status){
    case 0:{return date;}
    case 1:return date.setDate(date.getDate()-7)
    case 2:{return date.setMonth(date.getMonth() - 1)}
    case 3:{return date.setMonth(date.getMonth() - 6)}
    case 4:{return date.setFullYear(date.getFullYear() - 1)}
  }
}


async function getOrderAnalytics(status){
    try{
          console.log(status)
          const date = getDateBasedOnStatus(parseInt(status))
          console.log("Date : " + new Date(date))
          let aggregator = [{$match:{"orderDate":{$gte:new Date(date)},"resturantId":{$eq:"65348fa2368660f0a932b73e"}}},
                            {$unwind:"$order"},
                            {$group:{_id:"$order.id",count:{$sum: "$order.amount"},totalSaleAmount:{$sum:{ $multiply:[ "$order.price", "$order.amount" ]}}}}
                          ]
          let sortByCount =  {$sort:{"count":-1}}
          let sortBySalesAmount =  {$sort:{"totalSaleAmount":-1}}
          let details = await orderDB.aggregate([aggregator[0],{$group:{_id:null,totalOrders:{$sum:1},totalAmount:{$sum:"$totalAmount"}}}])
          console.log(details)
          return {
            "totalOrders": details[0].totalOrders,
            "totalAmount": details[0].totalAmount,
            "sortBycount":await compute(aggregator,sortByCount),
            "sortByamount":await compute(aggregator,sortBySalesAmount)
          }
    }catch(ex){
       console.error("Error in computing analytical details " + ex)
       return []
    }
}


async function compute(condition,sort){
  let response = []
  let result = await orderDB.aggregate([condition[0],condition[1],condition[2],sort]) 

  for(let res in result){
    result[res].totalSaleAmount = parseFloat(result[res].totalSaleAmount).toFixed(2)
    let name = await menuDB.find({"_id":result[res]._id},{"name":1,"_id":0,"available":1})
    if(name && name.length > 0){
    response.push({name:name[0].name,...result[res],available:name[0].available})
    }
  } 
  return response
}

module.exports = { saveOrder,getOrderAnalytics};

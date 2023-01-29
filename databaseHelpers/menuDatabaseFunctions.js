const menuDB = require('../models/menu').menu
const helper = require('./utilities')


function getAllMenuItems(res,allItems){
  
   const filters =  helper.getAvailableFoodFilter(allItems)
   console.log(filters)
   menuDB.find({available : {$in : filters }})
   .lean()
   .then((result) => {return res.json(result)})
   .catch((err) => {
    console.log(err)
    return res.json({error:err})})
}


function addNewItem(data,res){

    const newItem = new menuDB
    newItem.name = data.name
    newItem.description = data.description
    newItem.price = data.price
    newItem.available = data.available

    newItem.save(function(err,result){
        if(err){
            console.log(err)
            return res.json({error:err})
        }

        return res.json({status:"SUCCESS",message:`Item successfully created with id ${result._id}.`})
    })
    
}


function updateItem(data,res){

    if(!data.id){
        return res.json({status:"FAILURE",message:"Invalid item id."})
  }
  
    const update = {$set: {
        "name" : data.name,
        "description" : data.description,
        "price" : data.price,
        "available" : data.available
    }}

    menuDB.updateOne({_id : data.id},update,function(err,result){
        if(err){
            console.log(err)
            return res.json({error:err})
        }

        return res.json({status:"SUCCESS",message:`Item updated with id ${data.id}.`})
    })

}

function deleteItem(id,res){
    if(!id){
          return res.json({status:"FAILURE",message:"Invalid item id."})
    }
    menuDB.deleteOne({_id:id},function(err,result){
        if(err){
           console.log(err)
           return res.json({error:err})
        }
        return res.json({status:"SUCCESS",message:`Item deleted with id ${id}.`})
    })
}

module.exports = {getAllMenuItems,addNewItem,updateItem,deleteItem}
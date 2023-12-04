const menuDB = require('../models/menu').menu
const helper = require('./utilities')
const jobsDB = require('../models/Jobs').jobs
const restDB = require('../models/Resturants').resturant
const resturantId = "65348fa2368660f0a932b73e" //65348fa2368660f0a932b73e
let batchSize=5;

function getAllMenuItems(res,allItems,paginated,page){
      console.log(paginated)
    if(paginated === "true"){
       return paginatedResponse(res,page)
    }
  
   const filters =  helper.getAvailableFoodFilter(allItems)
   console.log(filters)
   menuDB.find({available : {$in : filters } , resturantId: resturantId})
   .lean()
   .then((result) => {return res.json(result)})
   .catch((err) => {
    console.log(err)
    return res.json({error:err})})
}

function paginatedResponse(res,page){

page = parseInt(page)
if(page === 0){page=1}
menuDB.countDocuments({resturantId:resturantId})
.lean()
.then((count)=> {
   
    let totalPages = Math.ceil(count/batchSize)
    console.log("Records count is " + count)
    if(page > totalPages){ page = totalPages}
    
    let previous = Math.max(1,page-1)
    let next = Math.min(totalPages,page+1)
    let skip = (page-1)*batchSize
   

    console.log(`Next is ${next} , previous is ${previous} , to be skipped ${skip}`)

    menuDB.find({resturantId:resturantId})
    .skip(skip).limit(batchSize)
    .lean()
    .then((result) => {
          return res.json({result,next:next,previous:previous,total:count,page:page,totalPages:totalPages})
    }).catch((err) => {
    console.log(err)
    return res.json({error:err})
})
    

}).catch((err) => {
    console.log(err)
    return res.json({error:err})
})


}

async function getItemById(id){
    return await menuDB.findById(id)
}



function addNewItem(data,res){

    const newItem = new menuDB
    newItem.name = data.name
    newItem.description = data.description
    newItem.price = parseFloat(data.price)
    newItem.available = data.available
    newItem.resturantId = resturantId;

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

async function getAllJobs(res){
     
    var response = await jobsDB.find().lean()
    response = response.map((job) => {
        var postedDate = new Date()
        var day = postedDate.getDate() - getRandomNumber()
        postedDate.setDate(day)
        return {
            ...job,
            postedDate:postedDate.toDateString()
        }
    })
    return res.json(response)

}

function getRandomNumber(){
    return Math.floor((Math.random()*5)+1)
}

async function getTitle(){
    return await restDB.findById(resturantId)
}

async function updateTitle(title){
    console.log(title)
    return await restDB.updateOne({_id:resturantId},{$set:{name:title}})
}


module.exports = {getAllMenuItems,addNewItem,updateItem,deleteItem,getAllJobs,getItemById,getTitle,updateTitle}
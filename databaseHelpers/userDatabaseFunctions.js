const userDB = require('../models/user').users
const email = require('../authenticate/sendEmail')
const bcrypt = require('bcrypt')
const helpers = require('./utilities')


function saveUser(data,res){

   const err = helpers.validateUserRequest(data)
   if(err.length!=0){
    return res.status(400).json({error:err})
   }


   userDB.findOne({email:data.email},function(err,result){
        if(err){
            console.log(err)
            return res.status(500).json({error:err})
        }
        if(result){
            return res.status(201).json({status:"SUCCESS",message:`User already exists with email ${result.email}.`})
        }

        const newUser = new userDB
        newUser.name = data.name
        newUser.password = bcrypt.hashSync(data.password,10)
        newUser.email = data.email
        newUser.phone = data.phone

        newUser.save(function(err,result){
            if(err){
                console.log(err)
                return res.status(500).json({error:err})
            }
            email.sendEmail(result.email,result.name)
            return res.json({status:"SUCCESS",message:`User successfully created with id ${result._id}.`})
        }) 


   })
  
}

function updateUser(data,res){
    const err = helpers.validateUserRequest(data)
    if(err.length!=0){
     return res.json({error:err})
    }
    
    const update = {$set: {
          "name" : data.name,
          "email" : data.email,
          "phone" : data.phone
    }}

    userDB.updateOne({_id:data.id},update,function(err,result){
        if(err){
            console.log(err)
            return res.json({error:err})
        }
        return res.json({status:"SUCCESS",message:`User successfully updated with id ${data.id}.`})
    })
}

 function updatePassword(id,oldPassword,newPassword,res){
     
    if(!id || !newPassword || !oldPassword){
        return res.json({status:"FAILURE",message:"Invalid Password or Id."})
    }

     userDB.findById(id,function(err,result){
        if(err){
            console.log(err)
            return res.json({error:err})
        }

        const same = bcrypt.compareSync(oldPassword,result.password)
        if(!same){
            return res.json({status:"FAILURE",message:"User Verification Failed. Please fill your current password correctly."})
        }
        
        const update = {$set: {
            "password" : bcrypt.hashSync(newPassword,10)
        }}
    
        userDB.updateOne({_id:id},update,function(err,result){
            if(err){
                console.log(err)
                return res.json({error:err})
            }
            return res.json({status:"SUCCESS",message:`Password successfully updated for user with id ${id}.`})
        })
    })
}


function validateUser(email,password,res){
     
    if(!email && !password){
        console.log("Invalid login request values")
        return res.status(400).json({status:"FAILURE",message:"Input Incorrect. Please enter email and password again."}) 
    }

    const filter = {
        email : new RegExp(email,"i")
    }

    userDB.findOne(filter,function(err,result){
        if(err){
            console.log(err)
            return res.json({error:err})
        }

        if(!result){
            return res.status(400).json({status:"FAILURE",message:"Please Sign Up."}) 
        }
        
        try{
            const same = bcrypt.compareSync(password,result.password)
            if(!same){
                return res.status(400).json({status:"FAILURE",message:"User Verification Failed. Please fill your current password correctly."})
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({status:"FAILURE",message:"Unknown error occured."})
        }

        return res.json({status:"SUCCESS"
        ,message:"User Validated Successfully."
        ,user:{
            id : result._id,
            name : result.name,
            email : result.email,
            phone : result.phone
        }}) 
    })


}


async function getUser(id){
    const result = await userDB.findById(id)
    console.log(result)
    return result
}

module.exports = {saveUser,updateUser,updatePassword,validateUser,getUser}
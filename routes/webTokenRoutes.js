const {express, app} = require('../config/server')
const webTokenRoute = express.Router()
const jwt = require('jsonwebtoken')
const DEFAULT_CLIENT_ID = "frontend"
const SIGNING_KEY = '478269814c199935d534702359a6330baf1113940da72d4b996e29062df1c2c5c04ccaf930329df14667afcb833acebd2a390836d6590311e56640e964f6ca4c'


webTokenRoute.post('/getToken',(req,res)=>{
    console.log(req.body)
    const {clientId} = req.body
    console.log("Client Id " + clientId)
    if(clientId===DEFAULT_CLIENT_ID){

        const client = {id : clientId}
        const accessToken = jwt.sign(client,SIGNING_KEY,{ expiresIn: 15*60 })
        return res.status(200).json({accessToken:accessToken})
              
    }else{
        console.log("Returning error.")
        return res.json({status:"FAILURE",message:"Invalid ClientId."})
    }
})


function validateToken(req,res,next){
         const accessToken = req.header('Authorization')
         if(!accessToken){
            return res.status(401).json({message:"Auth Token is required."})
         }
          
         let decoded = null
         try{
             decoded = jwt.verify(accessToken, SIGNING_KEY);
         }catch(error){
            return res.status(401).json({message:"Invalid Token."})
         }

         if(!decoded || decoded.id!==DEFAULT_CLIENT_ID){
               return res.status(401).json({message:"Invalid ClientId."})
         }

         next()
}


module.exports = {webTokenRoute,validateToken}
const {express, app} = require('../config/server')
const {validateToken} = require('./webTokenRoutes')
const userDB = require('../databaseHelpers/userDatabaseFunctions')

const userRoutes = express.Router()

userRoutes.post('/signUp',validateToken,(req,res)=>{
      return userDB.saveUser(req.body,res)
})

userRoutes.post('/signIn',validateToken,(req,res)=>{
    const {email,password} = req.body
    return userDB.validateUser(email,password,res)
})

userRoutes.put('/update',validateToken,(req,res)=>{
      return userDB.updateUser(req.body,res)
})

userRoutes.put('/updatePassword',validateToken,(req,res)=>{
    return userDB.updatePassword(req.body.id,req.body.op,req.body.np,res)
})

module.exports = userRoutes
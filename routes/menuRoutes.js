const {express, app} = require('../config/server')
const dbMethods = require('../databaseHelpers/menuDatabaseFunctions')
const {validateToken} = require('./webTokenRoutes')
const menuRoute = express.Router()

menuRoute.get('/',validateToken,(req,res)=>{
    const {allItems} = req.query
    return dbMethods.getAllMenuItems(res,Boolean(allItems))
})

menuRoute.post('/addItem',validateToken,(req,res)=>{
    return dbMethods.addNewItem(req.body,res)
})

menuRoute.put('/updateItem',validateToken,(req,res)=>{
    return dbMethods.updateItem(req.body,res)
})

menuRoute.delete('/deleteItem',validateToken,(req,res)=>{
    return dbMethods.deleteItem(req.body.id,res)
})

menuRoute.all("*",(req,res)=>{
    res.json("Sorry! Endpoint does not exist.")
})

module.exports = menuRoute
const {express, app} = require('../config/server')
const {validateToken} = require('./webTokenRoutes')
const orderDB = require('../databaseHelpers/orderDatabaseFunctions')
const orderRoute = express.Router()


orderRoute.post("/",validateToken,async (req,res)=>{
    console.log(req.body)
    return await orderDB.saveOrder(req.body,res)
})

module.exports = orderRoute


const {express, app} = require('../config/server')
const {validateToken} = require('./webTokenRoutes')
const orderDB = require('../databaseHelpers/orderDatabaseFunctions')
const orderRoute = express.Router()


orderRoute.post("/",validateToken,(req,res)=>{
    return orderDB.saveOrder(req.body,res)
})

module.exports = orderRoute


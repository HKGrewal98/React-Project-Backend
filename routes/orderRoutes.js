const {express, app} = require('../config/server')
const {validateToken} = require('./webTokenRoutes')
const orderDB = require('../databaseHelpers/orderDatabaseFunctions')
const orderRoute = express.Router()


orderRoute.post("/",validateToken,async (req,res)=>{
    console.log(req.body)
    return await orderDB.saveOrder(req.body,res)
})

orderRoute.get("/data",async (req,res)=>{
    const status = req.query.status || 0
    return res.json(await orderDB.getOrderAnalytics(status))
})

module.exports = orderRoute


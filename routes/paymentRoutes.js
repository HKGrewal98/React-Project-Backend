const paymentRoute = express.Router()
const paymentMethods = require('../databaseHelpers/paymentDatabaseFunctions')
const {validateToken} = require('../../react_project/React-Project-Backend/routes/webTokenRoutes')

paymentRoute.post('/addPayment',validateToken,(req,res)=>{
    return paymentMethods.addPayment(req.body,res)
})
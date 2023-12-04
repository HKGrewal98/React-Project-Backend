const {express, app} = require('../config/server')
const dbMethods = require('../databaseHelpers/menuDatabaseFunctions')
const {validateToken} = require('./webTokenRoutes')
const menuRoute = express.Router()

menuRoute.get('/',validateToken,(req,res)=>{
    const {allItems} = req.query
    const {paginated} = req.query
    const {page} = req.query
    return dbMethods.getAllMenuItems(res,Boolean(allItems),paginated,page)
})

menuRoute.get('/item/:id', async (req,res) => {
    return  res.json( await dbMethods.getItemById(req.params.id))
})

menuRoute.post('/addItem',validateToken,(req,res)=>{
    return dbMethods.addNewItem(req.body,res)
})

menuRoute.post('/updateItem',validateToken,(req,res)=>{
    return dbMethods.updateItem(req.body,res)
})

menuRoute.get('/deleteItem/:id',validateToken,(req,res)=>{
    return dbMethods.deleteItem(req.params.id,res)
})

menuRoute.get('/jobs',(req,res)=>{
    return dbMethods.getAllJobs(res)
})

menuRoute.get('/title',async (req,res)=>{
    return res.json(await dbMethods.getTitle());
})

menuRoute.post('/title',async (req,res)=>{
    return res.json(await dbMethods.updateTitle(req.body.title));
})

menuRoute.all("*",(req,res)=>{
    res.json("Sorry! Endpoint does not exist.")
})

module.exports = menuRoute
const express = require('express')
var cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({urlencoded : false}))
module.exports = {app,express}
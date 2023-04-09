const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    imageUrl:String,
    title:String,
    postedDate:Date,
    description:String
 },{collection:'jobs'})

 module.exports = {
    "jobs" : mongoose.model('jobs', jobsSchema)
 }
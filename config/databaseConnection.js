const mongoose = require('mongoose');


async function databaseConnection(){
    try {
        mongoose.set('strictQuery', false)
        const connection =  await mongoose.createConnection("mongodb+srv://grewal:grewal@grewal.08ivmla.mongodb.net/ottomons")
        console.log(connection.readyState)
        if(connection.readyState==2){
            mongoose.connect("mongodb+srv://grewal:grewal@grewal.08ivmla.mongodb.net/ottomons")
            console.log("Connected to MongoDB.")
        }else{
            console.log("Not able to connect to MongoDB.")
        }
        return connection.readyState
    } catch (err) {
        console.log(err)
        return 0
    }
}

module.exports = {databaseConnection}
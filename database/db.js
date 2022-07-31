const mongoose = require("mongoose")

const connectionDB =
mongoose.connect("mongodb+srv://AminaTahir:emi123456@cluster1.o3niq.mongodb.net/test",
{ useNewUrlParser: true, useUnifiedTopology: true}).then(
    result=>{
        console.log("Connection is succesfull with the database");
    }
).catch(
    err=>{
        console.log("Error in connecting database");
    }
)
module.exports = connectionDB
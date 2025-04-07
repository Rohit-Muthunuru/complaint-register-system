const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    email:String,
    password:String,
    role:String,
    name:String
})
module.exports=mongoose.model("auth",authSchema,"auth")
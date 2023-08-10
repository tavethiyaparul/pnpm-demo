const mongoose = require("mongoose")

const empSchama =new mongoose.Schema({
name:{
    type:String,
    trim:true
},
age:{
    type:Number,
    default:0
},
gender:{ 
    type:String,
    trim:true
}
},{
    timestamps:true
})
module.exports=mongoose.model("emp",empSchama)
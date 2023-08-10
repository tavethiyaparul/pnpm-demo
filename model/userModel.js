const mongoose = require("mongoose")
const jwt =require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    token:{
        type:String
    }
},{
    timestamps:true
})

userSchema.methods.genrateToken = async function (){
    try {
        const token = await jwt.sign({_id:this._id},"mygod")
        console.log("token",token)
        this.token=token
        return token
    } catch (error) {
        console.log("error",error);
    }
   

}
module.exports=mongoose.model("user",userSchema)
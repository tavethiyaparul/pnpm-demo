const Emp = require("../model/empModel")
const User = require("../model/userModel")
const bcrypt = require("bcrypt")

exports.getall=async(req,res)=>{
    try {
        const item_per_page = req.query.item_per_page
        const current_page_no= req.query.current_page_no
        const data = await Emp.find().skip((item_per_page * current_page_no)-item_per_page).limit(item_per_page) 
        return res.status(200).json({"emp":data})
    } catch (error) {
        console.log("error",error)
        return res.status(500).json(error)
    }
}

exports.createemp=async(req,res)=>{
    try {
        const {name,age,gender}=req.body
        const data = await Emp.create({
            name,
            age,
            gender
        }) 
        return res.status(200).json({"emp":data})
    } catch (error) {
        console.log("error",error)
        return res.status(500).json(error)
    }
}


exports.register=async(req,res)=>{
    try {
        const {email,password,conpassword}=req.body
      
        const oldUser = await User.findOne({email})
        console.log("olduser",oldUser)

        if (oldUser) {
            return res.status(400).json({message:"User Already Exist. Please Login"});
          } 

        if(password == conpassword){
             const encryptpassword = await bcrypt.hash(password,11)

             const user = await User({
                email,
                password:encryptpassword,
            });

            const token = await user.genrateToken()
            console.log("register",token)
            

            const data =await user.save()
    
            // const data = await User.create({
            //    email,
            //    password:encryptpassword,
            //    token
            // }) 
            return res.status(200).json({"user":data})
           
        }else{
            return res.status(400).json({"message":"password and confirm password not match"})
        }

       
    } catch (error) {
        console.log("error",error)
        return res.status(500).json(error)
    }
}

exports.login =async(req,res) =>{
    try {
        const {email,password}=req.body
       
        const old = await User.findOne({email:email})
       
        const ismatch = await bcrypt.compare(password,old.password)
       
        const token = await old.genrateToken()

        if(ismatch){
            console.log("login");
            return res.status(200).json({message:"login"})
        }else{
            console.log("not login");
            return res.status(200).json({message:"Not login"})
        }
    

    } catch (error) {
        console.log("error",error)
        return res.status(500).json(error)
    }

}


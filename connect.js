const mongoose = require("mongoose")

const conn =()=>{
    // return new Promise((resolve,reject)=>{
        mongoose.connect(process.env.MONGO_URL,{})
        .then(()=>{
            console.log("connect")
            // resolve();
        }).catch((error)=>{
            console.log("not connect")
            // reject(error)
        })
    // })
}
module.exports = conn
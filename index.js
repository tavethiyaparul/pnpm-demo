require("dotenv").config()
const conn =require("./connect")
const express = require("express")
const app = express()
const cors = require("cors")

conn()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin:"*"}))

app.use("/api",require("./router/empRouter"))

app.listen(9000,()=>{
    console.log("server starting  9000")
})
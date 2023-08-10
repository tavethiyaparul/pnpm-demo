const express = require("express")
const app = express()
const {getall,createemp,register,login} =require("../controller/empController")

app.get("/all",getall)
app.post("/create",createemp)
app.post("/register",register)
app.post("/login",login)

module.exports = app
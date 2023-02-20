const express=require("express")
const mongoose=require("mongoose")
const { connection } = require("./configs/connection")
const {userRoute}=require("./routes/user.route")
const {postRoute}=require("./routes/post.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
mongoose.set('strictQuery', true)
require("dotenv").config()
const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())


app.get("/",(req,res)=>{
  res.send("Home page")
})
app.use("/users",userRoute)
app.use(authenticate)
app.use("/posts",postRoute)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }
    catch(err){
        console.log("Something went wrong")
        console.log(err)
    }
    console.log(`server is running at port ${process.env.port}`)
})
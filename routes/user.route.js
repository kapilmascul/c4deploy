const express=require("express")
const bcrypt=require("bcrypt")
const {UserModel}=require("../models/User.model")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userRoute=express.Router()

userRoute.post("/register",async(req,res)=>{
   const {name,email,gender,password,age,city}=req.body
   try{
      bcrypt.hash(password,5,async(err,secure_password)=>{
        if(err){
            console.log(err)
        }else{
            const user=new UserModel({name,email,gender,password:secure_password,age,city})
            await user.save()
            res.send({"Msg":"Registered Successfully"})
        }
      });
   }
   catch(err){
    res.send({"Msg":"Error in registering the user"})
    console.log(err)
   }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        const hashedPassword=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hashedPassword,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({"msg":"Login successful","token":token})
                }else{
                    res.send({"Msg":"wrong credentials"})
                }
            })
        }else{
            res.send({"Msg":"wrong credentials"})
        }
    }catch(err){
        res.send({"msg":"something went wrong"})
        console.log(err)
    }
})

module.exports={
    userRoute
}
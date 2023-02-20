const express=require("express")
const {PostModel}=require("../models/Post.model")
const postRoute=express.Router()

postRoute.get("/",async(req,res)=>{
    try{
        const posts=await PostModel.find()
        res.send(posts)
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})

postRoute.post("/create",async(req,res)=>{
    const payLoad=req.body
    try{
        const newPost=new PostModel(payLoad)
       await newPost.save()
       res.send("Created the post")
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})

postRoute.patch("/update/:id",async(req,res)=>{
    const payLoad=req.body
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id},payLoad)
    const userId_post=post.userId_post
    const userID_making=req.body.userID
    try{
       if(userID_making!==userId_post){
        res.send({"msg":"Wrong id"})
       }else{
        await PostModel.findByIdAndUpdate({"_id":id},payLoad)
        res.send("updated the post")
       }
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})

postRoute.patch("/delete/:id",async(req,res)=>{
   
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userId_post=post.userId_post
    const userID_making=req.body.userID
    try{
       if(userID_making!==userId_post){
        res.send({"msg":"Wrong id"})
       }else{
        await PostModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the post")
       }
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})


module.exports={
    postRoute
}
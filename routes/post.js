const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


const User = mongoose.model("User")
router.post('/createpost',requireLogin,(req,res)=>{
    console.log('creating post')
    const {title,body} = req.body
    
    if(!title || !body ) {
        return res.status(422).json({error:"Please add All the fields"})
    }
     
    
    req.user.password = undefined
    const post = new Post({
        title, //if title:title we can write it like title
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result , user:req.user})
    })
    .catch(err=>{
        console.log(err)
    })
})



router.get('/mypost',requireLogin,(req,res)=>{
    
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.patch('/updatestatusdone/:postId',requireLogin,async (req,res)=>{
    try{
        console.log(req.body)
    const updatedPost = await Post.updateOne({_id: req.params.postId},{
        $set: {status:"Completed"}
    });
    res.json(updatedPost)
    }catch(err){
        res.json({
            message:err
        });
    }
})
router.patch('/updatestatusundone/:postId',requireLogin,async (req,res)=>{
    try{
        console.log(req.body)
    const updatedPost = await Post.updateOne({_id: req.params.postId},{
        $set: {status:"Not Completed"}
    });
    res.json(updatedPost)
    }catch(err){
        res.json({
            message:err
        });
    }
})



router.delete('/deletePost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json({result})
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})


module.exports = router 
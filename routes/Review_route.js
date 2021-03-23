const { json } = require('express');
const express =require('express')
const Review =require('../models/Review_model');
const { route } = require('./Product_route');
const router=express.Router();

router.post("/Review/insert66", function(req,res) {

const feed_title = req.body.feed_title;
const feed_discription =req.body.feed_discription;
const custo_name = req.body.custo_name;

const ReviewData = new Review({
    feedback_title:feed_title, 
    custo_name:custo_name,
    feedback_discrption:feed_discription});
ReviewData.save()
.then(function(result){
    res.status(201).json({success:true, message:"Review Insert Success"})
}).catch(function(e){
    res.status(500).json({message:e, success:false})
})
})

router.get('/Review/All', function(req,res){
    Review.find().then(function(data){
        res.status(200).json(data)
    }).catch (function(error){
        res.status(500).json({error:error})
    })
})

router.get('/Review/:custo_id', function(req,res){
    const id =req.params.custo_id;
    Review.findOne({_id:id}).then(function(result){
        res.status(200).json(result);
    })
    .catch(function(error){
        res.status(500).json({error:error})
    })
})

router.put('/Review/update/:custo_id', function(req,res){
    const custo_name = req.body.custo_name;
    const feedback_discrption=req.body.feedback_discrption;
    const feedback_title=req.body.feedback_title;
    const id =req.params.custo_id

Review.updateOne({_id: id}, 
    {
    custo_name:custo_name,
    feedback_discrption:feedback_discrption,
    feedback_title:feedback_title
})
.then(function(result){
    res.status(200).json({message:"Review Update Success"})
})
.catch(function(error){
    res.status(500).json({error:error})
})
})

router.delete("/Review/delete/:custo_id", function(req ,res){
    const id =req.params.custo_id;
    Review.deleteOne({_id:id}, function(result){
        res.status(200).json({message:"Review Delete Success"})
    }).catch(function(error){
        res.status(500).json({error:error})
    })
})

module.exports=router;
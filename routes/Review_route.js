const express =require('express')
const Review =require('../models/Review_model');
const router=express.Router();


router.post("/insert66", function(req,res) {

const feed_title = req.body.feed_title;
const feed_discription =req.body.feed_discription;

const Review = new Review({feedback_title:feed_title, 
    feedback_discrption:feed_discription});
feedbackdata.save();

})


module.exports=router;
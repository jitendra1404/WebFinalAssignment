const express =require('express')
const Image =require('../models/Images_model');
const upload=require('../middlewear/Upload');
const {single} =require('../middlewear/Upload');
const { route } = require('./Product_route');
const router =express.Router();

router.post("/Image/insert", upload.single('Profile'),
function(req,res) {
    if(req.file==undefined){
        return res.status(400).json({
        message:"jpg and png format allowed"})
    }
const image_name =req.body.image_name;
const Profile =req.file.path;

const ImageData = new Image({
    image_name:image_name,
    Profile:Profile,
});
ImageData.save()
.then(function(result){
    res.status(201).json({success:true, message:"Image Insert Success"})
}).catch(function(error){
    res.status(500).json({message:error, success:false})
})
})

router.get("/Image/All", function(req,res) {
    Image.find().then(function(data){
        res.status(200).json(data);
    })
    .catch(function(error){
        res.status(500).json({error:error})
    })
})

router.get("/Image/:custo_id", function(req,res){
    const id =req.params.custo_id;
    Image.findOne({_id:id}).then(function(result){
        res.status(200).json(result)
    })
    .catch(function(error){
        res.status(500).json({erorr:error})
    })
})

router.put("/update/:custo_id", function(req,res){
    const image_name=req.body.image_name;   
    const Profile = req.file.path;
    const id =req.params.custo_id;

    Image.findOne({_id:id}, {

        image_name:image_name,
        Profile:Profile
    })
    .then(function(result){
        res.status(200).json({message:"Image Update Success"})
    }).catch(function(error){
        res.status(500).json({error:error})
    }) 
})

router.delete("/Image/delete/:custo_id", 
function(req,res){
    const id =req.params.custo_id;
    Image.deleteOne({_id:id}).then(function(result){
        res.status(200).json({message:"Image delete success"})
    }).catch(function(error){
        res.status(500).json({error:error})
    })
})

module.exports=router;

const express =require('express')
const Product =require('../models/Product_model');
const upload=require('../middlewear/Upload');
const auth = require('../middlewear/Auth');
const {verifyuser, verifyAdmin} = require('../middlewear/Auth');
const { single } = require('../middlewear/Upload');
const { body } = require('express-validator');
const router =express.Router();

router.post("/Product/insert",  upload.single('ImageUrl'),
 function(req,res) {
    if(req.file==undefined){
            return res.status(400).json({
                message:"only jpg and png are allowed"
            })
        }
   const Product_name=req.body.Product_name;
   const Product_price=req.body.Product_price;
   const Product_model=req.body.Product_model;
   const Product_item =req.body.Product_item;
   const Product_info =req.body.Product_info;
   const Product_weight=req.body.Product_weight;
   const Display_size=req.body.Display_size;
   const Memory_size=req.body.Memory_size;
   const ImageUrl =req.file.path;
   
   const ProductData = new Product({
       Product_name:Product_name,
       Product_price:Product_price,
       Product_weight:Product_weight,
       Product_model:Product_model,
       Memory_size:Memory_size,
       Display_size:Display_size,
       Product_item:Product_item,
       Product_info:Product_info,
       ImageUrl:ImageUrl,
       
    });
    ProductData.save()
    .then(function(result){
        res.status(201).json({success:true, message:"Product Insert Success"})
    }).catch(function(e){
        res.status(500).json({message:e, success:false})
    })
})

router.get("/Product/All", function(req,res){
    Product.find().then(function(data){
         res.status(200).json(data);
    })
    .catch(function(error){
         res.status(500).json({error:error})
    })
})

router.get("/Product/:custo_id", function(req,res){
    const id =req.params.custo_id;
    Product.findOne({_id:id}).then(function(result){
        res.status(200).json(result);
    })
    .catch(function(error){
        res.status(500).json({error:error})
    })
})

router.put("/Product/update/:custo_id", function(req,res){

    const Product_name=req.body.Product_name;
   const Product_price=req.body.Product_price;
   const Product_model=req.body.Product_model;
   const Product_item=req.body.Product_item;
   const Product_weight=req.body.Product_weight;
   const Memory_size=req.body.Memory_size;
   const Display_size=req.body.Display_size;
   const Product_info=req.body.Product_info;
   const ImageUrl =req.file.path;
   const id =req.params.custo_id;

   Product.updateOne({_id: id}, {

       Product_name:Product_name,
       Product_price:Product_price,
       Product_model:Product_model,
       Product_item:Product_item,
       Product_weight:Product_weight,
       Memory_size:Memory_size,
       Display_size:Display_size,
       Product_info:Product_info,
       ImageUrl:ImageUrl
   })
   .then(function(result) {
       res.status(200).json({success :true, message: "Product Update Success"})
   })
   .catch(function(error){
       res.status(500).json({error:error})
   })
})

router.delete("/Product/delete/:custo_id", function(req,res){
    const id =req.params.custo_id;
Product.deleteOne({_id:id}).then(function(result){
    res.status(200).json({message:"Product Delete Success"})
}).catch(function (error){
    res.status(500).json({error:error})
})
})

module.exports=router;


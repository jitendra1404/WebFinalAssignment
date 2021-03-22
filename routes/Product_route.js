const express =require('express')
const Product =require('../models/Product_model');
const upload=require('../middlewear/Upload');
const auth = require('../middlewear/Auth');
const router =express.Router();

router.post("/Product/insert", auth.verifyuser,auth.verifyAdmin, function(req,res) {

   const Product_name=req.body.Product_name;
   const Product_price=req.body.Product_price;
   const Product_model=req.body.Product_model;
   const Product_item=req.body.Product_item;
   const Product_info=req.body.Product_info;
   const role_type =req.body.role_type

   const ProductData = new Product({
       Product_name:Product_name,
       Product_price:Product_price,
       Product_model:Product_model,
       Product_item:Product_item,
       Product_info:Product_info,
       role_type:role_type
    });
    ProductData.save();
})

router.get("/Product/All", function(req,res){
    Product.find().then(function(data){
         res.status(200).json(data);
    })
    .catch(function(error){
         res.status(500).json({error:error})
    })
})

module.exports=router;


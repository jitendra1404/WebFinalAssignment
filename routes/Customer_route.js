const express =require('express');
const Customer =require('../models/customer_model');
const router=express.Router();

// for our customer data validation
const {check, validationResult } =require('express-validator');

// for customer password encryption 
const bcryptjs =require('bcryptjs');
const jwt =require('jsonwebtoken')

const { find } = require('../models/customer_model');
const { JsonWebTokenError } = require('jsonwebtoken');
const auth11 = require('../middlewear/Auth')


//insert operation 


router.post("/insert",  auth11.verifyuser, auth11.verifyCustomer [ 
    check('custo_name', 'Customer Username is required!').not().isEmpty(),
    check('custo_address', 'Customer address is required!').not().isEmpty(),
    check('custo_mobile', 'Customer mobile number is required!').not().isEmpty(),
    check('custo_password', 'Customer password is required!').not().isEmpty(),
    check('custo_email', 'Customer email is required!').not().isEmpty()
    

], function(req,res) {

    const ValidationError = validationResult(req);  // collect error data

    //res.send(ValidationError.array());   // collecting error folder


     if (ValidationError.isEmpty())
     {
         // valid collection data
     const custo_name1 = req.body.custo_name;
     const custo_address1 = req.body.custo_address;
    const custo_mobile1 = req.body.custo_mobile;
    const custo_email1 = req.body.custo_email;
    const custo_password1 =req.body.custo_password;

    bcryptjs.hash(custo_password1, 10, function(Error, pw_hash){

          
     const data1 = new Customer({custo_name:custo_name1, custo_address:custo_address1,
        custo_mobile:custo_mobile1, custo_email:custo_email1,custo_password:pw_hash});
  data1.save()
  .then().catch(function(result){
      res.status(201).json({message : "Registered!!!"})
  })

    })

     } 
     else
  {   // invalid
        res.status(400).json(ValidationError.array())
    }

     })
            // data fetch 
            // username - kiran , password - abc
     router.post("/login", function(req,res){

      const  custo_name = req.body.custo_name;
      const  custo_password =req.body.custo_password; // sent from user


      //check user name valid
      Customer.findOne({custo_name:custo_name})
      .then(function(customerdata){

        if(customerdata === null){
            //no user found
        return res.status(403).json({message : "invalid login details!!!"})
        }
         // username found
         bcryptjs.compare( custo_password,customerdata.custo_password, function(error,res1){
             if(res1===false){

            return res.status(403).json({message : " customername/password not valid!!!"})
             }

             //  username and password is valid
             //token generate

            const token = jwt.sign({customerId:customerdata._id}, 'secretkey')
            res.status(200).json({
                token :token,
                message :"auth sucsess!!"
            })


         })

      }).catch(function(e){
          res.status(500).json({Error :e});
      })
      
     })


module.exports=router; 
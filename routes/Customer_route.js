const express = require('express');
const Customer = require('../models/customer_model');
const router = express.Router();
const upload=require('../middlewear/Upload')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewear/Auth');
const e = require('express');
const { json } = require('express');
const {check,validationResult} = require('express-validator');

//Insert ............
router.post("/user/register",  upload.single('nimage'),[
    check('custo_name', 'Customer Username is required!').not().isEmpty(),
    check('custo_password', 'Customer password is required!').not().isEmpty(),
   
], 
function (req, res) {
    const ValidationError = validationResult(req); // collect error data

    if (ValidationError.isEmpty()) { //res.send(ValidationError.array());   // collecting error folder
        // valid collection data
        //console.log(req.file);

        // if(req.file==undefined){
        //     return res.status(400).json({
        //         // message:"only jpg and png are allowed"
        //     })
        // }

        const custo_name = req.body.custo_name;
        const custo_address = req.body.custo_address;
        const custo_mobile = req.body.custo_mobile;
        const custo_email = req.body.custo_email;
        const custo_password = req.body.custo_password;
        const role = req.body.role
        const nimage= "";

        bcryptjs.hash(custo_password, 10, function (error, pw_hash) {

            const data = new Customer({
                custo_name: custo_name,
                custo_address: custo_address,
                custo_mobile: custo_mobile,
                custo_email: custo_email,
                custo_image:nimage,
                role:role,
                custo_password: pw_hash
            });
            data.save()
            .then(function (result) {
                    res.status(201).json({
                        success: true,
                        token: null
                    })
                }).catch(error => res.json({message : error.message, success : false}))
        })
    } 
    else { 
        console.log(ValidationError.array())
        res.status(400).json( ValidationError.array());
    }
})

router.post("/user/login", function (req, res) {

    const custo_name = req.body.username;
    const custo_password = req.body.password; // sent from user

    //find Single Specific user detail 
    Customer.findOne({custo_name: custo_name})
        .then(function (customerdata) {

            if (customerdata===null) {
                return res.status(403).json({
                    message: "Login Fail!!!"
                })
            }
            // username found
            bcryptjs.compare(custo_password, customerdata.custo_password, function (error, res1) {
                if (res1 === false) {

                    return res.status(403).json({
                        message: " Invalid Userdetail!!!"
                    })
                }

                const token = jwt.sign({    //  username and password is valid //token generate
                    customerId: customerdata._id
                }, 'secretkey')
                res.status(200).json({
                    token: token,
                    success: true
                })

            })

        }).catch(function (e) {
            res.status(500).json({Error: e});
    })

})

 // Get All Users..............
 router.get("/Customer/all", function (req, res) {
    Customer.find()
        .then(function(data) {
            res.status(200).json(data);
        })
        .catch(function (er) {
            res.status(500).json({
                error: er
        })
    })
})

    // get Single user...........
    router.get("/Customer/:custo_id", function(req, res) {
        const id = req.params.custo_id;
        Customer.findOne({_id:id}).then (function(result){
            res.status(200).json(result);
        })
        .catch(function(er){
        res.status(200) .json({error:er})
        })

    })
// for update 
router.put("/user/update/:custo_id", function (req, res) {

    const custo_name = req.body.custo_name;
    const custo_address = req.body.custo_address;
    const custo_mobile = req.body.custo_mobile;
    const custo_email = req.body.custo_email;
    const custo_password = req.body.custo_password;
    const id = req.params.custo_id;

    Customer.updateOne({ _id: id
        }, {
            custo_email: custo_email,
            custo_name : custo_name,
            custo_address:custo_address,
            custo_mobile:custo_mobile,
            custo_password:custo_password
        })
        .then(function (result) {
            res.status(200).json({
                message: "Update Successful"
            })
        })
        .catch(function (e) {
            res.status(500).json({
                error: e
            })
        })
})
// for delete

router.delete("/delete/:custo_id", function (req, res) {
    const id = req.params.custo_id;
    Customer.deleteOne({_id:id}).then(function (result) {
            res.status(200).json({
                message: "Delete Successful"
            })
        })
        .catch(function (e) {
            res.status(500).json({
                error: e
            })
        })
})

module.exports = router;
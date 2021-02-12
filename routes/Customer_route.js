const express = require('express');
const Customer = require('../models/customer_model');
const router = express.Router();

const upload=require('../middlewear/Upload')

// for our customer data validation
const {
    check,
    validationResult
} = require('express-validator');

// for customer password encryption 
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middlewear/Auth');
const e = require('express');
const { json } = require('express');


//insert operation 

router.post("/insert", upload.single('nimage'),[
    check('custo_name', 'Customer Username is required!').not().isEmpty(),
    check('custo_address', 'Customer address is required!').not().isEmpty(),
    check('custo_mobile', 'Customer mobile number is required!').not().isEmpty(),
    check('custo_password', 'Customer password is required!').not().isEmpty(),
    check('custo_email', 'Customer email is required!').not().isEmpty()
], function (req, res) {
    const ValidationError = validationResult(req); // collect error data

    //res.send(ValidationError.array());   // collecting error folder

    if (ValidationError.isEmpty()) {
        // valid collection data
        //console.log(req.file);

        if(req.file==undefined){
            return res.status(400).json({
                message:"only jpg and png are allowed"
            })
        }

        const custo_name = req.body.custo_name;
        const custo_address = req.body.custo_address;
        const custo_mobile = req.body.custo_mobile;
        const custo_email = req.body.custo_email;
        const custo_password = req.body.custo_password;
        const nimage=req.file.path;

        bcryptjs.hash(custo_password, 10, function (error, pw_hash) {

            const data = new Customer({
                custo_name: custo_name,
                custo_address: custo_address,
                custo_mobile: custo_mobile,
                custo_email: custo_email,
                custo_image:nimage,
                custo_password: pw_hash
            });
            data.save()
                .then().catch(function (result) {
                    res.status(201).json({
                        message: "Registered!!!"
                    })
                })
        })
    } else { // invalid
        res.status(400).json(ValidationError.array())
    }

})
// data fetch 
// username - kiran , password - abc
router.post("/login", function (req, res) {

    const custo_email = req.body.custo_email;
    const custo_password = req.body.custo_password; // sent from user


    //check user name valid
    Customer.findOne({
            custo_email: custo_email
        })
        .then(function (customerdata) {

            if (customerdata === null) {

                return res.status(403).json({
                    message: "invalid login details!!!"
                })
            }
            // username found
            bcryptjs.compare(custo_password, customerdata.custo_password, function (error, res1) {
                if (res1 === false) {

                    return res.status(403).json({
                        message: " customername/password not valid!!!"
                    })
                }

                //  username and password is valid
                //token generate

                const token = jwt.sign({
                    customerId: customerdata._id
                }, 'secretkey')
                res.status(200).json({
                    token: token,
                    message: "auth sucsess!!"
                })


            })

        }).catch(function (e) {
            res.status(500).json({
                Error: e
            });
        })

})
// for update 
router.put("/update/:custo_id", function (req, res) {

    const custo_name = req.body.custo_name;
    const custo_address = req.body.custo_address;
    const custo_mobile = req.body.custo_mobile;
    const custo_email = req.body.custo_email;
    const custo_password = req.body.custo_password;
    const id = req.params.custo_id;

    Customer.updateOne({
            _id: id
        }, {
            custo_email: custo_email,
            custo_name : custo_name
        })
        .then(function (result) {
            res.status(200).json({
                message: "update"
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
                message: "delete"
            })
        })
        .catch(function (e) {
            res.status(500).json({
                error: e
            })
        })
        
    // for get function 

    router.get("/Customer/all", function (req, res) {
        Customer.find()
            .then(function (data) {
                res.status(200).json(data);
            })
            .catch(function (er) {
                res.status(500).json({
                    error: er
            })
        })
    })
})

module.exports = router;
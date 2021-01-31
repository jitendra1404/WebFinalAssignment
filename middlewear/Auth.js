    const jwt =require('jsonwebtoken');
const CustomerFeedback = require('../models/customerfeedback_model');
    const {findOne} = require('../models/customer_model')  
    const Customer =require('../models/customer_model') 
    
    
// main ..................guard

    module.exports.verifyuser = function(req, res, next) {

        try {
            const token =req.headers.authorization.split(" ")[1]; //token fetch and split
            const data = jwt.verify(token, 'secretkey')
            // we have id only
           // console.log(data.customerdata._id)
            Customer.findOne({_id:data.customerdata._id})
            .then (function(result){
                req.userinfo =result;
                next();

            })
            .catch(function(e){
                res.status(401).json({Error : e})
            })

        }
        catch(e) {
            res.status(401).json({saroj: e})
        }
      
    
//console.log(token);

    }

    // second...............guard for admin


    module.exports.verifyAdmin = function(req,res,next) {

    }

const jwt =require('jsonwebtoken');
const Review = require('../models/Review_model');
    const {findOne} = require('../models/customer_model')  
    const Customer =require('../models/customer_model') 
    
    
// main ..................guard

    module.exports.verifyuser = function(req, res, next) {

        try {
            const token =req.headers.authorization.split(" ")[1]; //token fetch and split
            const data1 = jwt.verify(token, 'secretkey')
            // we have id only
           // console.log(data.customerdata._id)
            Customer.findOne({_id:data1.CustomerId})
            .then (function(result){
                req.userInfo =result;   // all information about the user (username, password, usertype)
                next();

            })
            .catch(function(e){
                res.status(401).json({error : e})
            })

        }
        catch(e) {
            res.status(401).json({error: e})
        }
      
    
//console.log(token);

    }

    // second...............guard for admin


    module.exports.verifyAdmin = function(req,res,next) {
        if(!req.userInfo) {
            return res.status(401).json({message : "invalid Users!"});
        }
        else if(req.userInfo.usertype!=='Admin'){
            return req.status(401).json({message : "Unauthorized!!"})

        }
        next();

    }
        // guard for customer .................

        module.exports.verifyCustomer = function(req,res,next) {
            if(!req.userInfo) {
                return res.status(401).json({message : "invalid Users!"});
            }
            else if(req.userInfo.usertype!=='Customer'){
                return req.status(401).json({message : "Unauthorized!!"})
    
            }
            next();
    }

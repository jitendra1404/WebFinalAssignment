    const jwt =require('jsonwebtoken')
    
    module.exports.verifyuser = function(req, res, next) {
        const token =req.headers.authorization.split("")[1];
       const data = jwt.verify(token, 'secretkey')
    

//console.log("hi i am your guard");
next();

    }
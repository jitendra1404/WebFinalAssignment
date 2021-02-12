const mongoose=require('mongoose')

const Customer =mongoose.model('customer', {

    custo_name : {
        type : String,
        required :true,
        unique :true
        
    },

    custo_address : {
        type:String,
        required:true
    },

    custo_mobile : {
        type:String,
        required:true
    },

    custo_email : {
        type:String,
        required : true
    }, 
    custo_image : {
        type:String,
        required : true
    }, 

    custo_password : {
        type : String,
        required:true
    }, 
    usertype : {
        type :String,
        enum : ['Admin', 'Customer'],
        default : 'Customer'
    }

})

module.exports=Customer; 
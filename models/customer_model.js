const mongoose=require('mongoose')

const Customer =mongoose.model('customer', {

    custo_name : {
        type : String,
        required :true
        
    },

    custo_address : {
        type:String
        
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
        default:"noimage.jpg"

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
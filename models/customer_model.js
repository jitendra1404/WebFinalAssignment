const mongoose=require('mongoose')

const Customer =mongoose.model('Customer', {

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

    custo_password : {
        type : String,
        required:true
    }

})

module.exports=Customer; 
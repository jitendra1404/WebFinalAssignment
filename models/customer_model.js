const mongoose=require('mongoose')

const Customer =mongoose.model('customer', {

    custo_name : {
        type : String,
        required :true,
        unique:true,
        trim:true },

    custo_address : {
        type:String,
        require:true },

    custo_mobile : {
        type:String,
        required:true,
        min:9,
        max:10
     },

    custo_email : {
        type:String,
        required : true,
        lowercase:true
     },

    custo_password : {
        type : String,
        required:true
    }, 
    role : {
        type :String,
        enum : ['Admin','Customer'],
        default : 'Admin'
    }

})

module.exports=Customer; 
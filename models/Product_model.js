const mongoose =require('mongoose')

const Product =mongoose.model('Product', {

    Product_name :{
        type:String,
        require:true,
        trim:true
    },
    Product_price :{
        type:Number,
        require:true
    },

    Product_item :{
        type :Number,
        require:true
    },

    Product_model :{
        type:String,
        require:true
    },

    Product_info :{
        type:String,
        require:true,
        mixlength:10,
        maxlength:100
    },

    Product_image:{
        type:String,
        require:true
    },
    
    role_type : {
        type :String,
        enum : ['Admin','Customer'],
        default : 'Admin'
    }
})

module.exports = Product;
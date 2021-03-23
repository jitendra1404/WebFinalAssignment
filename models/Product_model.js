const mongoose =require('mongoose')

const Product = mongoose.model('Product', {

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

ImageUrl:{
        type:String,
        require:true
    },
})

module.exports = Product;
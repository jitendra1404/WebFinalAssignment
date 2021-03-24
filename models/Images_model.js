const mongoose =require('mongoose');

const Image = mongoose.model('Image', {
    image_name:{
        type:String,
        require:true,
        trim:true
    },

    Profile:{
        type:String,
        require:true
    }  
})

module.exports= Image;

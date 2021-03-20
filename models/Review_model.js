const mongoose =require('mongoose')

const Review =mongoose.model('Review', {

    feedback_title : {
        type : String,
        require:true
    },

    feedback_discrption : {
        type :String,
        require:true
    },
    custo_name:{
        type:String,
        require:true
    }
   
})
 module.exports=Review;

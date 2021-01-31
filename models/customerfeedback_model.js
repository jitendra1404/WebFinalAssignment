const mongoose =require('mongoose')

const CustomerFeedback =mongoose.model('customerfeedback', {

    feedback_title : {
        type : String
    },

    feedback_discrption : {
        type :String
    }
   
})
 module.exports=CustomerFeedback;

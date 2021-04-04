const mongoose =require('mongoose');

const Appointment =mongoose.model('Appointment', {

    device_name : {

        type :String,
        require : true,
        trim:true,
    },

    device_model : {

        type :String, 
        required : true
    },

    appointment_date : {

        type : Date,
        default:Date.now
    },
    
    location : {
        type : String,
        required : true
    },

    Issue : {
        type : String,
        required : true,
        minlength:10,
        maxlength:200,

    }
   
})

module.exports = Appointment;
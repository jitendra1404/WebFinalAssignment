const mongoose =require('mongoose');

const Appointment =mongoose.model('Appointment', {

    device_name : {
        type :String,
        require:true,
        trim:true,
    },

    device_model : {
        type :String, 
        require:true
    },

    appointment_date : {
        type : Date,
        default:Date.now
    },
    
    location : {
        type : String,
        require:true   
    },

    issue : {
        type : String,
        require:true,
        minlength:10,
        maxlength:200,
    }
   
})

module.exports = Appointment;
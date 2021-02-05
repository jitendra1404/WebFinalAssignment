const mongoose =require('mongoose');

const Appointment =mongoose.model('Appointment', {

    device_name : {

        type :String,
        require : true
    },

    device_model : {

        type :String, 
        required : true
    },

    appointment_date : {

        type : String,
        required : true 
    },

    appointment_type : {
        type : String,
        required : true
    },

    Description : {
        type : String,
        required : true
    },

    Custo_id : {
        type : String,
        required :true
    }
})

module.exports = Appointment;
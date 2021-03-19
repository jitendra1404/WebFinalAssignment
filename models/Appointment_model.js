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

    custo_name : {
        type : String,
        required : true
    },

    custo_mobile : {
        type : String,
        required : true
    },
    
    custo_address : {
        type : String,
        required : true
    },

    Description : {
        type : String,
        required : true
    },

    Custo_id : {
        type : String,
        default:"no custo_id"
    },
    role : {
        type :String,
        enum : ['Admin','Customer'],
        default : 'Customer'
    }
})

module.exports = Appointment;
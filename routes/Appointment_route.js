const express =require('express')
const Appointment =require('../models/Appointment_model');
const router=express.Router();


router.post("/insert6", function(req,res) {
     
const device_name =req.body.device_name;
const device_model =req.body.device_model;
const appointment_date =req.body.appointment_date;
const appointment_type =req.body.appointment_type;
const Description =req.body.Description;

const Appointmentdata = new Appointment({device_name:device_name,
     device_model:device_model, appointment_type:appointment_type, 
     appointment_date:appointment_date, Description:Description});
Appointmentdata.save();

})

module.exports=router;
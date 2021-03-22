const express =require('express')
const Appointment =require('../models/Appointment_model');
const router=express.Router();


router.post("/Appointment/insert6", function(req,res) {
   
const device_name =req.body.device_name;
const device_model =req.body.device_model;
const appointment_date =req.body.appointment_date;
const Location =req.body.Location;
const Description =req.body.Description
const role =req.body.role
const custo_id = "";

const Appointmentdata = new Appointment({ custo_id:custo_id,
     Description:Description,
     device_name:device_name,device_model:device_model,
     appointment_date:appointment_date, Location:Location, role:role});
Appointmentdata.save();
})

router.get("/Appointment/All", function(req,res){
     Appointment.find().then(function(data){
          res.status(200).json(data);
     })
     .catch(function(error){
          res.status(500).json({error:error})
     })
})

router.get("/Appointment/:custo_id", function(req, res) {
     const id = req.params.custo_id;
     Appointment.findOne({_id:id}).then (function(result){
         res.status(200).json(result);
     })
     .catch(function(er){
     res.status(200) .json({error:er})
     })
 })

 // For Appointment update

 router.put("/Appointment/update/:custo_id", function (req, res) {

     const custo_name = req.body.custo_name;
     const custo_mobile = req.body.custo_mobile;
     const custo_address = req.body.custo_address;
     const device_name =req.body.device_name;
     const device_model =req.body.device_model;
     const appointment_date =req.body.appointment_date;
     const Description =req.body.Description
     const id = req.params.custo_id;
 
     Appointment.updateOne({ _id: id
         }, {
             custo_name : custo_name,
             custo_mobile:custo_mobile,
             custo_address: custo_address,
            device_name:device_name,
            device_model:device_model,
            appointment_date:appointment_date,
            Description:Description

         })
         .then(function (result) {
             res.status(200).json({
                 message: " Appointment Update Successful"
             })
         })
         .catch(function (e) {
             res.status(500).json({
                 error: e
             })
         })
 })
 // for Appointment delete
 
 router.delete("/Appointment/delete/:custo_id", function (req, res) {
     const id = req.params.custo_id;
     Appointment.deleteOne({_id:id}).then(function (result) {
             res.status(200).json({
                 message: " Appointment Delete Successful"
             })
         })
         .catch(function (e) {
             res.status(500).json({
                 error: e
             })
         })
 })

module.exports=router;
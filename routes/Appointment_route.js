const express =require('express')
const Appointment =require('../models/Appointment_model');
const router=express.Router();

//Appointment insert........
router.post("/Appointment/insert",  function(req,res) {

const device_name =req.body.device_name;
const device_model =req.body.device_model;
const appointment_date =req.body.appointment_date;
const location =req.body.location;
const issue =req.body.issue

const Appointmentdata = new Appointment({
     device_name:device_name,
     device_model:device_model,
     appointment_date:appointment_date, 
     location:location,
     issue:issue
    });

Appointmentdata.save()
.then(function(result){
    res.status(201).json({
        success:true, 
        message:"Appointment Insert Success"})
}).catch(function(e)
{res.status(500).json({message:e, success:false})
    })
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
     res.status(500) .json({error:er})
     });
 });

 // For Appointment update

 router.put("/Appointment/update/:custo_id", function (req, res) {

    const device_name =req.body.device_name;
    const device_model =req.body.device_model;
    const appointment_date =req.body.appointment_date;
    const location =req.body.location;
    const issue =req.body.issue
    const id = req.params.custo_id;
 
     Appointment.updateOne({ _id: id
         }, {
            location: location,
            device_name:device_name,
            device_model:device_model,
            appointment_date:appointment_date,
            issue:issue
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
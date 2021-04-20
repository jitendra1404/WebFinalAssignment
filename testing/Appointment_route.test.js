const express =require('express');
const request =require('supertest');

const Appointment_router = require('../routes/Appointment_route');
require('./setup')

const app =express();

app.use(express.json());
app.use('/', Appointment_router);

describe('test for Appointment router', () => {
    test('should be able to appointment a new product for repair', () => {
        return request(app).post("/Appointment/insert")
        .send({
            "device_name":"laptop",
            "device_model":"dell5559",
            "appointment_date":"10-10-2010",
            "location":"pune",
            "issue":"battery not working"
        })
        .then(res => {
            expect(res.statusCode).toBe(201);

        });
    });

    test('should not be able to appointment a product for repair without devicename', ()=> {
        return request(app).post('/Appointment/insert')
        .send({
            "device_model":"dell5559",
            "appointment_date":"10-10-2010",
            "location":"pune",
            "issue":"battery not working"
        })
        .then(res=> {
            expect(res.statusCode).toBe(400);
        });
    });
});

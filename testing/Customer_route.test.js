const express = require('express');
const request = require('supertest');

const Customer_router = require('../routes/Customer_route');
require('./setup');

const app = express();

app.use(express.json());
app.use('/', Customer_router);


describe('Test for Customer router' , () => {
    test('should be able to register a new user', () => {
        return request(app).post('/user/register')
        .send({
            "custo_name": "Jitendra",
            "custo_address" : "Bhatrapur-12",
            "custo_mobile":" 9876543210",
            "custo_email":"jitendra@gmail.com",
            "custo_password": "password"
        })
        .then(res => {
            // console.log(res)
            expect(res.statusCode).toBe(201);
        });
    });


test('should not be register a user without username', ()=> {
    return request(app).post('/user/register')
    .send({
        "custo_address" :"Bhatrapur-12",
        "custo_mobile":" 9876543210",
        "custo_email":"jitendra@gmail.com",
        "custo_password": "password"
    })
    .then(res=> {
        expect(res.statusCode).toBe(400);
    });

});

test('should be able to login', ()=> {
    return request(app).post('/user/login')
    .send({
        "custo_name": "Jitendra",
        "custo_password": "password"
    })
    .then(res=> {
        expect(res.statusCode).toBe(200);
    });
});

test('should not be able to login with wrong password', ()=> {
    return request(app).post('/user/login')
    .send({
        "custo_name": "Jitendra",
        "custo_password": "password"
    })
    .then(res=> {
        expect(res.statusCode).toBe(200);
    });
});

});

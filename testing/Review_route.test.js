const express =require('express');
const request =require('supertest');


const Review_route =require('../routes/Review_route');
require('./setup');

const app =express();

app.use(express.json());
app.use('/', Review_route);

describe('Test for Review router', ()=> {
    test('should be able to give service Review', () => {
        return request(app).post('/Review/insert66')
        .send({
            "feedback_title":"laptop Battery repair",
            "feedback_discription":"technician are porvide best service",
            "custo_name":"Ashish"
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });

    });

        test('should be able to give service Review without feedback title', () => {
            return request(app).post('/Review/insert66')
            .send({
              
                "feedback_discription":"technician are porvide best service",
                "custo_name":"Ashish"
            })
            .then(res => {
                expect(res.statusCode).toBe(400);
            });
    
        });
});
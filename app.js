const mongoose =require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');

const Customer =require('./database/Customer');
const Customer_route = require('./routes/Customer_route')
const Feedback_route =require('./routes/Feedback_route')

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(Customer_route);
app.use(Feedback_route);

app.listen(90);


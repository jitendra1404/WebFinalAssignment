const mongoose =require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors =require('cors')
const Customer =require('./database/Customer');
const Customer_route = require('./routes/Customer_route')
const Review_route =require('./routes/Review_route')
const Appointment_route =require('./routes/Appointment_route')
const Product_route =require('./routes/Product_route')

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(Customer_route);
app.use(Review_route);
app.use(Appointment_route);
app.use(Product_route)

app.listen(90);


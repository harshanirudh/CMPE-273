var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql=require('./db-config')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter=require('./routes/Login')
var restaurantDishRouter=require('./routes/Dishes')
var restaurantImagesRouter=require('./routes/RestImages')
var favouriteRouter=require('./routes/Favourites')
var deliveryAddressRouter=require('./routes/DeliveryAddress')
var ordersRouter=require('./routes/Orders')
const cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: ['http://localhost:3000','http://54.183.13.45:3000/'],
    credentials: true
}));

app.use(session({
    secret              : 'Cmpe273lab1@ubereats',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter)
app.use('/restaurant',restaurantDishRouter)
app.use('/restaurant/images',restaurantImagesRouter)
app.use('/favourites',favouriteRouter);
app.use('/deliveryAddress',deliveryAddressRouter)
app.use('/orders',ordersRouter)
module.exports = app;

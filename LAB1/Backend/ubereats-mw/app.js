var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
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
    origin: '*'
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

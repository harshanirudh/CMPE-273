const { json } = require('express');
const bcrypt = require('bcryptjs');
var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service');
const app = require('../app');
const Customer = require('../models/CustomerModel');
const Restaurant=require('../models/RestaurantModel')
/**
 * Define the no of salt rounds for hashing
 */
const saltRounds = 5;
/* GET users listing. */
router.get('/customers', async function (req, res, next) {
  try {
    res.json(await service.getCustomerUsers());
  } catch (err) {
    res.status(500).send(err)
  }
});

/**
 * Get customers by customer ID
 */
router.get('/customers/:id', async function (req, res) {
  try {
    return res.status(200).send(await service.getCustomerById(req.params.id));
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
});
/**
 * Save new Customer
 */
const customerPostValidator = validator.check(['fname', 'lname', 'email', 'pass'], 'Bad Request').exists();
router.post('/customer', customerPostValidator, async (req, res) => {
  try {
    validator.validationResult(req).throw();
    // let saveCustomer = 'set @id = 0;call uber_eats.SP_Add_New_Customer(?,?,?,?,@id);select @id;'
    let { fname, lname, email, pass } = req.body;
    let hashPass = await bcrypt.hash(pass, saltRounds)
    const customer = new Customer({
      FNAME: fname,
      LNAME: lname,
      EMAIL: email,
      PASS: hashPass
    })
    customer.save().then((result) => {
      res.status(201).send({ id: result._id })
    }).catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
  }
  catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})
/**
 * Update Customer Profile
 */
const custPutValidator = validator.check(['about', 'add', 'city', 'country', 'dob', 'email', 'fname', 'lname', 'phone', 'state'], 'Bad Request').exists()
router.put('/customer/:id', custPutValidator, async (req, res) => {
  try {
    validator.validationResult(req).throw();
    // let updateCustomer = "update customer_users set fname=?,lname=?,email=?,nickname=?,about=?,profile_pic=?,street=?,city=?,state=?,country=?,dob=?,zipcode=?,phone=? where CUST_ID=?";
    let { fname, lname, email, nickname, about, profile_pic, add, city, state, country, dob, zipcode, phone } = req.body;
    // let result = await pool.query(updateCustomer, [fname, lname, email, nickname, about, profile_pic, add, city, state, country, dob,zipcode, phone, req.params.id])
    // console.log(result)
    const customer ={
      FNAME: fname,
      LNAME: lname,
      EMAIL: email,
      NICKNAME: nickname,
      ABOUT: about,
      PROFILE_PIC: profile_pic,
      STREET: add,
      CITY: city,
      STATE: state,
      COUNTRY: country,
      DOB: dob,
      ZIPCODE: zipcode,
      PHONE: phone
    }
    let result=await Customer.findByIdAndUpdate(req.params.id,customer)
    res.status(200).json({ result:result })
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
})
/**
 * Get Customers Location from profile
 */
router.get('/customer/location/:id', async (req, res) => {
  try {
    // let locationQuery = "select CITY as location from customer_users where cust_id=?"
    // let location = await pool.query(locationQuery, [req.params.id]);
    let result=await Customer.findById(req.params.id);
    let location=await result?.CITY;
    res.status(200).json({location:location})
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

/**
 * Get All Unique restaurants and single image
 */
router.get('/restarunt', async(req, res) => {
  // let query = `select t1.*,t2.IMAGE_ID,t2.IMAGE from restaurant_users t1 left join(
  //   select * from restaurant_images group by REST_ID ) t2 on t1.REST_ID=t2.REST_ID`;
  // pool.execute(query).then((resp => {
  //   res.status(200).send(resp[0]);
  // })).catch((err) => {
  //   res.status(500).send(err);
  // });
  try{
  let result=await Restaurant.find({})
  res.send(result)
  }catch(err){
    console.log(err)
    res.status(500).send(err)
  }
})
/**
 * Get restaurant by restaurant ID
 */
router.get('/restarunt/:id', async(req, res) => {
  // let query = "select REST_ID,RNAME,EMAIL,STREET,CITY,STATE,COUNTRY,ZIPCODE,PHONE,RDESCRIPTION,START_TIME,END_TIME,RDELIVERY_MODE from restaurant_users where rest_id=?";
  // pool.execute(query, [req.params.id]).then((resp) => {
  //   res.status(200).send(resp[0]);
  // }).catch((err) => {
  //   console.log(err);
  //   res.status(500).send(err);
  // })
  try{
    let result=await Restaurant.findById(req.params.id)
    res.send(result);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
})
/**
 * Save New Restaurant
 */
const restPostValidator = validator.check(['add', 'city', 'country', 'email', 'pass', 'rname', 'state', 'zipcode'], 'Bad Request').exists();
router.post('/restaurant', restPostValidator, async (req, res) => {
  try {
    validator.validationResult(req).throw();
    // let saveRestaurant = 'set @id = 0;call uber_eats.SP_Add_New_Restaurant(?,?,?,?,?,?,?,?,@id);select @id;'
    let { add, city, country, email, pass, rname, state, zipcode } = req.body;
    let hashPass = await bcrypt.hash(pass, saltRounds)
    // pool.query(saveRestaurant, [rname, add, city, state, zipcode, country, email, hashPass]).then(resp => {
    //   resp = Object.values(JSON.parse(JSON.stringify(resp)));
    //   console.log(resp[0][2][0])
    //   res.status(201).json(resp[0][2][0]);
    // }).catch((err) => {
    //   console.log(err)
    //   res.status(500).send(err);
    // })
    const newRest=new Restaurant({
      RNAME:rname,
      EMAIL:email,
      PASS:hashPass,
      STREET:add,
      CITY:city,
      STATE:state,
      ZIPCODE:zipcode,
      COUNTRY:country,
      RDELIVERY_MODE:"both"
    })
    let result=await newRest.save();
    res.status(201).send({id:result._id})
  }
  catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})

/**
 * Update Restaurant profile
 * 
 */
const restPutValidator = validator.check(['add', 'city', 'country', 'email', 'rname', 'state', 'zipcode', 'rdeliverymode'], 'Bad Request').exists();
router.put('/restaurant/:id', restPutValidator, async (req, res) => {
  try {
    validator.validationResult(req).throw();
    // let updateRestProfile = "update restaurant_users set rname=?,email=?,street=?,city=?,state=?,country=?,zipcode=?,phone=?,rdescription=?,start_time=?,end_time=? ,rdelivery_mode=? where rest_id=?"
    let { add, city, state, country, zipcode, email, rname, desc, phone, stime, etime, rdeliverymode } = req.body
    // let result = await pool.query(updateRestProfile, [rname, email, add, city, state, country, zipcode, phone, desc, stime, etime, rdeliverymode, req.params.id])
    let result=await Restaurant.findByIdAndUpdate(req.params.id,{
      RNAME:rname,
      RDESCRIPTION:desc,
      EMAIL:email,
      PHONE:phone,
      STREET:add,
      CITY:city,
      STATE:state,
      COUNTRY:country,
      ZIPCODE:zipcode,
      START_TIME:stime,
      END_TIME:etime,
      RDELIVERY_MODE:rdeliverymode
    })
    console.log(result)
    let affectedRows = await result._id?1:0;
    res.status(200).json({ affectedRows })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
module.exports = router;

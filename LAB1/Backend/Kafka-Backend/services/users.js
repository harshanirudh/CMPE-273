const bcrypt = require('bcryptjs');
const Customer = require('../models/CustomerModel');
const Restaurant=require('../models/RestaurantModel')
const saltRounds = 5;
async function handle_get_customer_byId(req,callback){
    try {
        let result=await Customer.findById(req.params.id)
         callback(null,result);
      } catch (err) {
        console.log(err)
        callback(err,null)
      }
}
async function handle_save_customer(req,callback){
    try {
        // validator.validationResult(req).throw();
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
          callback(null,{ id: result._id })
        }).catch((err) => {
          console.log(err)
         callback(err,null)
        })
      }
      catch (err) {
        console.log(err);
        callback(err,null)
      }
}
async function handle_update_customer(req,callback){
    try {
        let { fname, lname, email, nickname, about, profile_pic, add, city, state, country, dob, zipcode, phone } = req.body;
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
        let affectedRows = await result._id?1:0;
       callback(null,{ affectedRows })
      //  callback(null,{ result:result })
      } catch (err) {
        console.log(err)
        callback(err,null)
      }
}
async function handle_get_customerLocation(req,callback){
    try {
       
        let result=await Customer.findById(req.params.id);
        let location=await result?.CITY;
        callback(null,{location:location})
      } catch (err) {
        console.log(err)
        callback(err,null)
      }
}
async function handle_get_all_restaurants(req,callback){
    try{
        let result=await Restaurant.find({})
        callback(null,result)
        }catch(err){
          console.log(err)
          callback(err,null)
        }
}
async function handle_get_restaurant_byId(req,callback){
    try{
        let result=await Restaurant.findById(req.params.id)
       callback(null,result);
      }catch(err){
        console.log(err);
        callback(err,null)
      }
}
async function handle_save_new_restaurant(req,callback){
    try {
        // validator.validationResult(req).throw();
        let { add, city, country, email, pass, rname, state, zipcode } = req.body;
        let hashPass = await bcrypt.hash(pass, saltRounds)
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
        callback(null,{id:result._id})
      }
      catch (err) {
        console.log(err);
       callback(err,null);
      }
}
async function handle_update_restaurant(req,callback){
    try {
        let { add, city, state, country, zipcode, email, rname, desc, phone, stime, etime, rdeliverymode } = req.body
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
       callback(null,{ affectedRows })
      } catch (err) {
        console.log(err)
        callback(err,null)
      }
}
exports.handle_get_customer_byId=handle_get_customer_byId;
exports.handle_save_customer=handle_save_customer;
exports.handle_update_customer=handle_update_customer;
exports.handle_get_customerLocation=handle_get_customerLocation;
exports.handle_get_all_restaurants=handle_get_all_restaurants;
exports.handle_get_restaurant_byId=handle_get_restaurant_byId;
exports.handle_save_new_restaurant=handle_save_new_restaurant;
exports.handle_update_restaurant=handle_update_restaurant;
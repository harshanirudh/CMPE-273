const CustomerModel=require('../models/CustomerModel')
const RestaurantModel = require('../models/RestaurantModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config =require('../config')
exports.handle_customer_login=async function handle_customer_login(req,callback){
    let authenticated = false;
    let customerRole="CUSTOMER"
    try {
        // validator.validationResult(req).throw();
        let { email, pass } = req.body
        let result=await CustomerModel.findOne({EMAIL:email}).select(["PASS","CUST_ID"])
        console.log(result)
        let hash = result?.PASS
        let cust_id= result?._id
        if (hash) {
            authenticated = await bcrypt.compare(pass, hash)
            console.log(authenticated)
            if(authenticated){ 
                let token=jwt.sign({user:email,role:customerRole,id:cust_id},config.JWT_SECRET)
                // res.status(200) 
                callback(null,{ authenticated ,cust_id,token})
            }else {
                // res.status(403)
                callback(null,{ authenticated ,cust_id,token:null})
            }
        } else {
           callback(null,{ authenticated })
        }
    } catch (err) {
        console.log(err);
        callback(err,null);
    }
}
exports.handle_restaurant_login=async function handle_restaurant_login(req,callback){
    let authenticated = false;
    let restRole="RESTAURANT"
    try {
        // validator.validationResult(req).throw();
        let { email, pass } = req.body
        let result=await RestaurantModel.findOne({EMAIL:email}).select(["PASS","CUST_ID"])
        let hash = result?.PASS
        let rest_id= result?._id
        if (hash) {
            authenticated = await bcrypt.compare(pass, hash)
            console.log(authenticated)
            if(authenticated){ 
                let token=jwt.sign({user:email,role:restRole,id:rest_id},config.JWT_SECRET)
                // res.status(200)
                callback(null,{ authenticated ,rest_id,token})
            }else{
                // res.status(403)
                callback(null,{ authenticated ,rest_id,token:null})
            }
        } else {
            callback(null,{ authenticated })
        }
    } catch (err) {
        console.log(err);
        callback(err,null);
    }
}
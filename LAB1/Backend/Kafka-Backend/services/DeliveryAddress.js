const DeliveryAddressModel = require('../models/DeliveryAddressModel')
async function handle_post_delivery_address(req, callback){
    console.log("Inside post delivery address kafka backend");
    console.log(req);
    // callback(null, req);
    try{
    let {name,add,city,zipcode}=req.body
    const delAdd=new DeliveryAddressModel({
        CUST_ID:req.params.custId,
        CNAME:name,
        ADDRESS:add,
        CITY:city,
        ZIPCODE:zipcode
    })
    let result=await delAdd.save({new:true})
    // res.status(201).send(result)
    callback(null, result);
    }
    catch(err){
        console.log("Error while saving delivery address",err);
        callback(null, err);
    }

    console.log("after callback");
};
async function handle_get_delivery_address(req,callback){
    try{
        let result=await DeliveryAddressModel.find({CUST_ID:req.params.custId})
        callback(null, result);
    }catch(err){
        console.log(err)
        callback(err, "Failed");
    }
}
exports.handle_post_delivery_address = handle_post_delivery_address;
exports.handle_get_delivery_address=handle_get_delivery_address;
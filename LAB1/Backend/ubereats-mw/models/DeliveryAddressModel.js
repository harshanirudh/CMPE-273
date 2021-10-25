const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const deliveryAddressSchema= new Schema({
    CUST_ID:{type:mongoose.SchemaTypes.ObjectId},
    CNAME:{type:String},
    ADDRESS:{type:String},
    CITY:{type:String},
    ZIPCODE:{type:String}
},{timestamps:true})

// const Customer=
module.exports=mongoose.model('delivery_address',deliveryAddressSchema)
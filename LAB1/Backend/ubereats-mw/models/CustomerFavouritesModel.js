const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const favSchema= new Schema({
    REST_ID:mongoose.SchemaTypes.ObjectId,
    CUST_ID:mongoose.SchemaTypes.ObjectId  
},{timestamps:true})

// const Customer=
module.exports=mongoose.model('customer_favourite',favSchema)
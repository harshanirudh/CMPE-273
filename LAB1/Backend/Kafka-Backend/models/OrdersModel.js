const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ordersSchema= new Schema({
    REST_ID:{type:mongoose.SchemaTypes.ObjectId,required:true},
    RNAME:{type:String},
    CUST_ID:{type:mongoose.SchemaTypes.ObjectId,required:true},
    ORD_STATUS:{type:String},
    ORD_TYPE:{type:String},
    AMOUNT:{type:String},
    DISH_DETAILS:{type:Object},
    ORD_TIMESTAMP:{type:String},
    ORD_DEL_ADDRESS:{type:String},
    SPECIAL_INSTRUCTIONS:{type:String}
},{timestamps:true})

// const Customer=
module.exports=mongoose.model('Order',ordersSchema)
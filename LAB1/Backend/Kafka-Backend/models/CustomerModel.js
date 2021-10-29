const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const customerSchema= new Schema({
    FNAME:{type:String},
    LNAME:{type:String},
    EMAIL:{type:String},
    PASS:{type:String},
    NICKNAME:{type:String},
    ABOUT:{type:String},
    PROFILE_PIC:{type:String},
    STREET:{type:String},
    CITY:{type:String},
    STATE:{type:String},
    COUNTRY:{type:String},
    DOB:{type:String},
    ZIPCODE:{type:String},
    PHONE:{type:String}
        
},{timestamps:true})

// const Customer=
module.exports=mongoose.model('CUSTOMER_USER',customerSchema)
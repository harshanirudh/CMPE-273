const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const restaurantSchema= new Schema({
    RNAME:{type:String},
    EMAIL:{type:String},
    PASS:{type:String},
    ABOUT:{type:String},
    STREET:{type:String},
    CITY:{type:String},
    STATE:{type:String},
    COUNTRY:{type:String},
    PHONE:{type:String},
    ZIPCODE:{type:String},
    RDESCRIPTION:{type:String},
    START_TIME:{type:String},
    END_TIME:{type:String},
    RDELIVERY_MODE:{type:String} ,
    IMAGE:{type:Array}
},{timestamps:true})

module.exports=mongoose.model('RESTAURANT_USER',restaurantSchema)
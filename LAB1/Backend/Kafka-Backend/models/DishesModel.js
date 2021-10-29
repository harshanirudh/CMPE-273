const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const dishSchema= new Schema({
    REST_ID:{type:mongoose.SchemaTypes.ObjectId,required:true},
    DISH_NAME:{type:String},
    INGREDIENTS:{type:String},
    IMAGE:{type:String},
    PRICE:{type:String},
    DISH_DESCR:{type:String},
    CATEGORY:{type:String},
    DISH_TYPE:{type:String}
},{timestamps:true})

// const Customer=
module.exports=mongoose.model('Dish',dishSchema)
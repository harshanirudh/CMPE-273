var favourites=require('../models/CustomerFavouritesModel');
const RestaurantModel = require('../models/RestaurantModel');
async function handle_save_favourites(req,callback){
    try{
        const fav=new favourites({
            CUST_ID:req.params.custId,
            REST_ID:req.params.restId
        })
        let result=await fav.save({new:true})
        callback(null,result)
        }catch(err){
            console.log(err)
            callback(err,null)
        }
}

async function handle_get_favourites_customer(req,callback){
    try{
        let result=await favourites.find({CUST_ID:req.params.custId}).distinct('REST_ID');
        callback(null,result)
    }catch(err){
        console.log(err)
        callback(err,null)
    }
}
async function handle_get_favourites_details_customer(req,callback){
    try{
        let restIDArr=await favourites.find({CUST_ID:req.params.custId}).distinct('REST_ID');
        let result=await RestaurantModel.find({'_id':{
            $in:restIDArr
        }})
        callback(null,result)
    }catch(err){
        console.log(err)
        callback(err,null)
    }
}
exports.handle_save_favourites=handle_save_favourites;
exports.handle_get_favourites_customer=handle_get_favourites_customer;
exports.handle_get_favourites_details_customer=handle_get_favourites_details_customer
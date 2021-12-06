const CustomerFavouritesModel = require("../../models/CustomerFavouritesModel");
const RestaurantModel = require("../../models/RestaurantModel");

const FavouriteResolvers={
    Query:{
        async  getFavouritesForCustomer(_,{custId}){
            try{
                let result=await CustomerFavouritesModel.find({CUST_ID:custId}).distinct('REST_ID');
                return result;
            }catch(err){
                console.log(err)
                return err;''
            }
        },
        async  getFavsDetails(_,{custId}){
            try{
                let restIDArr=await CustomerFavouritesModel.find({CUST_ID:custId}).distinct('REST_ID');
                let result=await RestaurantModel.find({'_id':{
                    $in:restIDArr
                }})
                console.log(result)
               return result;
            }catch(err){
                console.log(err)
               return err;
            }
        }
    },
    Mutation:{
        async  saveFavs(_,{custId,restId}){
            try{
                const fav=new CustomerFavouritesModel({
                    CUST_ID:custId,
                    REST_ID:restId
                })
                let result=await fav.save({new:true})
                return result
                }catch(err){
                    console.log(err)
                    return err;
                }
        }
    }
}
module.exports=FavouriteResolvers
const RestaurantModel = require("../../models/RestaurantModel");
const bcrypt = require('bcryptjs');
const saltRounds = 5;
const RestaurantResolver = {
    Query: {
        async getAllRestaurants() {
            try {
                let result = await RestaurantModel.find({})
                return result;
            } catch (err) {
                console.log(err)
                return err
            }
        },
        async  getRestaurantById(_,{id}){
            try{
                let result=await RestaurantModel.findById(id)
                return result
              }catch(err){
                console.log(err);
                return err;
              }
        },
        async  getRestImage(_,{restId}){
            try {
                let result=await RestaurantModel.findById(restId).select('IMAGE')
                console.log(result.IMAGE)
                return result.IMAGE;
            } catch (err) {
                console.log(err);
                return err;
            }
        }
    },
    Mutation: {
        async  saveNewRestaurant(_,{ add, city, country, email, pass, rname, state, zipcode }){
            try {
                // let { add, city, country, email, pass, rname, state, zipcode } = req.body;
                let hashPass = await bcrypt.hash(pass, saltRounds)
                const newRest=new RestaurantModel({
                  RNAME:rname,
                  EMAIL:email,
                  PASS:hashPass,
                  STREET:add,
                  CITY:city,
                  STATE:state,
                  ZIPCODE:zipcode,
                  COUNTRY:country,
                  RDELIVERY_MODE:"both"
                })
                let result=await newRest.save();
                return result._id
              }
              catch (err) {
                console.log(err);
                return err;
              }
        },
        async  updateRestaurant(_,{ id,add, city, state, country, zipcode, email, rname, desc, phone, stime, etime, rdeliverymode }){
            try {
                // let { add, city, state, country, zipcode, email, rname, desc, phone, stime, etime, rdeliverymode } = req.body
                console.log(id,add)
                let result=await RestaurantModel.findByIdAndUpdate(id,{
                  RNAME:rname,
                  RDESCRIPTION:desc,
                  EMAIL:email,
                  PHONE:phone,
                  STREET:add,
                  CITY:city,
                  STATE:state,
                  COUNTRY:country,
                  ZIPCODE:zipcode,
                  START_TIME:stime,
                  END_TIME:etime,
                  RDELIVERY_MODE:rdeliverymode
                })
                console.log(result)
                let affectedRows = await result._id?1:0;
            //    callback(null,{ affectedRows })
            return affectedRows
              } catch (err) {
                console.log(err)
                return err;
              }
        },
        async  saveImage(_,{restId,img}){
            try {
                RestaurantModel.findById(restId).then((result)=>{
                    // console.log(result)
                    result.IMAGE.push(img)
                    result.save().then(res=>{

                        // console.log(res)
                        return res
                    })
                }).catch(err=>{
                    console.log(err)
                    return err
                })
        
            } catch (err) {
                console.log(err)
                callback(err,null)
            }
        }
    }
}
module.exports=RestaurantResolver
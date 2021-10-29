const Restaurant = require('../models/RestaurantModel');
exports.handle_save_image=async function handle_save_image(req,callback){
    try {
        Restaurant.findById(req.params.restId).then((result)=>{
            console.log(result)
            result.IMAGE.push(req.body.img)
            result.save();
            callback(null,result)
        }).catch(err=>{
            console.log(err)
            callback(err,null)
        })

    } catch (err) {
        console.log(err)
        callback(err,null)
    }
}
exports.handle_get_image=async function handle_get_image(req,callback){
    try {
        let result=await Restaurant.findById(req.params.restId).select('IMAGE')
      callback(null,result);
    } catch (err) {
        console.log(err);
        callback(err,null);
    }
}
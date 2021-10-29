const DishesModel = require('../models/DishesModel');
async function handle_save_new_dish(req, callback) {
    try {
        let { dname, ingre, dimg, dprice, ddesc, dcat, dtype } = req.body
        let dish = new DishesModel({
            REST_ID: req.params.id,
            DISH_NAME: dname,
            INGREDIENTS: ingre,
            IMAGE: dimg,
            PRICE: dprice,
            DISH_DESCR: ddesc,
            CATEGORY: dcat,
            DISH_TYPE: dtype
        });
        let result = await dish.save()
        callback(null, result)
    } catch (err) {
        console.log(err)
        callback(err,null)
    }
}
async function handle_update_dish(req, callback) {
    try {
        let { dname, ingre, dimg, dprice, ddesc, dcat, dtype } = req.body
        let dish = {
            REST_ID: req.params.id,
            DISH_NAME: dname,
            INGREDIENTS: ingre,
            IMAGE: dimg,
            PRICE: dprice,
            DISH_DESCR: ddesc,
            CATEGORY: dcat,
            DISH_TYPE: dtype
        }
        let result = await DishesModel.findByIdAndUpdate(req.params.dishId, dish, { new: true })
        let affectedRows = 0;
        if (result != null || undefined)
            affectedRows = 1;
            callback(null, {affectedRows})
    } catch (err) {
        console.log(err)
       callback(err,null)
    }
}
async function handle_get_dish_ById(req, callback) {
    try {
        let result = await DishesModel.find({ _id: req.params.dishId, REST_ID: req.params.id });
       callback(null,result)
    } catch (err) {
        console.log(err)
       callback(err,null)
    }
}
async function handle_get_all_dishes(req, callback) {
    try {
        let result = await DishesModel.find({ REST_ID: req.params.id })
        callback(null,result)
    } catch (err) {
        console.log(err)
        callback(err,null)
    }
}
async function handle_search_rest_ByDish(req, callback) {
    try {
        let searchRegExPattern = `.*${req.body.dishSeq}.*`
        let result = await DishesModel.find({ DISH_NAME: { $regex: searchRegExPattern, $options: 'i' } }).distinct("REST_ID")
        callback(null,{ "rest_id": result })
    } catch (err) {
        console.log(err)
        callback(err,null)
    }
}
async function handle_search_rest_ByType(req, callback) {
    try {
        let result = await DishesModel.find({ DISH_TYPE: req.params.type }).distinct("REST_ID")
        callback(null,{ "rest_id": result })
    } catch (err) {
        console.log(err)
        callback(err,null)
    }
}
exports.handle_save_new_dish = handle_save_new_dish;
exports.handle_update_dish = handle_update_dish;
exports.handle_get_dish_ById = handle_get_dish_ById;
exports.handle_get_all_dishes = handle_get_all_dishes;
exports.handle_search_rest_ByDish = handle_search_rest_ByDish;
exports.handle_search_rest_ByType = handle_search_rest_ByType;
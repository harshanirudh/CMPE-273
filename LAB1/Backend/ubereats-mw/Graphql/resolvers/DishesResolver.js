const DishesModel = require("../../models/DishesModel");

const DishesResolver={
    Query:{
        async  getDIshById(_,{dishId,restId}) {
            try {
                let result = await DishesModel.find({ _id: dishId, REST_ID: restId });
                console.log(result)
              return result
            } catch (err) {
                console.log(err)
                return err
            }
        },
        async  getAllDishes(_,{restId}) {
            try {
                let result = await DishesModel.find({ REST_ID: restId })
                return result
            } catch (err) {
                console.log(err)
                return err
            }
        },
        async  searchRestByDish(_,{dishSeq}) {
            try {
                let searchRegExPattern = `.*${dishSeq}.*`
                let result = await DishesModel.find({ DISH_NAME: { $regex: searchRegExPattern, $options: 'i' } }).distinct("REST_ID")
                // callback(null,{ "rest_id": result })
                return result
            } catch (err) {
                console.log(err)
                return err
            }
        },
        async  searchRestByDishType(_,{type}) {
            try {
                let result = await DishesModel.find({ DISH_TYPE: type }).distinct("REST_ID")
                // callback(null,{ "rest_id": result })
                return result
            } catch (err) {
                console.log(err)
                return err
            }
        }
    },
    Mutation:{
        async  saveDish(_,{restId,dname, ingre, dimg, dprice, ddesc, dcat, dtype}) {
            try {
                // let { dname, ingre, dimg, dprice, ddesc, dcat, dtype } = req.body
                let dish = new DishesModel({
                    REST_ID: restId,
                    DISH_NAME: dname,
                    INGREDIENTS: ingre,
                    IMAGE: dimg,
                    PRICE: dprice,
                    DISH_DESCR: ddesc,
                    CATEGORY: dcat,
                    DISH_TYPE: dtype
                });
                let result = await dish.save()
                console.log(result)
                return result
            } catch (err) {
                console.log(err)
                return err
            }
        },
        async  updateDish(_,{restId, dishId,dname, ingre, dimg, dprice, ddesc, dcat, dtype }) {
            try {
                // let { dname, ingre, dimg, dprice, ddesc, dcat, dtype } = req.body
                let dish = {
                    REST_ID: restId,
                    DISH_NAME: dname,
                    INGREDIENTS: ingre,
                    IMAGE: dimg,
                    PRICE: dprice,
                    DISH_DESCR: ddesc,
                    CATEGORY: dcat,
                    DISH_TYPE: dtype
                }
                let result = await DishesModel.findByIdAndUpdate(dishId, dish, { new: true })
                let affectedRows = 0;
                if (result != null || undefined)
                    affectedRows = 1;
                return affectedRows
            } catch (err) {
                console.log(err)
                return err
            }
        }
    }
}
module.exports=DishesResolver

var express = require('express');
var validator = require('express-validator');
const DishesModel = require('../models/DishesModel');

var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var service = require('./../services/users-service');

router.post('/:id/dish',async(req,res)=>{
    try{
        // let saveDish="set @id = 0;CALL uber_eats.SP_ADD_NEW_DISH(?,?,?,?,?,?,?,?,@id);select @id;"
        // let result=await pool.query(saveDish,[req.params.id,dname,ingre,dimg,dprice,ddesc,dcat,dtype])
        // result=await Object.values(JSON.parse(JSON.stringify(result)))
        // res.status(201).json(result[0][2][0])
        let{dname,ingre,dimg,dprice,ddesc,dcat,dtype}=req.body
        let dish=new DishesModel({
            REST_ID:req.params.id,
            DISH_NAME:dname,
            INGREDIENTS:ingre,
            IMAGE:dimg,
            PRICE:dprice,
            DISH_DESCR:ddesc,
            CATEGORY:dcat,
            DISH_TYPE:dtype
        });
        let result=await dish.save()
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
})

/**
 * Update Restaurant dish by ID
 */
router.put('/:id/dish/:dishId',async(req,res)=>{
    try{
        // let updateDish="update restaurant_dishes set dish_name=?,ingredients=?,image=?,price=?,dish_descr=?,category=?,dish_type=? where rest_id=? and dish_id=?;"
        // let{dname,ingre,dimg,dprice,ddesc,dcat,dtype}=req.body
        // let result= await pool.query(updateDish,[dname,ingre,dimg,dprice,ddesc,dcat,dtype,req.params.id,req.params.dishId])
        // let affectedRows = await result[0].affectedRows
        // res.status(200).json({ affectedRows })
        let{dname,ingre,dimg,dprice,ddesc,dcat,dtype}=req.body
        let dish={
            REST_ID:req.params.id,
            DISH_NAME:dname,
            INGREDIENTS:ingre,
            IMAGE:dimg,
            PRICE:dprice,
            DISH_DESCR:ddesc,
            CATEGORY:dcat,
            DISH_TYPE:dtype
        }
        let result=await DishesModel.findByIdAndUpdate(req.params.dishId,dish,{new:true})
        let affectedRows=0;
        if(result!=null||undefined)
            affectedRows=1;
        res.send({affectedRows})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


/**
 * Get a dish by id and restaurant id
 */
router.get('/:id/dish/:dishId',async(req,res)=>{
    try{
        // let getDishById="select * from uber_eats.restaurant_dishes where rest_id=? and dish_id=?"
        // let result=await pool.query(getDishById,[req.params.id,req.params.dishId])
        // console.log(result[0])
        // res.status(200).send(result[0])
        let result=await DishesModel.find({_id:req.params.dishId,REST_ID:req.params.id});
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/:id/dishes',async(req,res)=>{
    try{
        // let getAllDishesForRest="select * from uber_eats.restaurant_dishes where rest_id=?"
        // let result=await pool.query(getAllDishesForRest,[req.params.id])
        // console.log(result[0])
        // res.status(200).send(result[0])
        let result=await DishesModel.find({REST_ID:req.params.id})
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
/**
 * Get restIDs on dish name search
 */

router.post('/searchBy/dishes',async(req,res)=>{
    try{
        // let searchRestByDish="select distinct(rest_id) from restaurant_dishes where dish_name like '%"+req.body.dishSeq+"%';"
        // console.log(req.body.dishSeq)
        // let result=await pool.query(searchRestByDish,[req.body.dishSeq]);
        // let rest_id=await result[0].map(rid=>{
        //     return rid.rest_id
        // })
        // res.status(200).send({rest_id});
        let searchRegExPattern=`.*${req.body.dishSeq}.*`
        let result=await DishesModel.find({DISH_NAME:{$regex:searchRegExPattern,$options:'i'}}).distinct("REST_ID")
        res.send({"rest_id":result})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/searchBy/type/:type',async(req,res)=>{
    try{
        // let searchRestByType="select distinct(rest_id) from uber_eats.restaurant_dishes where DISH_TYPE=?"
        // let result=await pool.query(searchRestByType,[req.params.type]);
        // let rest_id=await result[0].map(rid=>{
        //     return rid.rest_id
        // })
        // res.status(200).send({rest_id});
        // let searchRegExPattern=`.*${req.body.dishSeq}.*`
        let result=await DishesModel.find({DISH_TYPE:req.params.type}).distinct("REST_ID")
        res.send({"rest_id":result})
    }catch(err){
        console.log(err)
    }
})

module.exports =router
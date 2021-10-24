var express = require('express');
var router = express.Router();
var pool = require('./../db-config').connectionPool.promise()
var favourites=require('../models/CustomerFavouritesModel');
const RestaurantModel = require('../models/RestaurantModel');
router.post('/add/:custId/:restId',async(req,res)=>{
    try{
    const fav=new favourites({
        CUST_ID:req.params.custId,
        REST_ID:req.params.restId
    })
    let result=await fav.save()
    res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
/**
 * To be converted to mongo
 */
router.delete('/delete/:favId',async(req,res)=>{
    try{
        let removeFav="delete from CUSTOMER_FAVOURITES where fav_id=?"
        let result=await pool.query(removeFav,[req.params.favId]);
        let affectedRows = await result[0].affectedRows
         res.status(200).json({ affectedRows })
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/customer/:custId',async(req,res)=>{
    try{
        let result=await favourites.find({CUST_ID:req.params.custId}).distinct('REST_ID');
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
/**
 * Get All favourites restaurant details for a customer
 */
router.get('/details/customer/:custId',async(req,res)=>{
    try{
        let restIDArr=await favourites.find({CUST_ID:req.params.custId}).distinct('REST_ID');
        let result=await RestaurantModel.find({'_id':{
            $in:restIDArr
        }})
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
module.exports=router

var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config')
var service = require('./../services/users-service');
/**
 * Save New Order
 */
router.post('/new',async(req,res)=>{
    try{
    let saveNewOrder="set @id = 0;CALL uber_eats.SP_ADD_NEW_ORDER(?,?,?,?,?,?,?,?,@id);select @id;";
    let {rest_id,cust_id,order_type,amount,dishes,ts,address}=req.body
    let result=await pool.query(saveNewOrder,[rest_id,cust_id,'new order',order_type,amount,JSON.stringify(dishes),ts,address]);
    result=await Object.values(JSON.parse(JSON.stringify(result)))
    // let order_id=await result[0][2][0]
    res.status(201).json(result[0][2][0])
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
router.get('/customer/:custId',async(req,res)=>{
    try{
        let getAllOrdersPerCustomer="SELECT t2.RNAME,t1.* FROM uber_eats.orders t1 inner join restaurant_users t2 on t1.rest_id=t2.rest_id where t1.cust_id=?;"
        let result=await pool.query(getAllOrdersPerCustomer,[req.params.custId])
        res.status(200).send(result[0]);
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/restaurant/:restId',async(req,res)=>{
    try{
        let getAllOrdersPerRestaurant="SELECT t2.RNAME,t1.* FROM uber_eats.orders t1 inner join restaurant_users t2 on t1.rest_id=t2.rest_id where t1.REST_ID=?;"
        let result=await pool.query(getAllOrdersPerRestaurant,[req.params.restId])
        res.status(200).send(result[0]);
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
module.exports=router
router.put('/edit/:orderId',async(req,res)=>{
    try{
        let updateStatus="update uber_eats.orders set ORD_STATUS=? where ORDER_ID=?"
        let result=await pool.query(updateStatus,[req.body.status,req.params.orderId])
        res.status(200).send({affectedRows:result[0].affectedRows})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

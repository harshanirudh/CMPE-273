const OrdersModel = require('../models/OrdersModel');
exports.handle_save_new_order=async function handle_save_new_order(req,callback){
    try{
        let {rest_id,rname,cust_id,order_type,amount,dishes,ts,address}=req.body
        const order=new OrdersModel({
            REST_ID:rest_id,
            RNAME:rname,
            CUST_ID:cust_id,
            ORD_STATUS:'new order',
            ORD_TYPE:order_type,
            AMOUNT:amount,
            DISH_DETAILS:dishes,
            ORD_TIMESTAMP:ts,
            ORD_DEL_ADDRESS:address
        })
        let result=await order.save({new:true})
        callback(null,result)
        }catch(err){
            console.log(err)
            callback(err,null)
        }
}
exports.handle_get_orders_customer=async function handle_get_orders_customer(req,callback){
    try{
        let temp=await OrdersModel.find({CUST_ID:req.params.custId})
        callback(null,temp)
    }catch(err){
        console.log(err)
       callback(err,null)
    }
}
exports.handle_get_orders_restaurant=async function handle_get_orders_restaurant(req,callback){
    try{
        let result=await OrdersModel.find({REST_ID:req.params.restId})
        callback(null,result);

    }catch(err){
        console.log(err)
        callback(err,null)
    }
}
exports.handle_update_orderStatus=async function handle_update_orderStatus(req,callback){
    try{
        let result=await OrdersModel.findByIdAndUpdate(req.params.orderId,{ORD_STATUS:req.body.status},{new:true})
        callback(null,result)
    }catch(err){
        console.log(err)
        callback(err,null)
    }
}
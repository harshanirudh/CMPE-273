const OrdersModel = require("../../models/OrdersModel")

const OrdersResolver={
    Query:{
        async  getOrdersForCustomer(_,{custId}){
            try{
                let temp=await OrdersModel.find({CUST_ID:custId})
                console.log(temp)
                return temp
            }catch(err){
                console.log(err)
                return err
            }
        },
        async  getOrdersForRestaurant(_,{restId}){
            try{
                let result=await OrdersModel.find({REST_ID:restId})
                return result;
            }catch(err){
                console.log(err)
                return err;
            }
        }
    },
    Mutation:{
        async  saveNewOrder(_,{rest_id,rname,cust_id,order_type,amount,dishes,ts,address,specialInstructions}){
            try{
                // let {rest_id,rname,cust_id,order_type,amount,dishes,ts,address,specialInstructions}=req.body
                console.log(rest_id,cust_id)
                const order=new OrdersModel({
                    REST_ID:rest_id,
                    RNAME:rname,
                    CUST_ID:cust_id,
                    ORD_STATUS:'new order',
                    ORD_TYPE:order_type,
                    AMOUNT:amount,
                    DISH_DETAILS:dishes,
                    ORD_TIMESTAMP:ts,
                    ORD_DEL_ADDRESS:address,
                    SPECIAL_INSTRUCTIONS:specialInstructions
                })
                let result=await order.save({new:true})
                return result;
                }catch(err){
                    console.log(err)
                    return err;
                }
        },
        async  updateOrderStatus(_,{orderId,status}){
            try{
                let result=await OrdersModel.findByIdAndUpdate(orderId,{ORD_STATUS:status},{new:true})
                // callback(null,result)
                return result;
            }catch(err){
                console.log(err)
                return err
            }
        }
    }
}
module.exports=OrdersResolver
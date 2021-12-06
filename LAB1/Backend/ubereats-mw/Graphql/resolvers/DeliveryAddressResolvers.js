const DeliveryAddressModel = require("../../models/DeliveryAddressModel");

const DeliveryAddressResolvers={
    Query:{
        async getDeliveryAddress(_,{custId}){
            try{
                let result=await DeliveryAddressModel.find({CUST_ID:custId})
                console.log(result)
                return result;
            }catch(err){
                console.log(err)
                return err;
            }
        }
    },
    Mutation:{
        async  saveNewDeliveryAddress(_,{custId,name,add,city,zipcode}){
            console.log("Inside post delivery address kafka backend");
            // console.log(req);
            // callback(null, req);
            try{
            // let {name,add,city,zipcode}=req.body
            const delAdd=new DeliveryAddressModel({
                CUST_ID:custId,
                CNAME:name,
                ADDRESS:add,
                CITY:city,
                ZIPCODE:zipcode
            })
            let result=await delAdd.save({new:true})
            // res.status(201).send(result)
            console.log(result)
           return result;
            }
            catch(err){
                console.log("Error while saving delivery address",err);
                return err;
            }
        
            
        }
    }
}
module.exports=DeliveryAddressResolvers
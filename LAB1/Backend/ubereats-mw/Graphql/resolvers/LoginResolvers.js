const CustomerModel = require("../../models/CustomerModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config =require('../../config');
const RestaurantModel = require("../../models/RestaurantModel");
const LoginResolver={
    Query:{
        async customerLogin(_,{ email, pass }){
            let authenticated = false;
            let customerRole="CUSTOMER"
            try {
                // validator.validationResult(req).throw();
                // let { email, pass } = req.body
                let result=await CustomerModel.findOne({EMAIL:email}).select(["PASS","CUST_ID"])
                console.log(result)
                let hash = result?.PASS
                let cust_id= result?._id
                if (hash) {
                    authenticated = await bcrypt.compare(pass, hash)
                    console.log(authenticated)
                    if(authenticated){ 
                        let token=jwt.sign({user:email,role:customerRole,id:cust_id},config.JWT_SECRET)
                        return { authenticated ,cust_id,token}
                    }else {
                        return{ authenticated ,cust_id,token:null}
                    }
                } else {
                  return{ authenticated }
                }
            } catch (err) {
                console.log(err);
                return err;
            }
        },
        async  RestaurantLogin(_,{email,pass}){
            let authenticated = false;
            let restRole="RESTAURANT"
            try {
                // validator.validationResult(req).throw();
                // let { email, pass } = req.body
                let result=await RestaurantModel.findOne({EMAIL:email}).select(["PASS","CUST_ID"])
                let hash = result?.PASS
                let rest_id= result?._id
                if (hash) {
                    authenticated = await bcrypt.compare(pass, hash)
                    console.log(authenticated)
                    if(authenticated){ 
                        let token=jwt.sign({user:email,role:restRole,id:rest_id},config.JWT_SECRET)
                        // res.status(200)
                        return {authenticated ,rest_id,token}
                    }else{
                        // res.status(403)
                       return{ authenticated ,rest_id,token:null}
                    }
                } else {
                    return{ authenticated }
                }
            } catch (err) {
                console.log(err);
               return err
            }
        }
    },
    Mutation:{

    }
}
module.exports=LoginResolver
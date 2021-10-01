var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config')
var service = require('./../services/users-service');

router.post('/add/:custId',async(req,res)=>{
    try{
    
    let saveNewAdd='set @id = 0;call uber_eats.SP_ADD_NEW_DELIVERY_ADDRESS(?,?,?,?,?,@id);select @id;'
    let {name,add,city,zipcode}=req.body
    let result=await pool.query(saveNewAdd,[req.params.custId,name,add,city,zipcode,]);
    let id=await Object.values(JSON.parse(JSON.stringify(result)));
    console.log(id[0][2][0])
    res.status(201).json(id[0][2][0]);
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
})

router.get('/:custId',async(req,res)=>{
    try{
        let getAllAdd="select * from DELIVERY_ADDRESS where cust_id=?"
        let result=await pool.query(getAllAdd,[req.params.custId]);
        res.status(200).send(result[0])
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports=router
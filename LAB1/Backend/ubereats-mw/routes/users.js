const { json } = require('express');
var express = require('express');
var validator=require('express-validator');

var router = express.Router();
var pool = require('./../db-config')
var service= require('./../services/users-service')
/* GET users listing. */
router.get('/customers', async function (req, res, next) {  
  try{
    res.json(await service.getCustomerUsers());
  }catch(err){
    res.status(500).send(err)
  }
});


router.get('/customers/:id', async function (req, res) {
  try{
    return res.status(200).send(await service.getCustomerById(req.params.id));
  }catch(err){
    return res.status(500).send(err);
  }
});

const customerPostValidator=validator.check(['CUST_ID','FNAME','LNAME','EMAIL','PASS','ADDRESS','ZIPCODE'],'Bad Request').exists();
router.post('/customer', customerPostValidator,(req,res)=>{
  try{
  validator.validationResult(req).throw();
  let saveCustomer='call uber_eats.SP_Add_New_Customer(?,?,?,?,?,?,?)'
  pool.execute(saveCustomer,[[CUST_ID]])
  res.end();
  }
  catch(err){
    console.log(err);
    res.status(402).send(err);
  }
})

router.get('/restarunt', (req, res) => {
  let query='select * from restaurant_users';
  pool.execute(query).then((resp=>{
    res.status(200).send(resp[0]);
  })).catch((err)=>{
      res.status(500).send(err);
  });
})

router.get('/restarunt/:id',(req,res)=>{
  let query="select * from restaurant_users where id=?";
  pool.execute(query,[req.params.id]).then((resp)=>{
      res.status(200).send(resp[0]);
  }).catch((err)=>{
    console.log(err);
  })
})
module.exports = router;

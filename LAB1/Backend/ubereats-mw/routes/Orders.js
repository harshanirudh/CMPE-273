
var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config')
var service = require('./../services/users-service');

router.post('/new',async(req,res)=>{
    let saveNewOrder="";
    pool.query(saveNewOrder,[]);
})
module.exports=router


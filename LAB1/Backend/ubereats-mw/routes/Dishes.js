
var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config')
var service = require('./../services/users-service');

router.put('/restaurant/:id/dish',async(req,res)=>{
    try{
        
    }catch(err){
        console.log(err)
    }
})
var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config')

router.post('/:restId',async(req,res)=>{
    try{
        let saveNewImage="set @id = 0;CALL uber_eats.SP_ADD_NEW_IMAGE(?,?,@id);select @id;";
        let result=await pool.query(saveNewImage,[req.params.restId,req.body.img])
        result=await Object.values(JSON.parse(JSON.stringify(result)))
        res.status(201).json(result[0][2][0])
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
router.get('/:restId',async(req,res)=>{
    try{
        let getAllImagesForRest="select * from uber_eats.RESTAURANT_IMAGES where rest_id=?"
        let result=await pool.query(getAllImagesForRest,[req.params.restId]);
        res.status(200).send(result[0])
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports =router

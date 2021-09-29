var express = require('express');
var router = express.Router();
var pool = require('./../db-config')

router.post('/add/:custId/:restId',async(req,res)=>{
    try{
    let saveToFav='set @id = 0;call uber_eats.SP_Add_New_FAV(?,?,@id);select @id;'
    let result= await pool.query(saveToFav,[req.params.custId,req.params.restId])
    let resp = await Object.values(JSON.parse(JSON.stringify(result)));
    console.log(resp[0][2][0])
    res.status(201).json(resp[0][2][0]);
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.delete('/delete/:favId',async(req,res)=>{
    try{
        let removeFav="delete from CUSTOMER_FAVOURITES where fav_id=?"
        let result=await pool.query(removeFav,[req.params.favId]);
        let affectedRows = await result[0].affectedRows
         res.status(200).json({ affectedRows })
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/customer/:custId',async(req,res)=>{
    try{
        let getAllFavforCust="select distinct(rest_id) from CUSTOMER_FAVOURITES where cust_id=? ";
        let result=await pool.query(getAllFavforCust,[req.params.custId]);
        let rest_ids=await result[0].map(i=>{
            return i.rest_id
        })
        res.status(200).send({rest_ids})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
/**
 * Get All favourites restaurant details for a customer
 */
router.get('/details/customer/:custId',async(req,res)=>{
    try{
        let getAllFavforCust=`select t1.*,t2.IMAGE_ID,t2.IMAGE from restaurant_users t1 left join(
            select * from restaurant_images group by REST_ID ) t2 on t1.REST_ID=t2.REST_ID where t1.rest_id in(select distinct(rest_id) from CUSTOMER_FAVOURITES where cust_id=?);`;
        let result=await pool.query(getAllFavforCust,[req.params.custId]);
        res.status(200).send(result[0])
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
module.exports=router
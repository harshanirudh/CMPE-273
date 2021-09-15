const { json } = require('express');
var express = require('express');
var validator = require('express-validator');

var router = express.Router();
var pool = require('./../db-config')
var service = require('./../services/users-service')
/* GET users listing. */
router.get('/customers', async function (req, res, next) {
  try {
    res.json(await service.getCustomerUsers());
  } catch (err) {
    res.status(500).send(err)
  }
});


router.get('/customers/:id', async function (req, res) {
  try {
    return res.status(200).send(await service.getCustomerById(req.params.id));
  } catch (err) {
    return res.status(500).send(err);
  }
});

const customerPostValidator = validator.check(['fname', 'lname', 'email', 'pass'], 'Bad Request').exists();
router.post('/customer', customerPostValidator, (req, res) => {
  try {
    validator.validationResult(req).throw();
    let saveCustomer = 'set @id = 0;call uber_eats.SP_Add_New_Customer(?,?,?,?,@id);select @id;'
    let { fname, lname, email, pass } = req.body;
    pool.query(saveCustomer, [fname, lname, email, pass]).then(resp => {
      resp=Object.values(JSON.parse(JSON.stringify(resp)));
      console.log(resp[0][2][0])
      res.status(201).json(resp[0][2][0]);
    }).catch((err) => {
      console.log(err)
      res.status(500).send(err);
    })
  }
  catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})

router.get('/restarunt', (req, res) => {
  let query = 'select * from restaurant_users';
  pool.execute(query).then((resp => {
    res.status(200).send(resp[0]);
  })).catch((err) => {
    res.status(500).send(err);
  });
})

router.get('/restarunt/:id', (req, res) => {
  let query = "select * from restaurant_users where id=?";
  pool.execute(query, [req.params.id]).then((resp) => {
    res.status(200).send(resp[0]);
  }).catch((err) => {
    console.log(err);
  })
})

const restPostValidator = validator.check(['add', 'city', 'country', 'email','pass','rname','state','zipcode'], 'Bad Request').exists();
router.post('/restaurant', restPostValidator, (req, res) => {
  try {
    validator.validationResult(req).throw();
    let saveRestaurant = 'set @id = 0;call uber_eats.SP_Add_New_Customer(?,?,?,?,@id);select @id;'
    let { add, city, country, email,pass,rname,state,zipcode } = req.body;
   /* pool.query(saveRestaurant, [rname, add, city, state,zipcode,country,email,pass]).then(resp => {
      resp=Object.values(JSON.parse(JSON.stringify(resp)));
      console.log(resp[0][2][0])
      res.status(201).json(resp[0][2][0]);
    }).catch((err) => {
      console.log(err)
      res.status(500).send(err);
    })*/
    res.status(201).json(req.body)
  }
  catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})

module.exports = router;

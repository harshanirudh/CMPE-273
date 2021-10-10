var chai = require('chai')
var assert = require('chai').assert
var expect    = require("chai").expect;
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

// var app = 'http://localhost:8080'
var app= require('../bin/www')

describe('Test scenario', function () {
  it('get restaurant users', function () {
    chai
      .request(app)
      .get('/users/restarunt/1')
      .end(function (err, res) {
        assert.equal(res.status,200)
        assert.exists(res.body)
        expect(res.body).to.be.a('array')
      })
  })
  it('get customer users',()=>{
      chai
         .request(app)
         .get("/users/customers/1")
         .end((err,res)=>{
             assert.equal(res.status,200)
             assert.exists(res.body)
             expect(res.body).to.be.a('array')
         })
  })
  it('get customer location',()=>{
    chai
       .request(app)
       .get("/users/customer/location/1")
       .end((err,res)=>{
           assert.equal(res.status,200)
        //    console.log(res)
           assert.exists(res.body.location,'San Jose')
                  })
})

it('check customer login',()=>{
    chai
       .request(app)
       .post("/login/customer")
       .send({
        email:"himalya@test.com",
        pass:"pass123"
    })
       .end((err,res)=>{
           assert.equal(res.status,200)
           assert.exists(res.body.authenticated,true)
     })
})

it('check restaurant login',()=>{
    chai
       .request(app)
       .post("/login/restaurant")
       .send({
        email:"harsha.anirudh@gmail.com",
        pass:"pass123"
    })
       .end((err,res)=>{
           assert.equal(res.status,200)
           assert.exists(res.body.authenticated,true)
     })
})
})
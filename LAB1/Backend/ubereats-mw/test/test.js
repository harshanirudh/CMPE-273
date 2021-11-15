var chai = require('chai')
var assert = require('chai').assert
var expect    = require("chai").expect;
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

// var app = 'http://localhost:8080'
var app= require('../bin/www')
var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjFAZ21haWwuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWQiOiI2MTkwMzg4YzAwYWUzYzIyNzE1NTFlYmMiLCJpYXQiOjE2MzY5MzgwODh9.YapN7GIhw80mABiiGSZZUYM0hXqCIEQUUvu2Vc1zhAs"
describe('Test scenario', function () {
  it('get restaurant users', function () {
    chai
      .request(app)
      .get('/users/restarunt/1')
      .set('Authorization','jwt '+token)
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
         .set('Authorization','jwt '+token)
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
       .set('Authorization','jwt '+token)
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
       .set('Authorization','jwt '+token)
       .send({
        email:"user1@gmail.com",
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
       .set('Authorization','jwt '+token)
       .send({
        email:"pandaexpress@gmail.com",
        pass:"pass123"
    })
       .end((err,res)=>{
           assert.equal(res.status,200)
           assert.exists(res.body.authenticated,true)
     })
})
})
"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { JWT_SECRET } = require("./config");
const Customer = require('./models/CustomerModel');
const Restaurant=require('./models/RestaurantModel')

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: JWT_SECRET
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
          const role=jwt_payload.role
          const user_id = jwt_payload.id;
          if(role==='RESTAURANT'){
            Restaurant.findById(user_id,(err,results)=>{
              if (err) {
                return callback(err, false);
            }
            if (results) {
                
                callback(null, results);
            }
            else {
                
                callback(null, false);
            }
            })
          }else if(role==='CUSTOMER'){
              Customer.findById(user_id,(err,results)=>{
                  
                if (err) {
                  return callback(err, false);
              }
              if (results) {
                  
                  callback(null, results);
              }
              else {
                
                  callback(null, false);
              }
              })
          }
            // Users.findById(user_id, (err, results) => {
            //     if (err) {
            //         return callback(err, false);
            //     }
            //     if (results) {
            //         callback(null, results);
            //     }
            //     else {
            //         callback(null, false);
            //     }
            // });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });



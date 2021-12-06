const CustomerModel = require("../../models/CustomerModel");
const bcrypt = require('bcryptjs');
const saltRounds = 5;
const CustomerResolvers = {
    Query: {
        async getAllCustomerUsers() {
            let result = await CustomerModel.find()
            return result;
        },
        async getCustomerById(_, { id }) {
            try {
                let result = await CustomerModel.findById({ _id: id })
                return result
            } catch (err) {
                return { err: "Unable to fetch" }
            }
        },
        async getCustomerLocation(_,{custId}){
            try {
                let result=await CustomerModel.findById(custId);
                let location=await result?.CITY;
                return location
              } catch (err) {
                console.log(err)
                return err;
              }
        }
    },

    Mutation: {
        async saveNewCustomer(_, { fname, lname, email, pass } ) {
            try{
            console.log("Inside muation")
            let hashPass = await bcrypt.hash(pass.toString(), saltRounds)
            const customer = new CustomerModel({
                FNAME: fname,
                LNAME: lname,
                EMAIL: email,
                PASS: hashPass
            })
            let result=await customer.save()
            console.log(result)
            return result._id
        }catch(err){
            console.log(err)
        }
        },
        async updateCustomer(_,{ id,fname, lname, email, nickname, about, profile_pic, add, city, state, country, dob, zipcode, phone }){
            try{
                console.log("Inside update customer")
                const customer ={
                    FNAME: fname,
                    LNAME: lname,
                    EMAIL: email,
                    NICKNAME: nickname,
                    ABOUT: about,
                    PROFILE_PIC: profile_pic,
                    STREET: add,
                    CITY: city,
                    STATE: state,
                    COUNTRY: country,
                    DOB: dob,
                    ZIPCODE: zipcode,
                    PHONE: phone
                  }
                  console.log(fname)
                  let result=await CustomerModel.findByIdAndUpdate(id,customer)
                  let affectedRows = await result._id?1:0;
                  return affectedRows
                } catch (err) {
                    console.log(err)
                    return err;
            }
        }
    }
}
module.exports = CustomerResolvers
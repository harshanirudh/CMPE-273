import React, { Component } from 'react'
import { Form, Field, Formik,ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Redirect } from 'react-router';
import COUNTRIES from '../SharedComponents/dropdowns';
import NavComponent from '../SharedComponents/NavComponent';
var axios = require("axios").default;

var { baseUrl } = require('../apiConfig')

const restSignupValidator=yup.object({
    rname:yup.string().required('Restaurant Name is required')
            .max(100,'Cannot Exceed 100 '),
    add:yup.string().required('Street Addres is required')
            .max(120,'Cannot Exceed 120'),
    city:yup.string().required('City is required')
            .max(40,'Cannot Exceed 40'),
    state:yup.string().required('State is required')
            .max(40,'Cannot Exceed 40'),
    zipcode:yup.string().required('Zipcode is required')
            .matches(/^[0-9]+$/,'Only digits')
            .max(5,'Invalid zipcode')
            .min(5,'Invalid zipcode'),
    email:yup.string().required('Email is required')
            .max(60,'Max length is 60')
            .email('Must be a valid email'),
    pass:yup.string().required('Password is required')
            .max(30,'Cannot Exceed more than 30')
            .min(6,'Min 6 chars'),
    country:yup.string().required('Country is Required')
})
export class RestaurantSignup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            redirect:false,
            redirectTo:''
        }
    }
    
    addNewRest(values){
        let url = baseUrl + '/users/restaurant'
        axios.post(url, values).then(res => {
            console.log(res.data);
            this.setState({
                redirect:true,
                redirectTo:'/restaurantSingup/success'
            })
        }).catch((err) => {
                console.log(`error ${err}`)
                this.setState({
                    redirect:true,
                    redirectTo:'/restaurantSingup/error'
                })
            })
        console.log(values);
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirectTo}></Redirect>
        }
        return (
            <div >
            <NavComponent view="unknown"></NavComponent>
            <div className="container">
                <h2 className="text-center">Restaurant Registration</h2>
                <Formik initialValues={{
                    rname:'',
                    add:'',
                    city:'',
                    state:'',
                    zipcode:'',
                    email:'',
                    pass:'',
                    country:''
                }} validationSchema={restSignupValidator} onSubmit={(values)=>this.addNewRest(values)}>
                    <Form>
                        <div className="form-group">
                            <label >Restaurant Name:</label>
                            <Field type="text" className="form-control" placeholder="Ex Elon" id="rname" name="rname" />
                            <ErrorMessage name="rname" className="text-danger" component="div"></ErrorMessage>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-5">
                                <label >Street Address</label>
                                <Field type="text" className="form-control" id="add" name="add" />
                                <ErrorMessage name="add" className="text-danger" component="div"></ErrorMessage>
                            </div>
                            <div className="form-group col-md-3">
                                <label >City</label>
                                <Field type="text" className="form-control" placeholder="Ex New York" id="city" name="city" />
                                <ErrorMessage name="city" className="text-danger" component="div"></ErrorMessage>
                            </div>
                            <div className="form-group col-md-3">
                                <label >State</label>
                                <Field type="text" className="form-control" placeholder="Ex Texas" id="state" name="state" />
                                <ErrorMessage name="state" className="text-danger" component="div"></ErrorMessage>
                            </div>
                            <div className="form-group col-md-3">
                                <label >ZipCode</label>
                                <Field type="text" className="form-control" placeholder="Ex 95001" id="zipcode" name="zipcode" />
                                <ErrorMessage name="zipcode" className="text-danger" component="div"></ErrorMessage>
                            </div>
                            <div className="form-group col-md-3">
                                <label >Country</label>
                                <Field as="select" className="form-control" placeholder="Ex India" id="country" name="country" >
                                <option value=""></option>
                                                        {COUNTRIES.map(country=>{
                                                            return(<option key={country.name} value={country.name}>{country.name}</option>)
                                                        })}
                                 </Field>
                                <ErrorMessage name="country" className="text-danger" component="div"></ErrorMessage>
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Email ID:</label>
                            <Field type="email" className="form-control" placeholder="Ex example@gmail.com" id="email" name="email" />
                            <ErrorMessage name="email" className="text-danger" component="div"></ErrorMessage>
                        </div>
                        <div className="form-group">
                            <label >Password:</label>
                            <Field type="Password" className="form-control" id="pass" name="pass" />
                            <ErrorMessage name="pass" className="text-danger" component="div"></ErrorMessage>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </Form>
                </Formik>
            </div>
            </div>
        )
    }
}

export default RestaurantSignup

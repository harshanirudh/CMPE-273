import React, { Component } from 'react'
import { Form, Field, Formik,ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Redirect } from 'react-router';
import NavComponent from '../SharedComponents/NavComponent';

var axios = require("axios").default;

var { baseUrl } = require('../apiConfig')
// import {AddNewCustomer} from './CustomerSignupService'



const custSignupValidator=yup.object({
    fname:yup.string().required('First Name is required')
        .max(50,'Max length 50'),
    lname:yup.string().required('Last Name is required')
        .max(50,'Max Length 50'),
    email:yup.string().required('Email is required')
        .email('Must be a valid email'),
    pass:yup.string().required('Password is required')
        .min(6,'Min length 6 ')
        .max(30,'Max length 30')
})



export class CustomerSignup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             redirect:false,
             redirectTo:''
        }
    }
    AddNewCustomer(values) {
    
        let url = baseUrl + '/users/customer'
        axios.post(url, values).then(res => {
            console.log(res.data);
            this.setState({
                redirect:true,
                redirectTo:'/customerSignup/success'
            })
        }).catch((err) => {
                console.log(`error ${err}`)
                this.setState({
                    redirect:true,
                    redirectTo:'/customerSignup/error'
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
            <Formik initialValues={{
                fname:'',
                lname:'',
                email:'',
                pass:''
            }} validationSchema={custSignupValidator}  onSubmit={(values)=>this.AddNewCustomer(values)}>
                <div className="container">
                    <h2 className="text-center">Customer Registration</h2>
                    <Form className="form">
                        <div className="form-group">
                            <label >First Name:</label>
                            <Field type="text" className="form-control" placeholder="Ex Elon" id="fname" name="fname" />
                            <ErrorMessage name="fname" className="text-danger" component="div"></ErrorMessage>
                        </div>
                        <div className="form-group">
                            <label >Last Name:</label>
                            <Field type="text" className="form-control" placeholder="Ex Musk" id="lname" name="lname" />
                            <ErrorMessage name="lname" className="text-danger" component="div"></ErrorMessage>
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
                
                </div>
            </Formik>
            </div>
        )
    }

    
}

export default CustomerSignup

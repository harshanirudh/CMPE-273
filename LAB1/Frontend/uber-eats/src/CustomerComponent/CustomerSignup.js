import React, { Component } from 'react'
import { Form, Field, Formik,ErrorMessage } from 'formik'
import * as yup from 'yup'
import {addNewCustomer} from './CustomerSignupService'

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
    render() {
        return (
            <Formik initialValues={{
                fname:'',
                lname:'',
                email:'',
                pass:''
            }} validationSchema={custSignupValidator}  onSubmit={(values)=>addNewCustomer(values)}>
                <div className="container">
                    <h2 className="text-center">Customer Registration</h2>
                    <Form>
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
        )
    }
}

export default CustomerSignup

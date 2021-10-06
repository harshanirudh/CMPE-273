import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Form, Field, Formik, ErrorMessage } from 'formik'
import * as yup from 'yup';
import NavComponent from './NavComponent';
import { baseUrl } from '../apiConfig';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';


let loginValidator = yup.object({
    email: yup.string()
        .required('Email is Required').email('Enter Valid Email'),
    pass: yup.string()
        .required('Password is required')
})
export class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            invalidLogin: false
        }
    }

    handleLogin = (values) => {
        if (this.props.type == 'Customer') {
            console.log("inside")
            let customerAuthUrl = `${baseUrl}/login/customer`
            axios.post(customerAuthUrl, values,{withCredentials: true}).then((resp) => {
                // let loginDetails = {
                //     isCustomerAuthenticated: resp.data.authenticated,
                //     isRestaurantAuthenticated: false,
                //     userEmail: values.email,
                //     id: resp.data.cust_id
                // }
                // this.props.customerLogin(loginDetails);
                let customerCookie=this.props.cookies.get('cookie')
                console.log(this.props.cookies.get('cookie'))
                
                let successRedirectUrl = `/customer/landing/${resp.data.cust_id}`
                this.props.history.push(successRedirectUrl);
            }).catch((err) => {
                this.setState({ invalidLogin: true })
            })
        }
        else {
            console.log("inside")
            let restAuthUrl = `${baseUrl}/login/restaurant`
            axios.post(restAuthUrl, values,{withCredentials: true}).then((resp) => {
                // let loginDetails = {
                //     isCustomerAuthenticated: false,
                //     isRestaurantAuthenticated: resp.data.authenticated,
                //     userEmail: values.email,
                //     id: resp.data.rest_id
                // }
                // this.props.restaurantLogin(loginDetails);
                let restCookie=this.props.cookies.get('restCookie')
                console.log(this.props)
                let successRedirectUrl = `/restaurant/landing/${resp.data.rest_id}`
                this.props.history.push(successRedirectUrl);
            }).catch((err) => {
                this.setState({ invalidLogin: true })
            })

        }
    }

    render() {
        return (

            <div >
                <NavComponent view="unknown"></NavComponent>
                <Formik initialValues={{
                    email: '',
                    pass: ''
                }} validationSchema={loginValidator} onSubmit={(values => { this.handleLogin(values) })}>


                    <div className="container">
                        <h2 className="text-center">Login as {this.props.type}</h2>
                        {this.state.invalidLogin===true?(
                        <div class="alert alert-danger">
                            <strong>Error!</strong> Invalid login
                        </div>):""}
                        <Form >
                            <div className="form-group">
                                <label >Email:</label>
                                <Field type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                                <ErrorMessage name="email" className="text-danger" component="div"></ErrorMessage>
                            </div>
                            <div className="form-group">
                                <label >Password:</label>
                                <Field type="password" className="form-control" id="pass" placeholder="Enter password" name="pass" />
                                <ErrorMessage name="pass" className="text-danger" component="div"></ErrorMessage>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={`/${this.props.path}`} className="p-3" >Create Account</Link>

                        </Form>
                    </div>
                </Formik>
            </div>
        )
    }
}

export default withCookies(withRouter(LoginComponent))

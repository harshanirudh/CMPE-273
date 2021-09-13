import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Form, Field, Formik ,ErrorMessage} from 'formik'
import * as yup from 'yup';
let loginValidator=yup.object({
    email:yup.string()
            .required('Email is Required').email('Enter Valid Email'),
    pass:yup.string()
            .required('Password is required')
})
export class LoginComponent extends Component {
    
    render() {
        return (
            <Formik initialValues={{
                email:'',
                pass:''
            }} validationSchema={loginValidator} onSubmit={(values=>{console.log(values)})}>
                <div className="container">
                    <h2 className="text-center">Login as {this.props.type}</h2>
                   
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
        )
    }
}

export default LoginComponent

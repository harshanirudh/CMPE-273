import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import {uploadProfilePics} from './../SharedComponents/UploadS3'
var axios = require("axios").default;
var { baseUrl } = require('../apiConfig')

let custProfValidator = yup.object({
    about: yup.string().max(120, 'Max Chars 120'),
    fname: yup.string().required('First Name is required').max(50, 'Max Length 50'),
    lname: yup.string().required('Last Name is required').max(50, 'Max Length 50'),
    email: yup.string().required('Email is required').email('Enter a Valid email'),
    phone: yup.string().max(14, 'Max 14').matches(/^[0-9]+$/, 'Only digits'),
    dob: yup.date()
})
let uploadProfilePhoto = (e) => {
    
    let file=e.target.form[0].files[0];
    let [filename,ext]=file.name.split(".")
    let newname=filename+new Date().valueOf()+"."+ext;
    let newFile=new File([file],newname)
    console.log(newFile)
    let fileLocation=uploadProfilePics(newFile)
    console.log(fileLocation)
}
function CustomerProfile() {
    const param = useParams();
    useEffect(() => {
        let url = baseUrl + "/customer/profile/details/" + param.profileId;
        console.log(url)
        // axios.get()
    }, [param])
    return (
        <Formik initialValues={{
            about: '',
            fname: '',
            lname: '',
            email: '',
            phone: '',
            dob: '2021-09-14',
            add: '',
            city: '',
            state: '',
            country: ''
        }} validationSchema={custProfValidator} onSubmit={(values) => console.log(values)}>
            <div className="container">
                <h2 className="text-center text-uppercase">Profile Details</h2>
                <br></br>
                <div className="main-body">
                    <Form>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                            <div className="col-md-12">
                                                <input type="file" className="form-control-sm" id="profilePic" name="profilePic" accept="image/png, image/gif, image/jpeg" />
                                                <button type="button" className="btn-sm btn-primary" onClick={uploadProfilePhoto}> Upload</button>
                                            </div>
                                            <div className="mt-3">
                                                <h4>About</h4>
                                                <Field className="form-control rounded-0" name="about" placeholder="Full Stack Developer Bay Area, San Francisco, CA" component="textarea" style={{ height: "120px", width: "250px" }} />
                                                <ErrorMessage name="about" className="text-danger" component="div"></ErrorMessage>
                                                {/* <Field className="text-muted font-size-sm" value=""/>Bay Area, San Francisco, CA */}
                                                {/* <button className="btn btn-primary">Follow</button>
									<button className="btn btn-outline-primary">Message</button> */}
                                            </div>
                                        </div>
                                        <hr className="my-4" />

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">First Name</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="fname" />
                                                <ErrorMessage name="fname" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">Last Name</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="lname" />
                                                <ErrorMessage name="lname" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">Email</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="email" />
                                                <ErrorMessage name="email" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">Phone</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="phone" />
                                                <ErrorMessage name="phone" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">Date of Birth</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="date" className="form-control" name="dob" />
                                                <ErrorMessage name="dob" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">Address</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="add" />
                                                <ErrorMessage name="add" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">City</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="city" />
                                                <ErrorMessage name="city" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">State</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="state" />
                                                <ErrorMessage name="state" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <label className="mb-0">Country</label>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="text" className="form-control" name="country" />
                                                <ErrorMessage name="country" className="text-danger" component="div"></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-9 text-secondary">
                                                <Field type="submit" className="btn btn-primary px-4" value="Save Changes" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    )
}

export default CustomerProfile

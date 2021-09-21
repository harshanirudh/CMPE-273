import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'
import { uploadProfilePics } from './../SharedComponents/UploadS3'
var axios = require("axios").default;
var { baseUrl } = require('../apiConfig')


let custProfIntialValues = {
    about: '',
    fname: '',
    lname: '',
    email: '',
    phone: '',
    dob: '',
    add: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    nickname: '',
    profile_pic: ''
}

class CustomerProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            custProfIntialValues: custProfIntialValues,
            updateDone: false,
            error: false
        }
    }

    custProfValidator = yup.object({
        about: yup.string().max(120, 'Max Chars 120'),
        fname: yup.string().required('First Name is required').max(50, 'Max Length 50'),
        lname: yup.string().required('Last Name is required').max(50, 'Max Length 50'),
        email: yup.string().required('Email is required').email('Enter a Valid email'),
        phone: yup.string().max(14, 'Max 14').matches(/^[0-9]+$/, 'Only digits'),
        dob: yup.string(),
        nickname:yup.string(),

    })

    handleSave(values) {
        console.log(values)
        let url = baseUrl + '/users/customer/' + this.props.match.params.profileId;
        axios.put(url, values).then((resp) => {
            let rows = resp.data.affectedRows;
            if (rows > 0) {
                console.log("Success")
                this.setState({ updateDone: true })
            }
            else {
                this.setState({ error: true })
            }
        }).catch((err) => {
            console.log(err)
            this.setState({ error: true })
        })
    }
    uploadProfilePhoto = (e) => {

        let file = e.target.form[0].files[0];
        let [filename, ext] = file.name.split(".")
        let newname = filename + new Date().valueOf() + "." + ext;
        let newFile = new File([file], newname)
        // console.log(newFile)
        console.log(this.state)
        uploadProfilePics(newFile).then((res) => {
            console.log(res)
            custProfIntialValues.profile_pic = res.location;
            this.setState({ custProfIntialValues: custProfIntialValues })
            console.log(this.state)
        })
    }
    setProfilePic(){
        if(this.state.custProfIntialValues.profile_pic?.length>0)
            return this.state.custProfIntialValues.profile_pic
        else
            return "https://bootdey.com/img/Content/avatar/avatar6.png";
    }
    handleLandingPage=()=>{
        this.props.history.push("/customer/landing")
    }
    componentDidMount() {
        let url = baseUrl + "/users/customers/" + this.props.match.params.profileId;
        console.log(url)
        axios.get(url).then((resp) => {
            console.log(resp.data[0])
            let { ABOUT, CITY, COUNTRY, CUST_ID, EMAIL, FNAME, LNAME, NICKNAME, PHONE, PROFILE_PIC, STATE, STREET, ZIPCODE, DOB } = resp.data[0];
            custProfIntialValues.about = ABOUT ? ABOUT : "";
            custProfIntialValues.city = CITY?CITY:"";
            custProfIntialValues.country = COUNTRY;
            custProfIntialValues.email = EMAIL;
            custProfIntialValues.fname = FNAME;
            custProfIntialValues.lname = LNAME;
            custProfIntialValues.phone = PHONE?PHONE:"";
            custProfIntialValues.state = STATE?STATE:"";
            custProfIntialValues.add = STREET?STREET:"";
            custProfIntialValues.zipcode = ZIPCODE?ZIPCODE:"";
            custProfIntialValues.dob = DOB?DOB:"";
            custProfIntialValues.nickname = NICKNAME?NICKNAME:"";
            custProfIntialValues.profile_pic = PROFILE_PIC;
            this.setState({ custProfIntialValues: custProfIntialValues })
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        if (this.state.updateDone === true) {
            return <div className="container">
                <br></br>
                <div className="jumbotron">
                    <h1>Succesfully Updated profile</h1>
                    <button type="button" className="btn btn-primary" onClick={this.handleLandingPage}>Go Back to login page</button>
                </div>
            </div>
        }
        if (this.state.error) {
            return <div className="container">
                <br></br>
                <div className="jumbotron">
                    <h1>Profile Update Failed</h1>
                    <p>Unable to update profile, something went wrong</p>
                </div>
            </div>
        }
        return (
            <Formik initialValues={this.state.custProfIntialValues} validationSchema={this.custProfValidator} onSubmit={(values) => this.handleSave(values)}>
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
                                                <img src={this.setProfilePic()} alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                                <div className="col-md-12">
                                                    <input type="file" className="form-control-sm" id="profilePic" name="profilePic" accept="image/png, image/gif, image/jpeg" />
                                                    <button type="button" className="btn-sm btn-primary" onClick={this.uploadProfilePhoto}> Upload</button>
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
                                                    <label className="mb-0">Nickname</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="nickname" />
                                                    {/* <ErrorMessage name="lname" className="text-danger" component="div"></ErrorMessage> */}
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
                                                    <label className="mb-0">Zipcode</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="zipcode" />
                                                    <ErrorMessage name="zipcode" className="text-danger" component="div"></ErrorMessage>
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
}

export default withRouter(CustomerProfile)

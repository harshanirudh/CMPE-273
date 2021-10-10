import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as yup from 'yup'
import COUNTRIES from '../SharedComponents/dropdowns';
import NavComponent from '../SharedComponents/NavComponent';
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
        let url = baseUrl + '/users/customer/' + this.props.match.params.custId;
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
        if(file){
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
        let url = baseUrl + "/users/customers/" + this.props.match.params.custId;
        // console.log(url)
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
    isDisabled(){
        if(this.props?.viewBy==="restaurant"){
            return true
        }
        else{
            return false
        }
    }
    handleClose=(type)=>{
        if(type=="update"){
        this.setState({updateDone:false})
        this.props.history.push(`/customer/landing/${this.props.match.params.custId}`)
        }
        else if(type==="error"){
            this.setState({error:false})
        }

    }
    render() {
        // if (this.state.updateDone === true) {
        //     return <div className="container">
        //         <br></br>
        //         <div className="jumbotron">
        //             <h1>Succesfully Updated profile</h1>
        //             <button type="button" className="btn btn-primary" onClick={this.handleLandingPage}>Go Back to login page</button>
        //         </div>
        //     </div>
        // }
        if (this.state.error) {
            return  <div >
            <NavComponent view="customer"></NavComponent>
            <Dialog
                    open={this.state.error}
                    // onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}>
                    <DialogTitle id="alert-dialog-title">{"Profile Updated Succesfully"}</DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose("error")}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        }
        return (
            <div >
            <Dialog
                    open={this.state.updateDone}
                    // onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}>
                    <DialogTitle id="alert-dialog-title">{"Profile Updated Succesfully"}</DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose("update")}>Close</Button>
                    </DialogActions>
                </Dialog>
            {this.props?.viewBy==="restaurant"?
            (<NavComponent view="restaurant" cid={this.props.custId} rid={this.props.restId}></NavComponent>):(
                <NavComponent view="customer" cid={this.props.match.params.custId}></NavComponent>)
                }
            <Formik initialValues={this.state.custProfIntialValues} validationSchema={this.custProfValidator} onSubmit={(values) => this.handleSave(values)} >
                <div className="container">
                    <h2 className="text-center text-uppercase">Profile Details</h2>
                    <br></br>
                    <div className="main-body">
                        <Form >
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={this.setProfilePic()} alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                                {this.props?.viewBy==="restaurant"?'':(<div className="col-md-12">
                                                    <input type="file" className="form-control-sm" id="profilePic" name="profilePic" accept="image/png, image/gif, image/jpeg" />
                                                    <button type="button" className="btn-sm btn-primary" onClick={this.uploadProfilePhoto}> Upload</button>
                                                </div>)}
                                                <div className="mt-3">
                                                    <h4>About</h4>
                                                    <Field className="form-control rounded-0" name="about"  component="textarea" style={{ height: "120px", width: "250px" }} disabled={this.isDisabled()}/>
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
                                                    <Field type="text" className="form-control" name="fname" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="fname" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Last Name</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="lname" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="lname" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Nickname</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="nickname" disabled={this.isDisabled()} />
                                                    {/* <ErrorMessage name="lname" className="text-danger" component="div"></ErrorMessage> */}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Email</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="email"disabled={this.isDisabled()} />
                                                    <ErrorMessage name="email" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Phone</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="phone" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="phone" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Date of Birth</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="date" className="form-control" name="dob" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="dob" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Address</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="add" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="add" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">City</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="city" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="city" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">State</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="state" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="state" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Zipcode</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="text" className="form-control" name="zipcode" disabled={this.isDisabled()}/>
                                                    <ErrorMessage name="zipcode" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <label className="mb-0">Country</label>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field as="select" className="form-control" name="country" disabled={this.isDisabled()}>
                                                        <option value=""></option>
                                                        {COUNTRIES.map(country=>{
                                                            return(<option key={country.name} value={country.name}>{country.name}</option>)
                                                        })}
                                                    </Field>
                                                    <ErrorMessage name="country" className="text-danger" component="div"></ErrorMessage>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-9 text-secondary">
                                                    <Field type="submit" className="btn btn-primary px-4" value="Save Changes" disabled={this.isDisabled()}/>
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
            </div>
        )

    }
}

// export {CustomerProfile as PureCustomerProfile}
export default withRouter(CustomerProfile)

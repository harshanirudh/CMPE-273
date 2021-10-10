import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { Component, useEffect } from 'react'
import { Link, useParams, withRouter } from 'react-router-dom'
import * as yup from 'yup'
import COUNTRIES from '../SharedComponents/dropdowns';
import NavComponent from '../SharedComponents/NavComponent';
import { withCookies, Cookies } from 'react-cookie';
var { baseUrl } = require('../apiConfig')
var axios = require("axios").default;
let profileIntialValues = {
    desc: '',
    rname: '',
    email: '',
    phone: '',
    add: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    stime: '',
    etime: '',
    rdeliverymode:''
}
let restProfileValidator = yup.object({
    desc: yup.string().max(255, 'Max length 255'),
    rname: yup.string().required('Restaurant Name is required').max(50, 'MaxLength 50'),
    email: yup.string().email('Enter valid email').required('Email is required'),
    phone: yup.string().max(10, 'Valid phone no').min(10, 'Valid phone no').matches(/^[0-9]+$/, 'Only digits'),
    add: yup.string().max(60, 'Max length 60'),
    city: yup.string().max(40, 'Max length 40'),
    state: yup.string().max(40, 'Max length 40'),
    country: yup.string().max(40, 'Max 40'),
    zipcode: yup.string().max(5, 'Valid zipcode').min(5, 'Valid zipcode').matches(/^[0-9]+$/, 'Only digits'),
    stime: yup.string(),
    etime: yup.string(),
    rdeliverymode:yup.string().required('Delivery Mode is required').min(1,'Delivery Mode is required')
})
class RestaurantProfile extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            profileIntialValues: profileIntialValues,
            updateDone:false,
            error:false
        }


    }
    componentDidMount() {
        // console.log(this.props.match.params.profileId)
        let url=baseUrl+'/users/restarunt/'+this.props.match.params.profileId
        axios.get(url).then((resp)=>{
            let {CITY,COUNTRY,EMAIL,END_TIME,PHONE,RDESCRIPTION,REST_ID,RNAME,START_TIME,STATE,STREET,ZIPCODE,RDELIVERY_MODE}=resp.data[0]
            profileIntialValues.city=CITY?CITY:''
            profileIntialValues.country=COUNTRY?COUNTRY:''
            profileIntialValues.email=EMAIL?EMAIL:''
            profileIntialValues.etime=END_TIME?END_TIME:''
            profileIntialValues.phone=PHONE?PHONE:''
            profileIntialValues.desc=RDESCRIPTION?RDESCRIPTION:''
            profileIntialValues.rname=RNAME?RNAME:''
            profileIntialValues.stime=START_TIME?START_TIME:''
            profileIntialValues.state=STATE?STATE:''
            profileIntialValues.add=STREET?STREET:''
            profileIntialValues.zipcode=ZIPCODE?ZIPCODE:''
            profileIntialValues.rdeliverymode=RDELIVERY_MODE?RDELIVERY_MODE:''
            // profileIntialValues=Object.assign(profileIntialValues,resp.data[0])
            this.setState({profileIntialValues:profileIntialValues})
            console.log(this.state)
        })
        
        
    }
    async handleSubmit(values) {
        try {
            console.log(values)
            let url = baseUrl + '/users/restaurant/' + this.props.match.params.profileId
            let response = await axios.put(url, values)
            let rows = await response.data.affectedRows
            if (rows == 1) {
                // alert('Succesfully Updated')
                // this.props.history.push('/restaurant/landing/' + this.props.match.params.profileId)
                this.setState({updateDone:true})
            }
            else {
                // alert('Unable to Update, please try again later')
                // this.props.history.push('/restaurant/landing/' + this.props.match.params.profileId)
                this.setState({error:true})
            }
        } catch (err) {
            // alert('Unable to Update, please try again later')
            //     this.props.history.push('/restaurant/landing/' + this.props.match.params.profileId)
            this.setState({error:true})
            console.log(err)
        }
    }
    handleLandingPage=()=>{
        this.props.history.push(`/restaurant/landing/${this.props.match.params.profileId}`)
    }
    render() {
        
        if(this.state.updateDone===true){
            return <div >
            <NavComponent view="restaurant"></NavComponent>
            <div className="container">
            <br></br>
            <div className="jumbotron">
                <h1>Succesfully Updated profile</h1>
                <button type="button" className="btn btn-primary" onClick={this.handleLandingPage}>Go Back to Home page</button>
            </div>
        </div>
        </div>
        }
        if (this.state.error) {
            return <div >
            <NavComponent view="restaurant"></NavComponent>
            <div className="container">
                <br></br>
                <div className="jumbotron">
                    <h1>Profile Update Failed</h1>
                    <p>Unable to update profile, something went wrong</p>
                </div>
            </div>
            </div>
        }
        return (
            <div >
                <NavComponent view="restaurant" rid={this.props.match.params.profileId}></NavComponent>
            <Formik initialValues={profileIntialValues} validationSchema={restProfileValidator} onSubmit={this.handleSubmit.bind(this)}>
                <div>
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

                                                    <div className="mt-3">
                                                        <h4>About</h4>
                                                        <Field className="form-control rounded-0" name="desc" placeholder="Exquisite tase gauranteed" component="textarea" style={{ height: "120px", width: "250px" }} />
                                                        <ErrorMessage name="desc" className="text-danger" component="div"></ErrorMessage>

                                                    </div>
                                                </div>
                                                <hr className="my-4" />
                                                {/* <ul>
                                                    <li><Link to="/restaurant/images">Images</Link></li>
                                                    <li><Link to="/restaurant/dishes">Dishes</Link></li>
                                                </ul> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card">
                                            <div className="card-body">

                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <label className="mb-0">Restaurant Name</label>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <Field type="text" className="form-control" name="rname" />
                                                        <ErrorMessage name="rname" className="text-danger" component="div"></ErrorMessage>
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
                                                        <Field as="select" className="form-control" name="country">
                                                        <option value=""></option>
                                                        {COUNTRIES.map(country=>{
                                                            return(<option key={country.name} value={country.name}>{country.name}</option>)
                                                        })}
                                                        </Field>
                                                        <ErrorMessage name="country" className="text-danger" component="div"></ErrorMessage>
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
                                                        <label className="mb-0">Start Time</label>
                                                    </div>
                                                    <div className="col-sm-3 text-secondary">
                                                        <Field type="time" className="form-control" name="stime" />
                                                        <ErrorMessage name="stime" className="text-danger" component="div"></ErrorMessage>
                                                    </div>
                                                    
                                                    <div className="col-sm-3">
                                                        <label className="mb-0">End Time</label>
                                                    </div>
                                                    <div className="col-sm-3 text-secondary ">
                                                        <Field type="time" className="form-control " name="etime" />
                                                        <ErrorMessage name="etime" className="text-danger" component="div"></ErrorMessage>
                                                    </div>
                                                    
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <label className="mb-0">Delivery Mode</label>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <Field as="select" className="form-control" name="rdeliverymode" >
                                                            <option value=""></option>
                                                            <option value="both">Both</option>
                                                            <option value="pickup">Pickup</option>
                                                            <option value="delivery">Delivery</option>
                                                        </Field>
                                                        <ErrorMessage name="rdeliverymode" className="text-danger" component="div"></ErrorMessage>
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
                </div>
            </Formik>
            </div>
        )
    }
}
export default withCookies(withRouter(RestaurantProfile))

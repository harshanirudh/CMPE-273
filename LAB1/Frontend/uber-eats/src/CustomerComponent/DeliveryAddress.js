import React, { Component } from 'react'
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { baseUrl } from '../apiConfig'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import {  saveDeliveryAddress} from '../Redux/Customer/Customer-actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class DeliveryAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addressList: [],
            open: false
        }
    }
    static mapStateToProps = state => {
        return { Customer: state.Customer }
    }
    static mapDispatchToProps = dispatch => {
        return bindActionCreators({ saveDeliveryAddress }, dispatch)
    }
    getAddressList = () => {
        let getIntialAddress = `${baseUrl}/users/customers/${this.props.custId}`
        let getAllDeliveryAddress = `${baseUrl}/deliveryAddress/${this.props.custId}`
        axios.all([axios.get(getIntialAddress), axios.get(getAllDeliveryAddress)]).then((res) => {
            let list = [];
            console.log(res[0])
            let intialAddress = {
                _id: 0,
                ADDRESS: res[0]?.data?.STREET,
                CITY: res[0]?.data?.CITY,
                ZIPCODE: res[0]?.data?.ZIPCODE
            }
            let otherAddress = res[1]?.data;
            if (res[0].data?.STREET?.length > 0)
                otherAddress?.unshift(intialAddress);
            this.props.saveDeliveryAddress(otherAddress)
            this.setState({ addressList: otherAddress });
        })
    }
    componentDidMount() {
        this.getAddressList()
    }
    formValidator = yup.object({
        name: yup.string().required('Name is required'),
        add: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        zipcode: yup.string().required("ZipCode is required").max(5, 'Valid zipcode').min(5, 'Valid zipcode').matches(/^[0-9]+$/, 'Only digits')
    })
    handleClose = () => {
        console.log("close")
        this.setState({ open: false })
    }
    submitFormData = (values) => {
        let url = `${baseUrl}/deliveryAddress/add/${this.props.custId}`
        axios.post(url, values).then(res => {
            console.log(res.data)
            this.getAddressList()
            this.handleClose()
        })
    }
    /**
     * JSX if delivery is selected
     */

    // addNewAddressForm =

    openAddressDialog = () => {
        this.setState({ open: true })
    }
    
    handleOnAddress = (e) => {
        // console.log(e.target.value);
        this.props.selectedAddress(e.target.value)
    }
    render() {
        return (

            <Card >
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth="true"

                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add New Address"}
                    </DialogTitle>
                    <DialogContent>
                    <Card>
                        <CardHeader title="Delivery Address"></CardHeader>
                        <Formik initialValues={{
                            add: '',
                            city: '',
                            zipcode: ''
                        }} validationSchema={this.formValidator} onSubmit={(e) => this.submitFormData(e)}>
                            <Form>
                                <CardContent>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <Field type="text" name="name" className="form-control" />
                                        <ErrorMessage name="name" className="text-danger" component="div"></ErrorMessage>
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <Field type="text" name="add" className="form-control" />
                                        <ErrorMessage name="add" className="text-danger" component="div"></ErrorMessage>
                                    </div>
                                    <div className="form-group">
                                        <label>City</label>
                                        <Field type="text" name="city" className="form-control" />
                                        <ErrorMessage name="city" className="text-danger" component="div"></ErrorMessage>
                                    </div>
                                    <div className="form-group">
                                        <label>Zipcode</label>
                                        <Field type="text" name="zipcode" className="form-control" />
                                        <ErrorMessage name="zipcode" className="text-danger" component="div"></ErrorMessage>
                                    </div>
                                    <DialogActions>
                                        <Button type="button" color="error" onClick={this.handleClose}>Close</Button>
                                        <button className="btn btn-info" type="submit" >Save</button>

                                    </DialogActions>
                                </CardContent>
                            </Form>

                        </Formik>
                    </Card>
                    </DialogContent>

                </Dialog>
                <CardHeader title="Delivery Address"></CardHeader>
                <CardContent>
                    <label>Select Delivery Address from previous address</label>
                    <select className="form-control" name="address" onChange={this.handleOnAddress}>
                        <option value="">Select Address</option>
                        {this.state.addressList.map((i => {

                            return <option value={i.ADDRESS + ',' + i.CITY + ',' + i.ZIPCODE} key={i._id}>{i.ADDRESS + ',' + i.CITY + ',' + i.ZIPCODE}</option>
                        }))}
                    </select>
                    <br />
                    <button className="btn btn-info" onClick={this.openAddressDialog}>Add New Address</button>
                </CardContent>
            </Card>
        )
    }
}
const DeliveryAddressReduxComponent = connect(DeliveryAddress.mapStateToProps, DeliveryAddress.mapDispatchToProps)(DeliveryAddress)
export default DeliveryAddressReduxComponent

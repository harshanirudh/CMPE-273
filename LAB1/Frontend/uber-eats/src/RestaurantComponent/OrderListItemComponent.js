import { Button, Dialog, DialogActions, DialogTitle, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { Formik ,Form,Field} from 'formik'
import React, { Component, createRef } from 'react'
import { baseUrl } from '../apiConfig'
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom'

export class OrderListItemComponent extends Component {
    constructor(props) {
        super(props)
        // this.currentStatus=createRef()
        this.state = {
             orderStatus:this.props.order.ORD_STATUS,
             openDialog:false
        }
    }
    handleUpdate(e){
        let orderUpdateUrl=`${baseUrl}/orders/edit/${this.props.order.ORDER_ID}`
        console.log(e.deliveryStatus)
        let data={status:e.deliveryStatus}
        axios.put(orderUpdateUrl,data).then(res=>{
            this.setState({
                orderStatus:e.deliveryStatus,
                openDialog:true
            })
            this.props.update();
            console.log(this.state)
            // this.setState(prevState=>({
            //     orderStatus:e.deliveryStatus,
            //     openDialog:true
            // }))

        })

    }
    handleDialogClose=()=>{
        this.setState({openDialog:false})
    }
    render() {
        const{order}=this.props
        return (
            <div>
                <Formik initialValues={{
                    deliveryStatus:this.state.orderStatus
                    }} onSubmit={(e)=>this.handleUpdate(e)}>
                    <Form>
                <li className="list-group-item" key={order.ORDER_ID}>
                    <div className="row">
                        <div className="col-sm-2">
                            <p>Order ID: {order.ORDER_ID}</p>
                            <Link to={`/restaurant/${order.REST_ID}/view/customer/${order.CUST_ID}`}>View Customer</Link>
                        </div>
                      
                        <div className="col-sm-3">
                            {order.DISH_DETAILS.map((item) => {
                                return <p> {item.DISH_NAME} x {item.quantity}</p>
                            })}
                        </div>
                        <p className="col-sm-2">
                            Total Amount:$ {order.AMOUNT}
                        </p>
                        <div className="col-sm-3">


                            {order.type === 'pickup' ?
                                <div>
                                    <Field name="deliveryStatus" className="form-control" as="select">
                                        <option value="new order">Order Recieved</option>
                                        <option value="orderPreparing">Preparing</option>
                                        <option value="pickupReady">Pickup Ready</option>
                                        <option value="picked up">Picked Up</option>
                                    </Field>
                                </div>
                                :
                                <div>
                                    <Field name="deliveryStatus" className="form-control" as="select">
                                        <option value="new order">Order Recieved</option>
                                        <option value="orderPreparing">Preparing</option>
                                        <option value="onTheWay">On the way</option>
                                        <option value="delivered">Delivered</option>
                                    </Field>
                                </div>
                            }

                        </div>
                        <div className="col-sm-2">
                            <button type='submit' className="btn btn-primary" >Update</button>

                            {/* <CustomPopup></CustomPopup> */}
                        </div>
                    </div>
                </li>
                </Form>
                </Formik>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    // fullWidth="true"
                >
                 <DialogTitle id="alert-dialog-title">
                        {"Updated Successfully"}
                        <IconButton><DoneIcon color="success"></DoneIcon></IconButton>
                    </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleDialogClose}>Close</Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default OrderListItemComponent

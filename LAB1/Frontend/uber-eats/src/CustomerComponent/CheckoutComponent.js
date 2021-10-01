import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NavComponent from '../SharedComponents/NavComponent';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { baseUrl } from '../apiConfig';
import DeliveryAddress from './DeliveryAddress';

export class CheckoutComponent extends Component {
    constructor(props) {
        super(props)
        this.selectedAddress="";
        
        this.state = {
            deliveryMode:this.props.location.state.restDetails.RDELIVERY_MODE
        }
    }
    amount=0;
    handleDataFromChild=(data)=>{
        this.selectedAddress=data;
    }
    
    delivery=<DeliveryAddress custId={this.props.match.params.custId} selectedAddress={this.handleDataFromChild}></DeliveryAddress>
    /**
     * JSX for pickup
     */
     
    pickup = <card>
        <CardHeader title="Pickup from "></CardHeader>
        <CardContent >
            <Typography>Restaurant Address</Typography>
            
            <Typography component={"h3"}>{this.props.location.state.restDetails.RNAME}</Typography>
            <Typography component={"h4"}>{this.props.location.state.restDetails.STREET}</Typography>
        </CardContent>
    </card>

    chooseType=<card>
        <CardHeader title="Choose pickup/delivery"></CardHeader>
        <CardContent>
            
            <button className="btn btn-info" onClick={()=> this.setState({deliveryMode:'delivery'})}>Delivery</button>
            <button className="btn btn-info" onClick={()=>  this.setState({deliveryMode:'pickup'})}>Pickup</button>
        </CardContent>
    </card>

    loadScreenOnDeliveryMode = (deliveryMode) => {
        if (deliveryMode === 'pickup') {
            return this.pickup;
        } else if (deliveryMode === 'delivery') {
            return this.delivery;
        }
        else if (deliveryMode === 'both') {
            return this.chooseType;
        }
    }
    getShoppingCartDetails = () => {
        // this.state.items = 

        // let amount = 0;
        return (
            <div>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {this.props.location.state.items.map((i, index) => {
                        this.amount = i.PRICE * i.quantity + this.amount
                        return <ListItem alignItems="flex-start" key={i.DISH_ID}>
                            <ListItemAvatar>
                                <Avatar alt={i.DISH_NAME} src={i.IMAGE} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={i.DISH_NAME}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Quantity:   {i.quantity}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div className="col-sm-6">
                                    <ListItemText  >
                                        Price:  ${i.PRICE * i.quantity}
                                    </ListItemText>
                                </div>
                            </div>
                        </ListItem>
                    })}
                    
                </List>
                <Typography style={{ display: 'flex', justifyContent: 'center' }} className="badge badge-primary"> Total Amount:  ${this.amount} </Typography>
            </div>
        )
    }
    calculateAmount(items){
        let amount=0;
        items.map(i=>{
            amount = i.PRICE * i.quantity +amount
        })
        return amount
    }

    placeOrder=()=>{
        console.log(this.state.deliveryMode)
        if(this.state.deliveryMode==='delivery'){
            if(parseInt(this.selectedAddress)>=0){
                console.log("valid")
                let orderDetails={
                    rest_id:this.props.location.state.restDetails.REST_ID,
                    cust_id:this.props.match.params.custId,
                    order_type:'delivery',
                    dishes:this.props.location.state.items,
                    amount:this.calculateAmount(this.props.location.state.items)
                }
                console.log(orderDetails)
            }else{
                alert('Please select valid Delivery Address')
            }
        }else if(this.state.deliveryMode==='pickup'){

        }
    }


    render() {
        // console.log(this.props.location)
        const { RNAME, STREET, CITY, ZIPCODE, RDELIVERY_MODE } = this.props.location.state.restDetails;
        return (
            <div>
                <NavComponent view="customer" cid={this.props.match.params.custId}></NavComponent>
                <div className="row container-fluid mt-4">
                    <div className="col-md-6">
                        {this.loadScreenOnDeliveryMode(this.state.deliveryMode)}
                    </div>
                    <div className="col-md-6">
                        <Card>
                            <CardHeader
                                title="CheckOut"
                                subheader="Order Summary" />
                            <CardContent>
                                <Typography>{RNAME}</Typography>
                                <Typography> {STREET}</Typography>
                                <Typography> {CITY}</Typography>
                                <Typography> {ZIPCODE}</Typography>
                                {this.getShoppingCartDetails()}
                                <br />
                                <button type="button" className="btn btn-danger" style={{ width: '100%', display: 'block' }} onClick={()=>{this.placeOrder()}}>Place Order</button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CheckoutComponent)

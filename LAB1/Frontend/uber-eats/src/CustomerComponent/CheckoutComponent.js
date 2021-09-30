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

export class CheckoutComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount(){

    }


    getShoppingCartDetails = () => {
        // this.state.items = 

        let amount = 0;
        return (
            <div>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {this.props.location.state.items.map((i, index) => {
                        amount = i.PRICE * i.quantity + amount
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
                <Typography style={{ display: 'flex', justifyContent: 'center' }} className="badge badge-primary"> Total Amount:  ${amount} </Typography>
            </div>
        )
    }
    render() {
        console.log(this.props.location)
        const {RNAME,STREET,CITY,ZIPCODE}=this.props.location.state.restDetails;
        return (
            <div>
                <NavComponent view="customer" cid={this.props.match.params.custId}></NavComponent>
                <div className="row container-fluid mt-4">
                    <div className="col-md-6">
                        <Card>
                            <CardHeader title="Delivery Address"></CardHeader>
                            <Formik initialValues={{
                                add:'',
                                city:'',
                                zipcode:''
                            }}>
                                <CardContent>
                                    <Form>
                                        <div className="form-group">
                                            <label>Address</label>
                                            <Field type="text" name="add" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label>City</label>
                                            <Field type="text" name="city" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Zipcode</label>
                                            <Field type="text" name="zipcode" className="form-control"/>
                                        </div>
                                    </Form>
                                </CardContent>
                            </Formik>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card>
                            <CardHeader
                                title="CheckOut"
                                subheader="Order Summary" />
                            <CardContent>
                                {RNAME}
                                {STREET}
                                {CITY}
                                {ZIPCODE}
                                {this.getShoppingCartDetails()}
                                <br />
                                <button type="button" className="btn btn-danger" style={{ width: '100%', display: 'block' }}>Place Order</button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CheckoutComponent)

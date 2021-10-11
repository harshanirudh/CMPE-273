import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import axios from 'axios'
import React, { Component } from 'react'
import { baseUrl } from '../apiConfig'

export class OrderListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openRecieptDialog: false
        }
    }
    componentDidMount(){
        
    }

    // closeReciept = () => {
    //     this.props.close()
    // }

    handleOpenReciept = () => {
        this.setState({ openRecieptDialog: true })
    }
    handleCloseReciept = () => {
        this.setState({ openRecieptDialog: false })
    }
    renderOrderStatus=(status)=>{
        switch(status){
            case "new order":
                return "Order Confirmed"
            // break;
            case "orderPreparing":
                return "Order Preparing"
            // break;
            case "pickupReady":
                return "Pickup ready"
            // break;
            case "picked up":
                return "Picked Up"
            // break;
            case "onTheWay":
                return "On the way"
            // break;
            case "delivered":
                return "Delivered"
            // break;
        }
    }
    render() {
        const { order,address } = this.props
        let delivery_address=address.filter(i=>{
            return i.add_id==order.ORD_DEL_ADDRESS
        })
        delivery_address=delivery_address[0]?.address+" "+delivery_address[0]?.city+" "+delivery_address[0]?.zipcode
        console.log(delivery_address)
        return (
            <div>
                <ListItem alignItems="flex-start">
                    {/* <ListItemAvatar>
                                   <Avatar alt="Remy Sharp" src={order.} />
                                 </ListItemAvatar> */}
                    <ListItemText
                        primary={"ORDER ID:" + order.ORDER_ID}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {order.RNAME} &nbsp;&nbsp;
                                </Typography>
                                {order.ORD_TIMESTAMP}
                                {order.ORD_TYPE==='delivery'?(
                                    <Typography>Delivered Address:{delivery_address}</Typography>
                                ):''}
                               <Typography> {this.renderOrderStatus(order.ORD_STATUS)}</Typography>
                            </React.Fragment>
                        }
                    />
                    <br />
                    <button className="btn btn-info" onClick={() => this.handleOpenReciept()}>View Reciept</button>

                    <Dialog
                        open={this.state.openRecieptDialog}
                        onClose={this.handleCloseReciept}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth="true">
                        <DialogTitle id="alert-dialog-title">{"ORDER RECIEPT"}</DialogTitle>
                        <DialogContent>
                            <Typography>Amount ${order.AMOUNT}</Typography>
                            <Typography className="text-uppercase">Status: {order.ORD_STATUS}</Typography>
                            <List>
                                {order.DISH_DETAILS.map(dish => {
                                    return <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar src={dish.IMAGE} />
                                        </ListItemAvatar>
                                        
                                        <ListItemText
                                primary={dish.DISH_NAME}
                                secondary={
                                    <React.Fragment>
                                        <Typography >Quantity:   {dish.quantity} </Typography>
                                         <Typography>   Description: {dish.DISH_DESCR} </Typography>
                                         <Typography>   Ingrediants: {dish.INGREDIENTS} </Typography>
                                         <Typography>   Type: {dish.DISH_TYPE}</Typography>
                                         <Typography>   Category:{dish.CATEGORY}</Typography>
                                    </React.Fragment>
                                }
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div className="col-sm-6">
                                    <ListItemText  >
                                        Price:  ${dish.PRICE * dish.quantity}
                                    </ListItemText>
                                 </div>
                            </div>
                                    </ListItem>
                                })}
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleCloseReciept()}>Close</Button>
                        </DialogActions>
                    </Dialog>

                </ListItem>
                <Divider variant="inset" component="li" />

            </div>


        )
    }
}

export default OrderListItem

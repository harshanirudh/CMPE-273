import axios from 'axios'
import React, { Component } from 'react'
import { baseUrl } from '../apiConfig'
import NavComponent from '../SharedComponents/NavComponent'
import { withRouter } from 'react-router-dom'
import { Avatar, Card, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import CustOrderReciept, { OrderListItem } from './OrderListItem'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
export class CustomerOrders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderList: [],
            filterType: '',
            addressList:[]
        }
    }
    getAddressList=()=>{
        let getIntialAddress=`${baseUrl}/users/customers/${this.props.match.params.custId}`
        let getAllDeliveryAddress=`${baseUrl}/deliveryAddress/${this.props.match.params.custId}`
        axios.all([axios.get(getIntialAddress),axios.get(getAllDeliveryAddress)]).then((res)=>{
            let list=[];
            let intialAddress={
                add_id:0,
                address:res[0]?.data[0]?.STREET,
                city: res[0]?.data[0]?.CITY,
                zipcode:res[0]?.data[0]?.ZIPCODE
            }
            let otherAddress=res[1]?.data;
            otherAddress?.unshift(intialAddress);
            console.log(otherAddress)
            this.setState({addressList: otherAddress});
        })
    }
    componentDidMount() {
        let url = `${baseUrl}/orders/customer/${this.props.match.params.custId}`
        this.getAddressList()
        axios.get(url).then(res => {
            console.log(res.data)
            this.setState({ orderList: res.data })
        })
    }

    
    render() {
        return (
            <div>
                <NavComponent view="customer" cid={this.props.match.params.custId}></NavComponent>
                <div>
                    <Card>
                        <CardHeader title={"Order History"}></CardHeader>
                        <List sx={{ width: '100%', bgcolor: 'background.paper', justifyContent: 'center' }}>
                            {this.state.orderList.map((order,index) => {
                                return <OrderListItem order={order} key={order.ORDER_ID} address={this.state.addressList}></OrderListItem>
                            })}
                        </List>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(CustomerOrders)

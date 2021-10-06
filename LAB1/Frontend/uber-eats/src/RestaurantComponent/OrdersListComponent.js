import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'

import NavComponent from '../SharedComponents/NavComponent'
import OrderListItemComponent from './OrderListItemComponent'
export class OrdersListComponent extends Component {
    constructor(props) {
        super(props)
        this.masterOrdersList=[]
        this.state = {
            orders: [],
            filter:"all"
        }
        console.log(this.props.match.params.restId)


    }

    componentDidMount() {
       let url=`${baseUrl}/orders/restaurant/${this.props.match.params.restId}`
       axios.get(url).then(res=>{
           this.masterOrdersList=res.data;
           this.setState({orders:res.data})
       })
    }
    filter=(value)=>{
        let newOrder=["new order","orderPreparing","pickupReady","onTheWay"];
        let deliveredOrder=["picked up","delivered"]
        let filteredList=[]
        switch(value){
            case "all":
                this.setState({orders:this.masterOrdersList,filter:"all"})
                break;
            case "new":
                   filteredList=this.masterOrdersList.filter(order=>{
                   return newOrder.includes(order.ORD_STATUS)
                })
                this.setState({orders:filteredList,filter:"new"})
                break;
            case "delivered":
                    filteredList=this.masterOrdersList.filter(order=>{
                    return deliveredOrder.includes(order.ORD_STATUS)
                })
                this.setState({orders:filteredList,filter:"delivered"})
                break;
        }
    }
    handleOrderFilter=(e)=>{
        console.log(e.target.value)
        this.filter(e.target.value);
    }
    handleChildUpdate=()=>{
        console.log("Inside update")
        let url=`${baseUrl}/orders/restaurant/${this.props.match.params.restId}`
       axios.get(url).then(res=>{
           this.masterOrdersList=res.data;
           this.setState({orders:res.data})
           this.filter(this.state.filter)
       })
    }
    render() {

        return (
            <div>
                <NavComponent view="restaurant" rid={this.props.match.params.restId}></NavComponent>
            <div className="container" id="modalLanding">
                <div className="row mt-4">
                <h2 className="col-sm-6">Orders</h2>
                <select className="form-control col-sm-4" onChange={this.handleOrderFilter}>
                    <option value="all">All Orders</option>
                    <option value="new">New Order</option>
                    <option value="delivered">Delivered Order</option>
                    <option value="cancelled">Cancelled Order</option>
                </select>
                </div>
                <ul className="list-group">
                    {
                        this.state.orders.map((order) => {
                            console.log(order);
                            return <OrderListItemComponent order={order} key={order.ORDER_ID} update={this.handleChildUpdate}></OrderListItemComponent>
                        })}
                    
                </ul>
            </div>
            </div>
        )

    }
}

export default withRouter(OrdersListComponent)

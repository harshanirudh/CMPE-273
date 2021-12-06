import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'

import NavComponent from '../SharedComponents/NavComponent'
import OrderListItemComponent from './OrderListItemComponent'
import { getROrdersList, updateROrdersList } from '../Redux/Restaurant/Restaurant-actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TablePagination from '@mui/material/TablePagination';
import { GET_RESTAURANT_ORDERS_QUERY } from '../queries'
export class OrdersListComponent extends Component {
    constructor(props) {
        super(props)
        this.masterOrdersList = []
        this.state = {
            orders: [],
            filter: "all",
            page: 0,
            rowsPerPage: 5
        }
        console.log(this.props.match.params.restId)


    }

    static mapStateToProps = state => {
        return { Restaurant: state.Restaurant }
    }
    static mapDispatchToProps = dispatch => {
        return bindActionCreators({ getROrdersList, updateROrdersList }, dispatch)
    }
    componentDidMount() {
        let url = `${baseUrl}/orders/restaurant/${this.props.match.params.restId}`
        
        axios.post(url,{
            query:GET_RESTAURANT_ORDERS_QUERY,
            variables:{
                restId:this.props.match.params.restId
            }
        }).then(res => {
            this.masterOrdersList = res.data.data.getOrdersForRestaurant;
            this.props.getROrdersList(res.data.data.getOrdersForRestaurant)
            this.setState({ orders: res.data.data.getOrdersForRestaurant })
        })
    }
    filter = (value) => {
        let newOrder = ["new order", "orderPreparing", "pickupReady", "onTheWay"];
        let deliveredOrder = ["picked up", "delivered"]
        let cancelledOrder=["cancelled"]
        let filteredList = []
        switch (value) {
            case "all":
                this.setState({ orders: this.masterOrdersList, filter: "all" })
                break;
            case "new":
                filteredList = this.masterOrdersList.filter(order => {
                    return newOrder.includes(order.ORD_STATUS)
                })
                this.setState({ orders: filteredList, filter: "new" })
                break;
            case "delivered":
                filteredList = this.masterOrdersList.filter(order => {
                    return deliveredOrder.includes(order.ORD_STATUS)
                })
                this.setState({ orders: filteredList, filter: "delivered" })
                break;
            case "cancelled":
                filteredList = this.masterOrdersList.filter(order => {
                    return cancelledOrder.includes(order.ORD_STATUS)
                })
                this.setState({ orders: filteredList, filter: "cancelled" })
                break;
        }
    }
    handleOrderFilter = (e) => {
        console.log(e.target.value)
        this.filter(e.target.value);
    }
    handleChildUpdate = () => {
        console.log("Inside update")
        let url = `${baseUrl}/orders/restaurant/${this.props.match.params.restId}`
        axios.post(url,{
            query:GET_RESTAURANT_ORDERS_QUERY,
            variables:{
                restId:this.props.match.params.restId
            }
        }).then(res => {
            this.masterOrdersList = res.data.data.getOrdersForRestaurant;
            this.props.updateROrdersList(res.data.data.getOrdersForRestaurant)
            this.setState({ orders: res.data.data.getOrdersForRestaurant })
            this.filter(this.state.filter)
        })
    }

    handleChangePage = (event, newPage) => {
        // setPage(newPage);
        this.setState({ page: newPage })
    };

    handleChangeRowsPerPage = (event) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        })
    };
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
                        <TablePagination
                            component="div"
                            count={this.state.orders.length}
                            page={this.state.page}
                            onPageChange={this.handleChangePage}
                            rowsPerPage={this.state.rowsPerPage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[2, 5, 10]}
                        />
                    </div>
                    <ul className="list-group">
                        {
                            (this.state.rowsPerPage > 0
                                ? this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.orders)
                                .map((order) => {
                                    console.log(order);
                                    return <OrderListItemComponent order={order} key={order._id} update={this.handleChildUpdate}></OrderListItemComponent>
                                })}

                    </ul>
                </div>
            </div>
        )

    }
}
const OrdersListReduxComponent = connect(OrdersListComponent.mapStateToProps, OrdersListComponent.mapDispatchToProps)(OrdersListComponent)
export default withRouter(OrdersListReduxComponent)

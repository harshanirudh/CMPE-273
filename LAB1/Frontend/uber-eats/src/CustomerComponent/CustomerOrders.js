import axios from 'axios'
import React, { Component } from 'react'
import { baseUrl } from '../apiConfig'
import NavComponent from '../SharedComponents/NavComponent'
import { withRouter } from 'react-router-dom'
import { Avatar, Card, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import CustOrderReciept, { OrderListItem } from './OrderListItem'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import TablePagination from '@mui/material/TablePagination';
import { getAllOrders } from '../Redux/Customer/Customer-actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
export class CustomerOrders extends Component {
    constructor(props) {
        super(props)
        this.masterOrderList = []
        this.state = {
            orderList: [],
            filter: 'all',
            addressList: [],
            page: 0,
            rowsPerPage: 5
        }
    }
    static mapStateToProps = state => {
        return { Customer: state.Customer }
    }
    static mapDispatchToProps = dispatch => {
        return bindActionCreators({ getAllOrders }, dispatch)
    }
    getAddressList = () => {
        let getIntialAddress = `${baseUrl}/users/customers/${this.props.match.params.custId}`
        let getAllDeliveryAddress = `${baseUrl}/deliveryAddress/${this.props.match.params.custId}`
        axios.all([axios.get(getIntialAddress), axios.get(getAllDeliveryAddress)]).then((res) => {
            let list = [];
            let intialAddress = {
                add_id: 0,
                address: res[0]?.data[0]?.STREET,
                city: res[0]?.data[0]?.CITY,
                zipcode: res[0]?.data[0]?.ZIPCODE
            }
            let otherAddress = res[1]?.data;
            otherAddress?.unshift(intialAddress);
            console.log(otherAddress)
            this.setState({ addressList: otherAddress });
        })
    }
    componentDidMount() {
        let url = `${baseUrl}/orders/customer/${this.props.match.params.custId}`
        this.getAddressList()
        axios.get(url).then(res => {
            this.masterOrderList = res.data
            console.log(res.data)
            this.setState({ orderList: res.data })
            this.props.getAllOrders(res.data)
        })
    }
    handleFilter = (e) => {
        console.log(e.target.value)
        let filteredList = []
        switch (e.target.value) {
            case "all":
                this.setState(prevState => ({
                    orderList: [...this.masterOrderList],
                    filter: "all"
                }), () => console.log(this.state))
                break;
            case "new order":
                filteredList = this.masterOrderList.filter(order => {
                    return order.ORD_STATUS === "new order"
                })
                this.setState({ orderList: filteredList, filter: "new order" }, () => console.log(this.state))
                break;
            case "orderPreparing":
                filteredList = this.masterOrderList.filter(order => {
                    return order.ORD_STATUS === "orderPreparing"
                })
                this.setState({ orderList: filteredList, filter: "orderPreparing" }, () => console.log(this.state))
                break;
            case "pickupReady":
                filteredList = this.masterOrderList.filter(order => {
                    return order.ORD_STATUS === "pickupReady"
                })
                this.setState({ orderList: filteredList, filter: "pickupReady" }, () => console.log(this.state))
                break;
            case "picked up":
                filteredList = this.masterOrderList.filter(order => {
                    return order.ORD_STATUS === "picked up"
                })
                this.setState({ orderList: filteredList, filter: "picked up" }, () => console.log(this.state))
                break;
            case "onTheWay":
                filteredList = this.masterOrderList.filter(order => {
                    return order.ORD_STATUS === "onTheWay"
                })
                this.setState({ orderList: filteredList, filter: "onTheWay" }, () => console.log(this.state))
                break;
            case "delivered":
                filteredList = this.masterOrderList.filter(order => {
                    return order.ORD_STATUS === "delivered"
                })
                this.setState({ orderList: filteredList, filter: "delivered" }, () => console.log(this.state))
                break;
            case "cancelled":
                filteredList = this.masterOrderList.filter(order => {
                    return order.ORD_STATUS === "cancelled"
                })
                this.setState({ orderList: filteredList, filter: "cancelled" }, () => console.log(this.state))
                break;
        }
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
                <NavComponent view="customer" cid={this.props.match.params.custId}></NavComponent>
                <div>
                    <div>
                        <select className="form-control col-sm-6 mt-4 ml-3" onChange={this.handleFilter}>
                            <option value="all">All Orders</option>
                            <option value="new order">Order Confirmed</option>
                            <option value="orderPreparing">Preparing</option>
                            <option value="pickupReady">Pickup Ready</option>
                            <option value="picked up">Picked Up</option>
                            <option value="onTheWay">On the way</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        {/* <select className="form-control">
                            <option value="new order">Order Recieved</option>
                            <option value="orderPreparing">Preparing</option>
                            <option value="onTheWay">On the way</option>
                            <option value="delivered">Delivered</option>
                        </select> */}
                    </div>
                    <Card>
                        <div className="row">
                            <div className="col-md-6"><CardHeader title={"Order History"}></CardHeader></div>
                            <div className="col-md-6">
                                <TablePagination
                                    component="div"
                                    count={this.state.orderList.length}
                                    page={this.state.page}
                                    onPageChange={this.handleChangePage}
                                    rowsPerPage={this.state.rowsPerPage}
                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                    rowsPerPageOptions={[2, 5, 10]}
                                />
                            </div>
                        </div>
                        <List sx={{ width: '100%', bgcolor: 'background.paper', justifyContent: 'center' }}>
                            {(this.state.rowsPerPage > 0
                                ? this.state.orderList.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.orderList
                            ).map((order, index) => {
                                return <OrderListItem order={order} key={order.ORDER_ID} address={this.state.addressList}></OrderListItem>
                            })}
                        </List>
                    </Card>
                </div>
            </div>
        )
    }
}
const CustomerOrdersReduxComponent = connect(CustomerOrders.mapStateToProps, CustomerOrders.mapDispatchToProps)(CustomerOrders)
export default withRouter(CustomerOrdersReduxComponent)

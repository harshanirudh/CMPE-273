import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CustomPopup from '../SharedComponents/CustomPopup'
export class OrdersListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
        console.log(this.props.match.params.restId)


    }

    componentDidMount() {
        let orders = [{
            orderId: 123,
            orderDetails: [{
                dishId: 123,
                dishName: 'Dosa',
                quantity:2
            },
            {
                dishId: 13,
                dishName: 'Poori',
                quantity:2
            }],
            orderAmount: 100,
            type:'pickup',
            status:'pickupReady'
        },
        {
            orderId: 324,
            orderDetails: [{
                dishId: 12,
                dishName: 'Idly',
                quantity:1
            }],
            orderAmount: 70,
            type:'delivery',
            status:'onTheWay'
        }]
        this.setState({
            orders: orders
        })

    }

    handleUpdate(order,e){
        console.log(order.orderId)
        console.log(e.target)
        // this.setState(order)

    }
    render() {

        return (
            <div className="container" id="modalLanding">
                <h2>Order for rest id {this.props.match.params.restId}</h2>
                <ul className="list-group">
                    {
                        this.state.orders.map((order) => {
                            console.log(order);
                            return <li className="list-group-item" key={order.orderId}>
                                <div className="row">
                                    <p className="col-sm-2">Order ID: {order.orderId}</p>
                                    <div className="col-sm-3">
                                         {order.orderDetails.map((item)=>{
                                            return <p> {item.dishName} x {item.quantity}</p>
                                        })}
                                    </div>
                                    <p className="col-sm-2">
                                        Total Amount:$ {order.orderAmount}
                                    </p>
                                    <div className="col-sm-3">
                                        
                                            
                                            {order.type==='pickup'?
                                            <div>
                                            <select name="deliveryStatus" className="form-control" selected={order.status}>
                                            <option value="orderRecvd">Order Recieved</option>
                                            <option value="orderPreparing">Preparing</option>
                                            <option value="pickupReady">Pickup Ready</option>
                                            <option value="picked up">Picked Up</option>
                                            </select>
                                            </div>
                                            :
                                            <div>
                                             <select name="deliveryStatus" className="form-control" selected={order.status}>
                                            <option value="orderRecvd">Order Recieved</option>
                                            <option value="orderPreparing">Preparing</option>
                                            <option value="onTheWay">On the way</option>
                                            <option value="delivered">Delivered</option>
                                            </select>
                                            </div>
                                        }
                                        
                                    </div>
                                    <div className="col-sm-2">
                                        <button type='button' className="btn btn-primary" onClick={(e)=>{this.handleUpdate(order,e)}}>Update</button>
                                        
                                         {/* <CustomPopup></CustomPopup> */}
                                    </div>
                                </div>
                            </li>
                        })
                    }

                </ul>
            </div>
        )

    }
}

export default withRouter(OrdersListComponent)

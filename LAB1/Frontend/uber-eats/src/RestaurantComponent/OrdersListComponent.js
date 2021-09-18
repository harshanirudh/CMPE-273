import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
            }],
            orderAmount: 100
        },
        {
            orderId: 324,
            orderDetails: [{
                dishId: 12,
                dishName: 'Idly',
                quantity:1
            }],
            orderAmount: 70
        }]
        this.setState({
            orders: orders
        })

    }


    render() {

        return (
            <div className="container">
                <h2>Order for rest id {this.props.match.params.restId}</h2>
                <ul className="list-group">
                    {
                        this.state.orders.map((order) => {
                            console.log(order);
                            return <li className="list-group-item" key={order.orderId}>
                                <div className="row">
                                    <p className="col-sm-3">Order ID: {order.orderId}</p>
                                    <p className="col-sm-3">
                                        Order Details: {order.orderDetails.map((item)=>{
                                            return <p> </p>
                                        })}
                                    </p>
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

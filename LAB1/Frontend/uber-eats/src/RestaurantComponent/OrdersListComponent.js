import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'

import NavComponent from '../SharedComponents/NavComponent'
import OrderListItemComponent from './OrderListItemComponent'
export class OrdersListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
        console.log(this.props.match.params.restId)


    }

    componentDidMount() {
       let url=`${baseUrl}/orders/restaurant/${this.props.match.params.restId}`
       axios.get(url).then(res=>{
           this.setState({orders:res.data})
       })
    }

    
    render() {

        return (
            <div>
                <NavComponent view="restaurant" rid={this.props.match.params.restId}></NavComponent>
            <div className="container" id="modalLanding">
                <h2>Order for rest id {this.props.match.params.restId}</h2>
                <ul className="list-group">
                    {
                        this.state.orders.map((order) => {
                            console.log(order);
                            return <OrderListItemComponent order={order} key={order.ORDER_ID}></OrderListItemComponent>
                        })}
                    
                </ul>
            </div>
            </div>
        )

    }
}

export default withRouter(OrdersListComponent)

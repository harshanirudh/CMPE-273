import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { RestaurantLanding } from '../RestaurantComponent/RestaurantLanding'



export class CustomerRestComponent extends Component {
    render() {
        return (
            <div>
                {/* <NavComponent view="customer"></NavComponent> */}
                <RestaurantLanding viewBy="customer" restId={this.props.match.params.restId} custId={this.props.match.params.custId}></RestaurantLanding>
            </div>
        )
    }
}

export default withRouter(CustomerRestComponent)

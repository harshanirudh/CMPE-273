import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { RestaurantLanding } from '../RestaurantComponent/RestaurantLanding'


export class CustomerRestComponent extends Component {
    render() {
        return (
            <div>
                <RestaurantLanding viewBy="customer" restId={this.props.match.params.restId}></RestaurantLanding>
            </div>
        )
    }
}

export default withRouter(CustomerRestComponent)

import React, { Component } from 'react'
import CustomerProfile from '../CustomerComponent/CustomerProfile'
import { withRouter } from 'react-router-dom'

export class ViewCustomerProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <CustomerProfile viewBy="restaurant" restId={this.props.match.params.restId} custId={this.props.match.params.custId}></CustomerProfile>
            </div>
        )
    }
}

export default withRouter(ViewCustomerProfile)

import React, { Component } from 'react'
import PhotoCollage from '../SharedComponents/PhotoCollage'
import MenuList from './MenuList'

export class RestaurantLanding extends Component {
    render() {
        return (
            <div className="container-fluid " >
                <div className="row">
                    <div className="col-sm-6 fixed-top one">
                        <PhotoCollage></PhotoCollage>
                    </div>
                    <div className="col-sm-6 offset-sm-6 two">
                        <MenuList></MenuList>
                    </div>
                </div>
            </div>
        )
    }
}

export default RestaurantLanding

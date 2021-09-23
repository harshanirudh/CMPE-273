import React, { Component } from 'react'
import PhotoCollage from '../SharedComponents/PhotoCollage'
import PhotoViewer from '../SharedComponents/PhotoViewer'
import MenuList from './MenuList'
import {withRouter} from 'react-router-dom'

export class RestaurantLanding extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        
    }
   
    
    render() {
        return (
            <div className="container-fluid " >
                <div className="row">
                {/* fixed-top one */}
                    <div className="col-sm-4 "> 
                        {/* <PhotoCollage></PhotoCollage> */}
                        <PhotoViewer restId={this.props.match.params.profileId}></PhotoViewer>
                    </div>
                    {/* offset-sm-6 two */}
                    <div className="col-sm-8 ">
                        <MenuList restId={this.props.match.params.profileId} ></MenuList>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RestaurantLanding)

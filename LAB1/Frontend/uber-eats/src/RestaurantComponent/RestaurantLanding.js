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
    setRestID(){
       if(this.props.viewBy==='customer'){
            return this.props.restId
       }else{
           return this.props.match.params.profileId;
       }

    }
    setViewBy(){
        if(this.props.viewBy==='customer'){
            return 'customer'
       }else{
           return 'restaurant'
       }
    }
    render() {
        return (
            <div className="container-fluid " >
                <div className="row">
                {/* fixed-top one */}
                    <div className="col-sm-4 "> 
                        {/* <PhotoCollage></PhotoCollage> */}
                        <PhotoViewer restId={this.setRestID()} viewBy={this.setViewBy()}></PhotoViewer>
                    </div>
                    {/* offset-sm-6 two */}
                    <div className="col-sm-8 ">
                        <MenuList restId={this.setRestID()} viewBy={this.setViewBy()}></MenuList>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RestaurantLanding)

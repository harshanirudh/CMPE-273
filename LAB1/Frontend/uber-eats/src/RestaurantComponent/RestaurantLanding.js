import React, { Component } from 'react'
import PhotoCollage from '../SharedComponents/PhotoCollage'
import PhotoViewer from '../SharedComponents/PhotoViewer'
import MenuList from './MenuList'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../apiConfig'
import { Typography } from '@mui/material'
import NavComponent from '../SharedComponents/NavComponent'
export class RestaurantLanding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restName:'',
            counter:''
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
    componentDidMount(){
        let url=`${baseUrl}/users/restarunt/${this.setRestID()}`
        axios.get(url).then((res)=>{
            this.setState({restName:res.data[0]?.RNAME})
        })
    }
    getCounter(count){
        this.setState({counter:count})
    }
    render() {
        console.log(this.setRestID())
        return (
            <div >
            <NavComponent view={this.setViewBy()} rid={this.setRestID()} cid={this.props.custId} cartCounter={this.state.counter}></NavComponent>
            <div className="container-fluid " >
                   <Typography variant="h4" align="center"> {this.state.restName}</Typography>
                
                <div className="row">
                {/* fixed-top one */}
                    <div className="col-sm-4 "> 
                        {/* <PhotoCollage></PhotoCollage> */}
                        <PhotoViewer restId={this.setRestID()} viewBy={this.setViewBy()}></PhotoViewer>
                    </div>
                    {/* offset-sm-6 two */}
                    <div className="col-sm-8 ">
                        <MenuList restId={this.setRestID()} viewBy={this.setViewBy()} custId={this.props.custId} cartCounter={(count)=>this.getCounter(count)}></MenuList>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(RestaurantLanding)

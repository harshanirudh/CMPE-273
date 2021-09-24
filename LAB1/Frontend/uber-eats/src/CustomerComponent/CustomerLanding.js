
import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
export class CustomerLanding extends Component {
    constructor(props) {
        super(props)

        this.state = {
            restaurantsList: []
        }
    }
    componentDidMount() {
        let url = `${baseUrl}/users/restarunt`
        let apiCustomerLocation=`${baseUrl}/users/customer/location/${this.props.match.params.profileId}`;
        // axios.get(url).then((res => {
        //     this.setState({ restaurantsList: res.data })
        // }))
        
        
        axios.all([axios.get(url),axios.get(apiCustomerLocation)]).then(resp=>{
            
            let restaurantsList=[]
            restaurantsList=resp[0].data
            let location=resp[1].data.location
            let fList=restaurantsList.filter(item=>{
              let city= item.CITY.toString().toLowerCase();
               return city===location.toString().toLowerCase()
            })
            let sList=restaurantsList.filter(item=>{
                let city= item.CITY.toLowerCase();
                return city!=location.toString().toLowerCase()
             })
            let finalList=[];
            finalList.push(...fList,...sList)
            console.log('first list',fList,'Second list',sList)
            this.setState({restaurantsList:finalList})
        })
    }
    setRestImage(imageURL) {
        if (imageURL && imageURL.length > 0) {
            console.log(imageURL)
            return imageURL
        }
        else {
            return '/dish.png'
        }
    }
    // renderDiv = (index) => {
    //     if (index % 3 === 0 && index != 0) {
    //         console.log('render', index)
    //         return <div className="row">
    //     }
    //             else
    //             console.log(index)
    // }
                render() {
        return (
                <div className="container mt-4" >
                    {/* Welcome user {this.props.match.params.profileId} */}
                    <div className="row ">
                        {/* {this.state.restaurantsList.map( item=>{
                        // console.log(this.state.restaurantsList)
                    return (
                    <div className="card mb-4" key={item.REST_ID} >
                        <div className="card-body bg-light">
                            <img class="card-img-top" src={this.setRestImage(item.IMAGE)} alt={item.RNAME} style={{height:'150px'}}/>
                            <h5 className="card-title"> {item.RNAME} </h5>
                            <p className="card-text text-secondary">{item.STREET}</p>
                            <p className=" text-secondary">{item.CITY}</p>
                            <p className="card-text text-secondary">Timing: {item.START_TIME}-{item.END_TIME}</p>
                        </div>
                    </div>
                   )
                    })} */}

                        {this.state.restaurantsList.map((item, index) => {
                            return (
                            
                                    <Card className="col-md-3 mb-3" key={item.REST_ID} >
                                        <CardContent >
                                            <img src={this.setRestImage(item.IMAGE)} alt={item.RNAME} style={{ height: '150px', width: '200px' }} />
                                            <h5 > {item.RNAME} </h5>
                                            <p >{item.STREET}</p>
                                            <p >{item.CITY}</p>
                                            <p >Timing: {item.START_TIME}-{item.END_TIME}</p>
                                        </CardContent>
                                        
                                    </Card>
                                
                            )
                        })}
                    </div>
                </div>
                )
    }
}

                export default withRouter(CustomerLanding)

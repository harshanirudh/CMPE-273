
import axios from 'axios'
import React, { Component, createRef } from 'react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
export class CustomerLanding extends Component {
    constructor(props) {
        super(props)
        this.masterRestaurantList = []
        this.searchCategory = createRef('');
        this.state = {
            restaurantsList: [],
            searchString: '',
            deliveryFilter:''
        }
    }

    componentDidMount() {
        let url = `${baseUrl}/users/restarunt`
        let apiCustomerLocation = `${baseUrl}/users/customer/location/${this.props.match.params.profileId}`;
        axios.all([axios.get(url), axios.get(apiCustomerLocation)]).then(resp => {

            let restaurantsList = []
            restaurantsList = resp[0].data
            let location = resp[1].data.location
            let fList = restaurantsList.filter(item => {
                let city = item.CITY.toString().toLowerCase();
                return city === location.toString().toLowerCase()
            })
            let sList = restaurantsList.filter(item => {
                let city = item.CITY.toLowerCase();
                return city != location.toString().toLowerCase()
            })
            let finalList = [];
            finalList.push(...fList, ...sList)
            this.masterRestaurantList = finalList;
            console.log('first list', fList, 'Second list', sList)
            this.setState({ restaurantsList: finalList })

        })
    }

    handleSearchText(e) {
        this.setState({ searchString: e.target.value })
    }
    handleFilterToggle(e){
        let filterList=this.masterRestaurantList.filter(i=>{
            return (i.RDELIVERY_MODE==  e.target.value || i.RDELIVERY_MODE=='both')
        })
        this.setState({ deliveryFilter: e.target.value })
        this.setState({restaurantsList:filterList})
        console.log(e.target.value)
    }
    onSearchBy() {
        let searchString = this.state.searchString.trim();
        if (searchString.length > 0) {
            if (this.searchCategory.current.value === 'dish') {
                let url = `${baseUrl}/restaurant/searchBy/dishes`
                axios.post(url, { 'dishSeq': searchString }).then((res => {
                    let filterList = this.masterRestaurantList.filter(i => {
                        // Check if delivery/pickup toggle is selected, if selected check the delivery mode and return
                        if(this.state.deliveryFilter.length>0)
                            return (res.data.rest_id.includes(i.REST_ID)) && ((i.RDELIVERY_MODE== this.state.deliveryFilter) || (i.RDELIVERY_MODE=='both'))
                        else
                        {
                           return res.data.rest_id.includes(i.REST_ID);
                        }
                    })
                    console.log(filterList)
                    this.setState({ restaurantsList: filterList })
                }))
            }
            else if (this.searchCategory.current.value === 'restaurant') {
                let filterList = this.masterRestaurantList.filter(i => {
                    if(this.state.deliveryFilter.length<=0)
                        return (i.RNAME.toUpperCase().includes(searchString.toUpperCase())) 
                    else 
                    return (i.RNAME.toUpperCase().includes(searchString.toUpperCase())) && ((i.RDELIVERY_MODE== this.state.deliveryFilter) || (i.RDELIVERY_MODE=='both'))
                })
                console.log(filterList)
                this.setState({ restaurantsList: filterList })
            }
        } else {
            this.setState({ restaurantsList: this.masterRestaurantList })
        }
    }

    setRestImage(imageURL) {
        if (imageURL && imageURL.length > 0) {
            return imageURL
        }
        else {
            return '/dish.png'
        }
    }
    NoRestaurantsToDisplay =
        <div className="container">
            <h5 className="text-danger"> No Restaurants to display</h5>
        </div>

    render() {

        return (
            <div className="container-fluid mt-2" >
                {/* Welcome user {this.props.match.params.profileId} */}
                <div className="row justify-content-center">
                    <select className="form-control col-sm-2" ref={this.searchCategory}>
                        <option value="restaurant">Restaurants</option>
                        <option value="dish">Dish</option>

                    </select>
                    <input className="form-control-md col-sm-4" type="text" placeholder="Search.." name="search" onChange={(e) => this.handleSearchText(e)} />
                    <button type="submit" className="btn btn-primary" onClick={this.onSearchBy.bind(this)}>search</button>
                    <div className="col-sm-3">
                        <ToggleButtonGroup color="info" value={this.state.deliveryFilter}exclusive onChange={this.handleFilterToggle.bind(this)}>
                            <ToggleButton value="delivery" aria-label="left aligned">Delivery</ToggleButton>
                            <ToggleButton value="pickup" aria-label="left aligned">Pickup</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row mt-2">
                        {this.state.restaurantsList.length <= 0 ? this.NoRestaurantsToDisplay : ''}
                        {this.state.restaurantsList.map((item, index) => {
                            return (

                                <Card className="col-md-2 mb-3" key={item.REST_ID} style={{ margin: '10px' }}>
                                    <CardContent >
                                        <img src={this.setRestImage(item.IMAGE)} alt={item.RNAME} style={{ height: '150px', width: '200px' }} />
                                        <Link to={`/customer/${this.props.match.params.profileId}/restaurant/${item.REST_ID}`}><h5 > {item.RNAME} </h5></Link>
                                        <p >{item.STREET}</p>
                                        <p >{item.CITY}</p>
                                        <p >Timing: {item.START_TIME}-{item.END_TIME}</p>
                                        <p >{item.RDELIVERY_MODE}</p>
                                    </CardContent>

                                </Card>

                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CustomerLanding)


import axios from 'axios'
import React, { Component, createRef } from 'react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import NavComponent from '../SharedComponents/NavComponent';
export class CustomerLanding extends Component {
    constructor(props) {
        super(props)
        this.masterRestaurantList = []
        this.searchCategory = createRef('');
        this.favouritesRestIds=[]
        this.state = {
            restaurantsList: [],
            searchString: '',
            deliveryFilter: '',
            favouritesRestIds:[],
            loading:false
        }
    }

    componentDidMount() {
        let url = `${baseUrl}/users/restarunt`
        let apiCustomerLocation = `${baseUrl}/users/customer/location/${this.props.match.params.custId}`;
        let getFavRestId=`${baseUrl}/favourites/customer/${this.props.match.params.custId}`
        axios.all([axios.get(url), axios.get(apiCustomerLocation),axios.get(getFavRestId)]).then(resp => {

            let restaurantsList = []
            restaurantsList = resp[0].data
            let location = resp[1].data?.location
            // this.favouritesRestIds=resp[2].data?.rest_ids
            let fList = restaurantsList.filter(item => {
                let city = item.CITY.toString().toLowerCase();
                return city === location?.toString().toLowerCase()
            })
            let sList = restaurantsList.filter(item => {
                let city = item.CITY.toLowerCase();
                return city != location?.toString().toLowerCase()
            })
            let finalList = [];
            finalList.push(...fList, ...sList)
            this.masterRestaurantList = finalList;
            console.log('first list', fList, 'Second list', sList)
            this.setState(
                { 
                    restaurantsList: finalList ,
                    favouritesRestIds:resp[2].data?.rest_ids
                })

        })
    }

    handleSearchText(e) {
        this.setState({ searchString: e.target.value })
    }
    handleFilterToggle(e) {
        if(e.target.value!=""){
        let filterList = this.masterRestaurantList.filter(i => {
            return (i.RDELIVERY_MODE == e.target.value || i.RDELIVERY_MODE == 'both')
        })
        this.setState({ deliveryFilter: e.target.value })
        this.setState({ restaurantsList: filterList })
    }
    else{
        this.setState({ deliveryFilter: e.target.value })
        this.setState({ restaurantsList: this.masterRestaurantList })
    }
        console.log(e.target.value)
    }
    /**
     * Search basesd on dish, location, restuaurants
     */
    onSearchBy() {
        let searchString = this.state.searchString.trim();
        if (searchString.length > 0) {
            if (this.searchCategory.current.value === 'dish') {
                let url = `${baseUrl}/restaurant/searchBy/dishes`
                axios.post(url, { 'dishSeq': searchString }).then((res => {
                    let filterList = this.masterRestaurantList.filter(i => {
                        // Check if delivery/pickup toggle is selected, if selected check the delivery mode and return
                        if (this.state.deliveryFilter.length > 0)
                            return (res.data.rest_id.includes(i.REST_ID)) && ((i.RDELIVERY_MODE == this.state.deliveryFilter) || (i.RDELIVERY_MODE == 'both'))
                        else {
                            return res.data.rest_id.includes(i.REST_ID);
                        }
                    })
                    console.log(filterList)
                    this.setState({ restaurantsList: filterList })
                }))
            }
            else if (this.searchCategory.current.value === 'restaurant') {
                let filterList = this.masterRestaurantList.filter(i => {
                    if (this.state.deliveryFilter.length <= 0)
                        return (i.RNAME.toUpperCase().includes(searchString.toUpperCase()))
                    else
                        return (i.RNAME.toUpperCase().includes(searchString.toUpperCase())) && ((i.RDELIVERY_MODE == this.state.deliveryFilter) || (i.RDELIVERY_MODE == 'both'))
                })
                console.log(filterList)
                this.setState({ restaurantsList: filterList })
            }
            else if (this.searchCategory.current.value == 'location') {
                let filterList = this.masterRestaurantList.filter(i => {
                    if (this.state.deliveryFilter.length <= 0)
                        return i.CITY?.toUpperCase().includes(searchString.toUpperCase())
                    else
                        return (i.CITY?.toUpperCase().includes(searchString.toUpperCase())) && ((i.RDELIVERY_MODE == this.state.deliveryFilter) || (i.RDELIVERY_MODE == 'both'))
                })
                this.setState({ restaurantsList: filterList })
            }
        } else {
            this.setState({ restaurantsList: this.masterRestaurantList })
        }
    }

    handleTypeChange=(e)=>{
        console.log(e.target.value)
        if(e.target.value==='all'){
            this.setState({restaurantsList:this.masterRestaurantList})
        }else{
        let url=`${baseUrl}/restaurant/searchBy/type/${e.target.value}`
        axios.get(url).then(res=>{
            let filterList=this.masterRestaurantList.filter(i=>{
                console.log(res.data)
                return res.data.rest_id?.includes(i.REST_ID)
            })
            this.setState({restaurantsList:filterList})
        })
    }
    }
    /**
     * Takes Image Url and check if its present, if not sets to dish image in public folder
     * @param {*} imageURL 
     * @returns 
     */
    setRestImage(imageURL) {
        if (imageURL && imageURL.length > 0) {
            return imageURL
        }
        else {
            return '/dish.png'
        }
    }
    /**
     * When there are no restuarant to display
     */
    NoRestaurantsToDisplay =
        <div className="container">
            <h5 className="text-danger"> No Restaurants to display</h5>
        </div>
        /**
         * Takes Rest Id as param and inserts it into database, set state to trigger the color change
         * @param {*} restId 
         */
    setFavourite(restId){
        let url=`${baseUrl}/favourites/add/${this.props.match.params.custId}/${restId}`
        this.setState({loading:true})
        axios.post(url).then((res)=>{
            let newArr=[restId,...this.state.favouritesRestIds]
            this.setState({
                loading:false,
                favouritesRestIds:newArr
            })  
        }).catch((err)=>{
            this.setState({loading:false})
        })
    }
    /**
     * Set color of favourite icon to red or blank
     * @param {*} rest_id 
     * @returns 
     */
    getFavouriteIconColor(rest_id){
        return this.state.favouritesRestIds.includes(rest_id)?'error':'info'
    }
    render() {
        if(this.state.loading==true){
            return (
                <div className="spinner-border"></div>
            )
        }
        return (
            <div >
                <NavComponent view="customer" cid={this.props.match.params.custId}></NavComponent>
            <div className="container-fluid mt-2" >
                {/* Welcome user {this.props.match.params.custId} */}
                <div className="row justify-content-center">
                    
                    <select className="form-control col-sm-2" ref={this.searchCategory}>
                        <option value="restaurant">Restaurants</option>
                        <option value="dish">Dish</option>
                        <option value="location">Location</option>

                    </select>
                    <input className="form-control-md col-sm-4" type="text" placeholder="Search.." name="search" onChange={(e) => this.handleSearchText(e)} />
                    <button type="submit" className="btn btn-primary" onClick={this.onSearchBy.bind(this)}>search</button>
                    <div className="col-sm-3">
                        <ToggleButtonGroup color="info" value={this.state.deliveryFilter} exclusive onChange={this.handleFilterToggle.bind(this)} elevation="4">
                            <ToggleButton value="delivery" aria-label="left aligned">Delivery</ToggleButton>
                            <ToggleButton value="pickup" aria-label="left aligned">Pickup</ToggleButton>
                            <ToggleButton value="" aria-label="left aligned">Both</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="col-sm-2">
                    <select className="form-control " name="type"onChange={this.handleTypeChange}>
                        <option value="all">All</option>
                        <option value="Veg">Veg</option>
                        <option value="Non Veg">Non Veg</option>
                        <option value="Vegan">Vegan</option>
                    </select>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row mt-2">
                        {this.state.restaurantsList.length <= 0 ? this.NoRestaurantsToDisplay : ''}
                        {this.state.restaurantsList.map((item, index) => {
                            return (

                                <Card className="col-md-2 mb-3" key={item.REST_ID} style={{ margin: '10px' }} elevation="3">
                                    {/* <img src={this.setRestImage(item.IMAGE)} alt={item.RNAME} style={{ height: '150px', width: '200px' }} /> */}
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={this.setRestImage(item.IMAGE)}
                                    />
                                    <CardContent >
                                        <Link to={`/customer/${this.props.match.params.custId}/restaurant/${item.REST_ID}`}><h5 > {item.RNAME} </h5></Link> 
                                        <p >{item.STREET}</p>
                                        <p >{item.CITY}</p>
                                        <p >Timing: {item.START_TIME}-{item.END_TIME}</p>
                                        {/* <p >Delivery :{item.RDELIVERY_MODE?.toUpperCase()}</p> */}
                                        <IconButton aria-label="add to favorites" onClick={(e)=>this.setFavourite(item.REST_ID)}>
                                            <FavoriteIcon color={this.getFavouriteIconColor(item.REST_ID)}/>
                                        </IconButton>
                                    </CardContent>

                                </Card>

                            )
                        })}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(CustomerLanding)

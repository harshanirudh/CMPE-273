import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'
import NavComponent from '../SharedComponents/NavComponent'
import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getFavouritesRest} from '../Redux/Customer/Customer-actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GET_CUST_FAVS_REST_DETAILS } from '../queries'
export class CustomerFavouritesList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            restaurantsList:[]
        }
    }
    static mapStateToProps = state => {
        return { Customer: state.Customer }
    }
    static mapDispatchToProps = dispatch => {
        return bindActionCreators({ getFavouritesRest }, dispatch)
    }
    componentDidMount(){
        let url=`${baseUrl}/favourites/details/customer/${this.props.match.params.custId}`
        let query=GET_CUST_FAVS_REST_DETAILS
        axios.post(url,{
            query,
            variables:{
                custId:this.props.match.params.custId
            }
        }).then((resp)=>{
             console.log(resp.data)
             this.props.getFavouritesRest(resp.data.data.getFavsDetails.map(i=>i._id))
             this.setState({restaurantsList:resp.data.data.getFavsDetails})
        })
    }
    setRestImage(imageURL) {
        if (imageURL && imageURL.length > 0) {
            return imageURL
        }
        else {
            return '/dish.png'
        }
    }
    render() {
        return (
            <div>
                <NavComponent view="customer" cid={this.props.match.params.custId}></NavComponent>
                            <div className="container">
                                    <Typography title="Favourites" variant="h3" display="flex" justifyContent="center" >Favourites</Typography>
                                    <br/>
                                <div className="row mt-2">
                {this.state.restaurantsList.map((item, index) => {
                            return (
                                <Card className="col-md-3 mb-3" key={item._id} style={{ margin: '10px' }}>
                                    {/* <img src={this.setRestImage(item.IMAGE)} alt={item.RNAME} style={{ height: '150px', width: '200px' }} /> */}
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={this.setRestImage(item.IMAGE)}
                                    />
                                    <CardContent >
                                        <Link to={`/customer/${this.props.match.params.custId}/restaurant/${item._id}`}><h5 > {item.RNAME} </h5></Link> 
                                        <p >{item.STREET}</p>
                                        <p >{item.CITY}</p>
                                        <p >Timing: {item.START_TIME}-{item.END_TIME}</p>
                                        <p >{item.RDELIVERY_MODE}</p>
                                        <IconButton aria-label="add to favorites" >
                                            <FavoriteIcon color="error"/>
                                        </IconButton>
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

const CustomerFavouritesListReduxComponent = connect(CustomerFavouritesList.mapStateToProps, CustomerFavouritesList.mapDispatchToProps)(CustomerFavouritesList)
export default withRouter(CustomerFavouritesListReduxComponent)

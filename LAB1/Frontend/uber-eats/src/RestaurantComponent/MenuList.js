import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../apiConfig'

export class MenuList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dishes: []
        }
    }
    async componentDidMount() {
        try {
            let url = `${baseUrl}/restaurant/${this.props.restId}/dishes`;
            let resultList = await (await axios.get(url)).data;
            this.setState({ dishes: resultList })
        } catch (err) {
            console.log(err)
        }
    }
    //  dishes = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    //  dishesList = 
    render() {
        return (
            <div>
                <h2 className="text-center">Menu</h2>
                <div className="text-center">
                    <Link to={`/restaurant/${this.props.restId}/dish/new`} className="btn btn-primary text-center">Add New Dish</Link>
                </div>
                <br></br>
                <div className="container">
                <div className=" card-columns" style={{display: 'inline-block'}}>
                    {this.state.dishes.map((dish) => {
                        return (
                                <div className="card h-100" key={dish.DISH_ID}>
                                    <img className="card-img-top" src={dish.IMAGE} alt="dish image" />
                                    <div className="card bg-ligth ">
                                        <div className="card-body ">
                                            <div className="card-text">
                                                {/* <h6>{dish.DISH_NAME}</h6> */}
                                                <Link to={`/restaurant/${this.props.restId}/dish/${dish.DISH_ID}`} className="stretched-link">{dish.DISH_NAME}</Link>
                                                <p className="text-left text-muted" >{dish.DISH_DESCR}</p>
                                                <p className="text-left">Price: {dish.PRICE}</p>
                                            </div>
                                            {/* <Link to={`/restaurant/${this.props.restId}/dish/${dish.DISH_ID}`} className="btn btn-primary  stretched-link">Edit dish</Link> */}
                                        </div>
                                    </div>
                                </div>
                            
                        )
                    })}
                </div>
                </div>
            </div>
        )
    }
}

export default MenuList

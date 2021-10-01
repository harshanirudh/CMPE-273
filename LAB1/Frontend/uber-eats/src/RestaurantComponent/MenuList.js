import { IconButton } from '@mui/material'
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../apiConfig'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { incrementCounter, decrementCounter } from '../Redux/Cart/Cart-actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
export class MenuList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dishes: [],
            // counter: sessionStorage.getItem('counter')!=null ? parseInt(sessionStorage.getItem('counter')) : 0
            toggleChange:false
        }
    }
    static mapStateToProps = state => {
        return { cartCounter: state.cartCounter }
    }
    static mapDispatchToProps = dispatch => {
        return bindActionCreators({ incrementCounter, decrementCounter }, dispatch)
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
    async add(dish) {

        let itemsPresent = JSON.parse(sessionStorage.getItem('cartItems'))
        let tempCounter =sessionStorage.getItem('counter')!=null?parseInt(sessionStorage.getItem('counter')):0
        console.log(tempCounter)
        if (itemsPresent) {
            let presentRestID = sessionStorage.getItem('restId')
            if (dish.REST_ID != presentRestID)
                alert('Do you want items to be discarded from your cart?')
            else {
                let index = itemsPresent.findIndex(d => { return d.DISH_ID === dish.DISH_ID })
                // console.log(index)
                if (index >= 0) {
                    console.log('items', itemsPresent, 'index', index)
                    itemsPresent[index].quantity = 1 + itemsPresent[index].quantity;
                    sessionStorage.setItem('cartItems', JSON.stringify(itemsPresent))
                    this.props.incrementCounter();
                    // await this.setState(prevState => {
                    //     return { counter: prevState.counter + 1 }
                    // })
                    tempCounter+=1
                    sessionStorage.setItem('counter', JSON.stringify(tempCounter))
                    this.setState(prevState => ({ toggleChange: !prevState.toggleChange }))
                    //  this.props.cartCounter(this.state.counter)
                }
                else {
                    dish.quantity = 1;
                    itemsPresent.push(dish)
                    sessionStorage.setItem('cartItems', JSON.stringify(itemsPresent))
                    this.props.incrementCounter();
                    // await this.setState(prevState => {
                    //     return { counter: prevState.counter + 1 }
                    // })
                    tempCounter+=1
                    sessionStorage.setItem('counter', JSON.stringify(tempCounter))
                    this.setState(prevState => ({ toggleChange: !prevState.toggleChange }))
                    //  this.props.cartCounter(this.state.counter)
                }
            }
        } else {
            dish.quantity = 1
            let itemToBeAdded = [dish]
            sessionStorage.setItem('cartItems', JSON.stringify(itemToBeAdded));
            sessionStorage.setItem('restId', this.props.restId);
            sessionStorage.setItem('custId', this.props.custId);
            this.props.incrementCounter();
            // await this.setState(prevState => {
            //     return { counter: prevState.counter + 1 }
            // })
            tempCounter+=1
            sessionStorage.setItem('counter', JSON.stringify(tempCounter))
            this.setState(prevState => ({ toggleChange: !prevState.toggleChange }))
            //  this.props.cartCounter(this.state.counter)

        }

    }
    async remove(dish) {
        let itemsPresent = JSON.parse(sessionStorage.getItem('cartItems'))
        let tempCounter =sessionStorage.getItem('counter')!=null?parseInt(sessionStorage.getItem('counter')):0
        if (itemsPresent) {
            let index = itemsPresent.findIndex(d => { return d.DISH_ID === dish.DISH_ID })
            if (index >= 0) {
                //When we get the dish to be deleted
                if (itemsPresent[index].quantity == 1) {
                    itemsPresent.splice(index, 1)
                    sessionStorage.setItem('cartItems', JSON.stringify(itemsPresent))
                    this.props.decrementCounter();
                    if (tempCounter == 1) {
                        sessionStorage.removeItem('restId')
                        sessionStorage.removeItem('custId')
                        sessionStorage.removeItem('cartItems')
                    }
                    // await this.setState(prevState => {
                    //     return { counter: prevState.counter - 1 }
                    // })
                    tempCounter-=1
                    sessionStorage.setItem('counter', JSON.stringify(tempCounter))
                } else {
                    itemsPresent[index].quantity = itemsPresent[index].quantity - 1;
                    sessionStorage.setItem('cartItems', JSON.stringify(itemsPresent))
                    this.props.decrementCounter();
                    if (tempCounter == 1) {
                        sessionStorage.removeItem('restId')
                        sessionStorage.removeItem('custId')
                        sessionStorage.removeItem('cartItems')
                    }
                    // await this.setState(prevState => {
                    //     return { counter: prevState.counter - 1 }
                    // })
                    tempCounter-=1
                    sessionStorage.setItem('counter', JSON.stringify(tempCounter))
                    this.setState(prevState => ({ toggleChange: !prevState.toggleChange }))
                }
            }
        } else {
            // sessionStorage.removeItem('restId')
            // sessionStorage.setItem('custId')
        }
    }
    render() {
        const { incrementCounter, decrementCounter } = this.props

        return (
            <div>
                <h2 className="text-center">Menu</h2>

                {this.props.viewBy == "customer" ? '' : (<div className="text-center">
                    <Link to={`/restaurant/${this.props.restId}/dish/new`} className="btn btn-primary text-center">Add New Dish</Link>
                </div>
                )}

                <br></br>
                <div className="container">
                    <div className=" card-columns" style={{ display: 'inline-block' }}>
                        {this.state.dishes.length > 0 ? this.state.dishes.map((dish) => {
                            return (
                                <div className="card h-100" key={dish.DISH_ID}>
                                    <img className="card-img-top" src={dish.IMAGE} alt="dish image" />
                                    <div className="card bg-ligth ">
                                        <div className="card-body ">
                                            <div className="card-text">
                                                {this.props.viewBy == "customer" ? <h6>{dish.DISH_NAME}</h6> : (
                                                    <Link to={`/restaurant/${this.props.restId}/dish/${dish.DISH_ID}`} className="stretched-link">{dish.DISH_NAME}</Link>
                                                )}
                                                <p className="text-left text-muted" >{dish.DISH_DESCR}</p>
                                                <p className="">{dish.INGREDIANTS}</p>
                                                <p className="text-left">Price: {dish.PRICE}</p>
                                            </div>
                                            {this.props.viewBy == "customer" ? (
                                                <div>
                                                    <IconButton onClick={() => this.remove(dish)}><RemoveIcon /></IconButton>
                                                    <span> </span>
                                                    <IconButton onClick={() => this.add(dish)}>< AddIcon /></IconButton>
                                                </div>
                                            ) : ''}


                                        </div>
                                    </div>
                                </div>

                            )
                        }) : (
                            ''
                        )

                        }
                    </div>
                    {(this.props.viewBy === "customer" && this.state.dishes.length <= 0) ?
                        (
                            <div className="jumbotron jumbotron-fluid mt-4">
                                <div className="container ">
                                    <h1 className="display-4 text-center">No Dishes</h1>
                                    <p className="lead text-center">Restaurant Has not uploaded anything in Menu</p>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        )
    }
}

export default connect(MenuList.mapStateToProps, MenuList.mapDispatchToProps)(MenuList)

import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class MenuList extends Component {
     dishes = [1, 2, 3, 4, 5, 6, 7, 8, 9]
     dishesList = this.dishes.map((dish) => {
    return <div className="card" key={dish}>
        <img className="card-img-top" src="https://image.shutterstock.com/image-photo/dosa-south-indian-breakfast-crepes-260nw-783911233.jpg" alt="Card image" />
        <div className="card bg-ligth">
            <div className="card-body text-center">
                <div className="card-text">
                    <h6>Dosa</h6>
                    <p className="text-left text-muted" >some random description</p>
                    <p className="text-left">Price: $10</p>
                    <Link to={`/restaurant/${this.props.restId}/dish/${dish}`} className="btn btn-primary stretched-link">Edit dish</Link>
                </div>
            </div>
        </div>
    </div>
})
    render() {
        return (
            <div>
                <h2 className="text-center">Menu</h2>
                <div className="text-center">
                <Link to={`/restaurant/${this.props.restId}/dish/new`} className="btn btn-primary text-center">Add New Dish</Link>
                </div>
                <br></br>
                <div className="card-columns">
                   {this.dishesList}
                </div>
            </div>
        )
    }
}

export default MenuList

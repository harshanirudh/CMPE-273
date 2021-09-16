import React, { Component } from 'react'
let dishes = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let dishesList = dishes.map((dish) => {
    return <div className="card">
        <img className="card-img-top" src="https://image.shutterstock.com/image-photo/dosa-south-indian-breakfast-crepes-260nw-783911233.jpg" alt="Card image" />
        <div className="card bg-ligth">
            <div className="card-body text-center">
                <div className="card-text">
                    <h6>Dosa</h6>
                    <p className="text-left text-muted" >some random description</p>
                    <p className="text-left">Price: $10</p>
                </div>
            </div>
        </div>
    </div>
})
export class MenuList extends Component {
    render() {
        return (
            <div>
                <h2 className="text-center">Menu</h2>
                <div className="card-columns">
                   {dishesList}

                </div>
            </div>
        )
    }
}

export default MenuList

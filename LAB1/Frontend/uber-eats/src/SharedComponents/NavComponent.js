import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import store from '../Redux/store'
import CheckoutDialog from '../CustomerComponent/CheckoutDialog';
import { customerLogout, restaurantLogout } from '../Redux/Login/Login-actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'


class NavComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDrawerOpened: false,
            Counter:store.getState().cart.cartCounter,
            openCheckout:false
        }
    }
    static mapStateToProps = state => {
        return { Login: state.Login }
    }
    static mapDispatchToProps = dispatch => {
        return bindActionCreators({ customerLogout, restaurantLogout }, dispatch)
    }
    toggleDrawerStatus = () => {
        this.setState({
            isDrawerOpened: true,
        })
    }
    closeDrawer = () => {
        this.setState({
            isDrawerOpened: false
        })
    }
    // static mapStateToProps=(state)=>{
    //    return { counter:state.cartCounter}
    // }
    customerHomeUrl=`/customer/landing/${this.props.cid}`
    customerProfileUrl=`/customer/profile/${this.props.cid}`
    customerFavouritesUrl=`/customer/${this.props.cid}/favourites`
    
    restaurantProfileUrl=`/restaurant/profile/${this.props.rid}`
    
    subscriber=store.subscribe(()=>{
        console.log(store.getState().cart.cartCounter)
        this.setState({Counter:store.getState().cart.cartCounter})
    })
    openCheckoutBox(){
        if(this.state.Counter){
            this.setState({openCheckout:true})
        }
    }
    handleClose=()=>{
        this.setState({openCheckout:false})
    }
    renderCheckoutDialog=()=><CheckoutDialog openCheckout={this.state.openCheckout} closeCheckout={this.handleClose}></CheckoutDialog>

    handleLogout=(type)=>{
        if(type=="cust"){
            this.props.customerLogout();
            this.props.history.push("/customer")
        }else if(type=="rest"){
            this.props.restaurantLogout();
            this.props.history.push("/restaurant")
        }
    }
    customerMenuList = (
        <div
            onClick={this.closeDrawer}
            onKeyDown={this.closeDrawer}>
            <Divider>
                <List>
                    <ListItem button key='Home' to={this.customerHomeUrl}component={Link}>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </List>
            </Divider>
            <Divider>
                <List>
                    <ListItem button key='Profile' to={this.customerProfileUrl}component={Link}>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItem>
                </List>
            </Divider>
            <Divider>
                <List>
                    <ListItem button key='Orders' to='/home' component={Link}>
                        <ListItemIcon><KitchenIcon /></ListItemIcon>
                        <ListItemText primary='Orders' />
                    </ListItem>
                </List>
            </Divider>
            <Divider>
                <List>
                    <ListItem button key='Favourites' to={this.customerFavouritesUrl} component={Link}>
                        <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
                        <ListItemText primary='Favourites' />
                    </ListItem>
                </List>
            </Divider>
        </div>

    )
    restaurantMenuList = (
        <div
            onClick={this.closeDrawer}
            onKeyDown={this.closeDrawer}>
            <Divider>
                <List>
                    <ListItem button key='Profile' to={this.restaurantProfileUrl} component={Link}>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItem>
                </List>
            </Divider>
            <Divider>
                <List>
                    <ListItem button key='Orders' to='/home' component={Link}>
                        <ListItemIcon><KitchenIcon /></ListItemIcon>
                        <ListItemText primary='Orders' />
                    </ListItem>
                </List>
            </Divider>

        </div>

    )
    unknownNavBar=<nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
    <ul className="navbar-nav">
        <li className="nav-item active">
            <Link className="nav-link" to='/'>Uber Eats</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/restaurant">Restaurant</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/customer">Customer</Link>
        </li>
    </ul>
    </nav>
    
    customerNavBar=()=>{
        return (<nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
    <ul className="navbar-nav">
        <li className="nav-item active">
            <IconButton onClick={this.toggleDrawerStatus}>
                <MenuIcon color="info"  ></MenuIcon>
            </IconButton>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to='#'>Uber Eats</Link>
        </li>
    </ul>
    <ul className="nav navbar-nav navbar-right ml-auto">
        <li >
            <IconButton onClick={()=>this.openCheckoutBox()}><ShoppingCartIcon color="error" /><span className="badge badge-pill badge-light">{this.state.Counter?this.state.Counter:''}</span></IconButton>
           {this.state.openCheckout?this.renderCheckoutDialog():''}
        </li>
        <li>
            <IconButton onClick={()=>this.handleLogout("cust")}><LogoutIcon color="info" /></IconButton>
        </li>
    </ul>
</nav>
        )
    }
restaurantNavBar=<nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
<ul className="navbar-nav">
    <li className="nav-item active">
        <IconButton onClick={this.toggleDrawerStatus}>
            <MenuIcon color="info"  ></MenuIcon>
        </IconButton>
    </li>
    <li className="nav-item active">
        <Link className="nav-link" to='#'>Uber Eats</Link>
    </li>
</ul>
<ul className="nav navbar-nav navbar-right ml-auto">
        <li>
            <IconButton onClick={()=>this.handleLogout("rest")} ><LogoutIcon color="info" /></IconButton>
        </li>
    </ul>
</nav>
    render() {
        const { isDrawerOpened } = this.state;
        // console.log(this.props)
        return (
            <div>
                    {this.props.view == "unknown" ? this.unknownNavBar: ''}
                    {this.props.view == "customer" ? this.customerNavBar() : ''}
                    {this.props.view == "restaurant" ? this.restaurantNavBar : ''}
                <div>
                    <Drawer
                        variant="temporary"
                        open={isDrawerOpened}
                        onClose={this.closeDrawer}
                    >
                        {this.props.view == 'customer' ? this.customerMenuList : ''}
                        {this.props.view == 'restaurant' ? this.restaurantMenuList : ''}
                    </Drawer>
                </div>
            </div>
        )
    }
}

const NavReduxComp=connect(NavComponent.mapStateToProps,NavComponent.mapDispatchToProps)(NavComponent)
export default withRouter(NavReduxComp)

// export default (NavComponent.mapStateToProps)(NavComponent)


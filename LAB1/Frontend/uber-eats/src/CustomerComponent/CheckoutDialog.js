import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Grid, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { incrementCounter, decrementCounter } from '../Redux/Cart/Cart-actions'

class CheckoutDialog extends React.Component {
    //   const [open, setOpen] = React.useState(false);
    constructor(props) {
        super(props)

        this.state = {
            open: this.props.openCheckout,
            items: JSON.parse(sessionStorage.getItem('cartItems')),
            counter: parseInt(sessionStorage.getItem('counter')),
            toggleChange: false
        }
    }
    static mapStateToProps = state => {
        return { cartCounter: state.cartCounter }
    }
    static mapDispatchToProps = dispatch => {
        return bindActionCreators({ incrementCounter, decrementCounter }, dispatch)
    }
    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
        this.props.closeCheckout()
    };
    handleCheckout = () => {
        return <Link to={'/customers/checkout'} items></Link>
    }
    handleAdd=(item,index)=>{
        item.quantity=item.quantity+1;
        let temp=JSON.parse(sessionStorage.getItem('cartItems'))
        let tempCounter=parseInt(sessionStorage.getItem('counter'))
        tempCounter+=1;
        temp[index]=item;
        sessionStorage.setItem('cartItems',JSON.stringify(temp))
        sessionStorage.setItem('counter',tempCounter)
        this.props.incrementCounter();
        this.setState(prevState=> ({toggleChange:!prevState.toggleChange}))
    }
    handleRemove=(item)=>{

    }

    getShoppingCartDetails = () => {
        // this.state.items = 
        
        let amount = 0;
        return (
            <div>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {this.state.items.map((i,index) => {
                        amount = i.PRICE * i.quantity + amount
                        return <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={i.DISH_NAME} src={i.IMAGE} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={i.DISH_NAME}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Quantity:   {i.quantity}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className="col-sm-6">
                            <ListItemText  >
                                Price:  ${i.PRICE *i.quantity}
                            </ListItemText>
                            </div>
                            <div className="col-sm-6">
                                <button className="btn btn-danger" onClick={()=>this.handleRemove(i,index)}>-</button>
                                <button className="btn btn-primary " onClick={()=>this.handleAdd(i,index)}>+</button>
                            </div>
                            </div>
                        </ListItem>
                    })}
                </List>
                <Typography style={{ display: 'flex', justifyContent: 'center' }}> Total Amount:  ${amount} </Typography>
            </div>
        )
    }
    render() {
        console.log('checkout')
        return (
            <div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth="true"

                >
                    <DialogTitle id="alert-dialog-title">
                        {"Shopping Cart"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography component={'span'}> Order Details</Typography>
                        </DialogContentText>
                        {this.getShoppingCartDetails()}
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={this.handleClose}>Close</Button>
                        <Button color="success" onClick={this.handleCheckout} autoFocus>
                            Proceed to Checkout
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default connect(CheckoutDialog.mapStateToProps, CheckoutDialog.mapDispatchToProps)(CheckoutDialog);

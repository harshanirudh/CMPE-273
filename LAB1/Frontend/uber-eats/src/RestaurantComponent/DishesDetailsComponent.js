import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios'
import {React,  Component} from 'react'
import { withRouter,Redirect } from 'react-router-dom'
import { baseUrl } from '../apiConfig'
import NavComponent from '../SharedComponents/NavComponent'
import DisheFormComponent from './DisheFormComponent'
import { withCookies } from 'react-cookie'
export class DishesDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.formvals={
            dname:'',
            ingre:'',
            dprice:'',
            ddesc:'',
            dcat:'',
            dtype:'',
            dimg:''
        }
        this.state = {
            formObj:this.formvals,
            update:false,
            add:false
        }
       
        
    }
    componentDidMount(){
        
        console.log("inside did mount")
        if(this.props.match.params.dishId!='new'){
            let url=baseUrl+'/restaurant/'+this.props.match.params.restId+'/dish/'+this.props.match.params.dishId
            axios.get(url).then((resp)=>{
               let {DISH_NAME,INGREDIENTS,IMAGE,PRICE,DISH_DESCR,CATEGORY,DISH_TYPE} =resp.data[0];
               this.formvals.dname=DISH_NAME;
               this.formvals.ingre=INGREDIENTS?INGREDIENTS:"";
               this.formvals.dimg=IMAGE?IMAGE:"";
               this.formvals.dprice=PRICE?PRICE:"";
               this.formvals.ddesc=DISH_DESCR?DISH_DESCR:"";
               this.formvals.dcat=CATEGORY?CATEGORY:"";
               this.formvals.dtype=DISH_TYPE?DISH_TYPE:"";
               this.setState({formObj:this.formvals})
            }).catch((err)=>{
                console.log(err)
            })
        
    }
    }
    handleNewDishData(values){
        console.log(values)
        let url=baseUrl+'/restaurant/'+this.props.match.params.restId+'/dish'
        console.log(url)
        axios.post(url,values).then((res)=>{
            console.log(res.data);
            this.setState({add:true})
        }).catch((err)=>{
            console.log(err)
        })
    }
    handleUpdateDishData(values){
        console.log(values)
        let url=baseUrl+'/restaurant/'+this.props.match.params.restId+'/dish/'+this.props.match.params.dishId;
        console.log(url)
        axios.put(url,values).then((res)=>{
            console.log(res.data);
           this.setState({update:true})
        }).catch((err)=>{
            console.log(err)
        })
    }
    handleClose=()=>{
        this.props.history.push(`/restaurant/landing/${this.props.match.params.restId}`)
    }
    render() {
        console.log(this.props.cookies.get('restCookie')?.authenticated)
        if(this.props.cookies.get('restCookie')?.authenticated===undefined||false){
            console.log(this.props.cookies.get('restCookie')?.authenticate)
            // this.props.history.push('/restaurant')
            return <Redirect to="/restaurant"></Redirect>
        }
        else{
        if(this.props.match.params.dishId==='new'){
            return (
                <div >
                    <Dialog
                    open={(this.state.add )}
                    // onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}>
                    <DialogTitle id="alert-dialog-title">{"Dish Added Succesful"}</DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()}>Close</Button>
                    </DialogActions>
                </Dialog>
                <NavComponent view="restaurant" rid={this.props.match.params.restId}></NavComponent>
                <div className="container">
                    <div>
                        <h2 className="text-center">ADD NEW DISH</h2>
                        <DisheFormComponent type="add" onFormSubmit={(e)=>this.handleNewDishData(e)} intialValues={this.state.formObj}></DisheFormComponent>
                    </div>
                </div>
                </div>
            )
        }
        return (
            
            <div >
                <Dialog
                    open={this.state.update}
                    // onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}>
                    <DialogTitle id="alert-dialog-title">{"Dish Update Succesful"}</DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()}>Close</Button>
                    </DialogActions>
                </Dialog>
            <NavComponent view="restaurant" rid={this.props.match.params.restId}></NavComponent>
            <div className="container">
            <div>
                <h2 className="text-center">UPDATE DISH ID {this.props.match.params.dishId}</h2>
                <DisheFormComponent type="edit" onFormSubmit={(e)=>this.handleUpdateDishData(e)} intialValues={this.state.formObj}></DisheFormComponent>
            </div>
        </div>
        </div>
        )
    }
}
}

export default withCookies(withRouter(DishesDetailsComponent))

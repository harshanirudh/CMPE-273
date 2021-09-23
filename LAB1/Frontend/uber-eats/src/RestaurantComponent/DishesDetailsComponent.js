import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { baseUrl } from '../apiConfig'
import DisheFormComponent from './DisheFormComponent'
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
            formObj:this.formvals
        }
       
        
    }
    componentDidMount(){
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
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        if(this.props.match.params.dishId==='new'){
            return (
                <div className="container">
                    <div>
                        <h2 className="text-center">ADD NEW DISH</h2>
                        <DisheFormComponent type="add" onFormSubmit={(e)=>this.handleNewDishData(e)} intialValues={this.state.formObj}></DisheFormComponent>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
            <div>
                <h2 className="text-center">UPDATE DISH ID {this.props.match.params.dishId}</h2>
                <DisheFormComponent type="edit" onFormSubmit={(e)=>this.handleUpdateDishData(e)} intialValues={this.state.formObj}></DisheFormComponent>
            </div>
        </div>
        )
    }
}

export default withRouter(DishesDetailsComponent)

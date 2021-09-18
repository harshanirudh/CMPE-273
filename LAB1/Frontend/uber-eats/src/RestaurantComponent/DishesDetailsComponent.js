import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
        this.formvals.dname="sample name"
        this.formvals.ingre="ingre"
        this.formvals.dprice="$10"
        this.formvals.dtype="vegan"
        this.formvals.dimg=""
        // this.setState({formObj:this.formvals})
        this.setState((state)=>{
            console.log(state)
            return {formObj:this.formvals}
        })
    }
    }
    handleFormData(values){
        console.log(values)
        //To-do API Calls to save
    }
    render() {
        if(this.props.match.params.dishId==='new'){
            return (
                <div className="container">
                    <div>
                        <h2 className="text-center">ADD NEW DISH</h2>
                        <DisheFormComponent type="add" onFormSubmit={this.handleFormData} intialValues={this.state.formObj}></DisheFormComponent>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
            <div>
                <h2 className="text-center">UPDATE DISH ID {this.props.match.params.dishId}</h2>
                <DisheFormComponent type="edit" onFormSubmit={this.handleFormData} intialValues={this.state.formObj}></DisheFormComponent>
            </div>
        </div>
        )
    }
}

export default withRouter(DishesDetailsComponent)

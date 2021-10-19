import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import NavComponent from '../SharedComponents/NavComponent'
import store from '../Redux/store'

function SignupStatus(props) {
    const [email, setemail] = useState("")
    if(props.type==="Success"){
        
       const subscriber=store.subscribe(()=>{
            console.log(store.getState().SignUpForm.SignUpForm)
            let {email}=store.getState().SignUpForm.SignUpForm
           setemail(email)
        })
       
    return (
        <div >
            <NavComponent view="unknown"></NavComponent>
        <div className="container">
            <br></br>
            <div className="jumbotron">
                <h1>Succesfully Registered</h1>
                {/* <p>Go Back to login page</p> */}
                
                <p>{email}</p>
                <Link to={props.view==="cust"?"/customer":"/restaurant"}>Go Back to login page</Link>
            </div>
        </div>
        </div>
    )
    }
    else{
        return (
            <div >
            <NavComponent view="unknown"></NavComponent>
            <div className="container">
                <br></br>
                <div className="jumbotron">
                    <h1>Registration Failed</h1>
                    <p>Email Already Present</p>
                    <Link to={props.view==="cust"?"/customer":"/restaurant"}>Go Back to login page</Link>
                </div>
            </div>
            </div>
        )
    }
}

export default SignupStatus

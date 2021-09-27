import React from 'react'
import NavComponent from '../SharedComponents/NavComponent'

function SignupStatus(props) {
    if(props.type==="Success"){
    return (
        <div >
            <NavComponent view="unknown"></NavComponent>
        <div className="container">
            <br></br>
            <div className="jumbotron">
                <h1>Succesfully Registered</h1>
                <p>Go Back to login page</p>
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
                </div>
            </div>
            </div>
        )
    }
}

export default SignupStatus

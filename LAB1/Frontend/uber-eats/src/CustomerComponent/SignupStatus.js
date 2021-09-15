import React from 'react'

function SignupStatus(props) {
    if(props.type==="Success"){
    return (
        <div className="container">
            <br></br>
            <div className="jumbotron">
                <h1>Succesfully Registered</h1>
                <p>Go Back to login page</p>
            </div>
        </div>
    )
    }
    else{
        return (
            <div className="container">
                <br></br>
                <div className="jumbotron">
                    <h1>Registration Failed</h1>
                    <p>Email Already Present</p>
                </div>
            </div>
        )
    }
}

export default SignupStatus

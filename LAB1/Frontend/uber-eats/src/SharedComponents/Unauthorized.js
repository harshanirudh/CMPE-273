import { Typography } from '@mui/material'
import React, { Component } from 'react'

export class Unauthorized extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <Typography variant="h3" display="flex" justifyContent="center">Unauthorized</Typography>
            </div>
        )
    }
}

export default Unauthorized

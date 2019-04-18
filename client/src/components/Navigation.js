import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Navigation = (props) =>{
    return(
        <div className='navigation-wrapper'>
        <h1>TripSplit</h1>
        <div>
        <Link to='/trip'><Button color='primary'>Trips</Button></Link>
        <Link to='/users'><Button color='primary'>Users</Button></Link>
        <Link to ='/'>  <Button color='primary' onClick={props.handleLogout}> Logout </Button> </Link> 
        </div>
        </div>
    )
}

export default Navigation
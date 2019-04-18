import React from 'react'
import ExpenseForm from './ExpenseForm'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

const Trip = props => {
    return(
        <div className='trips-page-wrapper'>
        <div className='trips-wrapper'>
       <Link to={`/trips/${props.id}`}> <h2>{props.description}</h2>
       <p>{props.id}</p>
       </Link>
        <Button color= 'primary' onClick={()=> props.deleteTrip(props.id)}>Delete Trip</Button>
        </div>
        </div>
    )
}


export default Trip
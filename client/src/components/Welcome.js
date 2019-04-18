import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import firebase from "../config/fire";
import Trip from './Trip'


class Welcome extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
                user.getIdToken(false).then(idToken=>{
                    axios
                  .post('https://trip-split-lambda.herokuapp.com/api/users/register', {
                        token: idToken
                  })
                })
            
        })
    }

    
        



    render(){
        return(
            <div className='trip-wrapper'>
            <h2>welome back user!</h2>
            <Link to='/'>
             <Button color='primary'>Back to Login</Button>
             </Link>
            </div>
        )
    }
}

export default Welcome
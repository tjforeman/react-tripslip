import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import firebase from "../config/fire";
import Expense from './Expense'
import Users from './Users'

class UserList extends React.Component{
    constructor(){
        super();
        this.state={
            users:[]
        }
    }
    componentDidMount(){
      const token = localStorage.getItem("idToken") 
        console.log(token)
        axios
        .get('https://trip-split-lambda.herokuapp.com/api/users', {headers:
        {token:token}
  }) 
        .then(res => {
            console.log(res.data)
          this.setState({users:res.data.users})
        })
        .catch(err=>{
          console.log(err)
        })
    }
    render(){
        return(
            <div className='trip-wrapper'>
            <h2>list of users!</h2>
            <p>are any joining your trip?</p>
            {this.state.users.map(data => {
            return (
                <Users
                email={data.email}
                id={data.id}
              />
            );
          })}
            <Link to='/trip-form'>
             <Button color='primary'>Add a New Trip</Button>
             </Link>
            </div>
        )
    }
}

export default UserList
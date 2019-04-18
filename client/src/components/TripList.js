import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import firebase from "../config/fire";
import Trip from './Trip'

class TripList extends React.Component{
    constructor(){
        super();
        this.state={
          trips:[]
        }
    }
    componentDidMount(){
      const token = localStorage.getItem("idToken") 
        console.log(token)
      axios
      .get('https://trip-split-lambda.herokuapp.com/api/trips', {headers:
      {token:token}
}) 
      .then(res => {
          console.log(res.data)
        this.setState({trips:res.data})
        console.log(this.state.trips)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  refeshState=() =>{
    const token = localStorage.getItem("idToken") 
        console.log(token)
  
    axios
          .get(`https://trip-split-lambda.herokuapp.com/api/trips`, {headers:
          {token:token}
    }) 
          .then(res =>{
            this.setState({trips:res.data})
          })
    }

    deleteTrip= id=>{
      const token = localStorage.getItem("idToken") 
        console.log(token)
        axios
        .delete(`https://trip-split-lambda.herokuapp.com/api/trips/${id}`, {headers:
        {token:token}
  }) 
        .then(res =>{
          console.log(res)
          this.refeshState()
        })
        .catch(err=>{
          console.log(err)
        })
      }   



    render(){
        return(
            <div className='trip-wrapper'>
            <h2>Your Trips</h2>
            <div className='trip-container'>
            {this.state.trips.map(data => {
            return (
                <Trip
                description={data.description}
                key={data.id}
                id={data.id}
                deleteTrip={this.deleteTrip}

              />
            );
          })}
          </div>
            <p>would you like to add a new trip?</p>
            <Link to='/trip-form'>
             <Button color='primary'>Add a New Trip</Button>
             </Link>
            </div>
        )
    }
}

export default TripList
import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

class AddTripForm extends React.Component{
    
         changeHandler = e =>{
        e.preventDefault()
        this.setState({
        [e.target.name]: e.target.value
        })
    }
    newTrip= trip=>{
      const token = localStorage.getItem("idToken") 
      console.log(token)
        axios
        .post('https://trip-split-lambda.herokuapp.com/api/trips/',trip, {headers:
        {token:token}
  }) 
        .then(res =>{
            console.log(res)
          this.setState({trips:res.data})
        })
        .catch(err=>{
          console.log(err)
        })
      }

      addTrip = event => {
        event.preventDefault();
        this.newTrip(this.state)
        alert('your new trip has been added! would you like to add another?')
    
        this.setState({
            description:'',
        });
      }
    render(){
    return(
        <div>
            <h2>add your new trip!</h2>
            <Form>
                <Label>decribe your trip</Label>
                <Input type='text' name='description' placeholder='description' value={this.props.description}onChange={this.changeHandler}></Input>
                <Button color='primary' onClick={this.addTrip}>Add Trip</Button>
                <Link to='/trip'><Button color='primary'>Back to My trips</Button></Link>

            </Form>
        </div>
    )
}
}
export default AddTripForm
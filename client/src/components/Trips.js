import React, { Component } from 'react';
import axios from 'axios';
import Expense from './Expense'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip:[],
      expense:[]
    };
  } 

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id)
    this.fetchExpense(id);
  }


  fetchExpense = id => {
    const token = localStorage.getItem("idToken") 
        console.log(token)
    axios
      .get(`https://trip-split-lambda.herokuapp.com/api/expenses/byTrip/${id}`,{headers:
      {token:token}
}) 
      .then(res => {
        console.log(res)
        this.setState(() => ({ expense: res.data }));;
      })
      .catch(error => {
        console.log(error);
      });
  };
  deleteExpense= id=>{
    axios
    .delete(`https://trip-split-lambda.herokuapp.com/api/expenses/${id}`)
    .then(res =>{
      console.log(res)
      this.refreshState()
    })
    .catch(err=>{
      console.log(err)
    })
  }   

  
  render() {
    return(
      <div>
        {this.state.expense.map(data => {
            return (
                <Expense
                description={data.description}
                id={data.id}
                location={data.location}
                trip_id={data.trip_id}
                key={data.id}
                who_paid={data.who_paid}
                total_amount={data.total_amount}
                deleteExpense={this.deleteExpense}
              />
            );
          })}
      <Link to='/expense-form'>
             <Button color='primary'>Add a New expense</Button>
             </Link>
      </div>
    )
  }
}
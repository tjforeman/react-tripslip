import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Expense from './Expense'

class ExpenseList extends React.Component{
    constructor(){
        super();
        this.state={
            expenses:[]
        }
    }
    componentDidMount(){
      const token = localStorage.getItem("idToken") 
        console.log(token)
        axios
        .get('https://trip-split-lambda.herokuapp.com/api/expenses', {headers:
        {token:token}
  }) 
        .then(res => {
            console.log(res)
          this.setState({expenses:res.data})
        })
        .catch(err=>{
          console.log(err)
        })
    }
    refeshState=() =>{
      const token = localStorage.getItem("idToken") 
        console.log(token)
      axios
            .get(`https://trip-split-lambda.herokuapp.com/api/expenses`, {headers:
            {token:token}
      })  
            .then(res =>{
              this.setState({expenses:res.data})
            })
      }

    deleteExpense= id=>{
      const token = localStorage.getItem("idToken") 
        console.log(token)
        axios
        .delete(`https://trip-split-lambda.herokuapp.com/api/expenses/${id}`, {headers:
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
            <h2>Manage your Expenses!</h2>
            {this.state.expenses.map(data => {
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

export default ExpenseList

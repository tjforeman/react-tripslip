import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      description: "",
      location: "",
      total_amount: undefined,
      who_paid: undefined,
      trip_id: undefined
    };
  }

    
         changeHandler = e =>{
        e.preventDefault()
        this.setState({
        [e.target.name]: e.target.value
        })
    }
    newExpense= expense=>{
        const token = localStorage.getItem("idToken") 
        console.log(token)
        axios
        .post('https://trip-split-lambda.herokuapp.com/api/expenses/add', expense, {headers:
                  {token:token}
            }) 
        .then(res =>{
            console.log(res)
          this.setState({expenses:res.data})
        })
        .catch(err=>{
          console.log(err)
        })
      }

//     //https://trip-split-lambda.herokuapp.com/api/expenses/add
//     axios
//       .post(
//         "https://trip-split-lambda.herokuapp.com/api/expenses/add",
//         expense,
//         { headers: { token: token } }
//       )
//       .then(res => {
//         console.log(res);
//         this.setState({ expenses: res.data });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

  addExpense = event => {
    event.preventDefault();
    this.newExpense(this.state);
    alert("your expense has been added! would you like to add another?");

    this.setState({
      description: "",
      location: "",
      total_amount: undefined,
      who_paid: undefined,
      trip_id: undefined
    });
  };

  render() {
    return (
      <div>
        <h2>let's settle your expenses!</h2>
        <Form>
          <Label>Name your expense</Label>
          <Input
            type="text"
            placeholder="description"
            name="description"
            onChange={this.changeHandler}
            value={this.state.description}
          />
          <Label> where is your expense? </Label>
          <Input
            type="text"
            placeholder="location"
            onChange={this.changeHandler}
            name="location"
            value={this.state.location}
          />
          <Label>Total amount of expense </Label>
          <Input
            type="number"
            placeholder="total"
            name="total_amount"
            onChange={this.changeHandler}
            value={this.state.total_amount}
          />
          <Label> who paid? </Label>
          <Input
            type="number"
            placeholder="id of friend who paid"
            name="who_paid"
            value={this.state.who_paid}
            onChange={this.changeHandler}
          />
          <Label>what's the trip id? </Label>
          <Input
            type="number"
            placeholder="trip id"
            name="trip_id"
            value={this.state.trip_id}
            onChange={this.changeHandler}
          />
          <Button color="primary" onClick={this.addExpense}>
            Add Event
          </Button>
          <Link to="/trip">
            <Button color="primary">Back to My trips</Button>
          </Link>
        </Form>
      </div>
    );
  }
}
export default ExpenseForm;

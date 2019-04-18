import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Expense = props => {
  
    return (
      <div className="expensive">
        <h2>{props.description}</h2>
        <h4>{props.location} </h4>
        <p>$ {props.total_amount} </p>
        <Button color='primary' onClick={()=> props.deleteExpense(props.id)}>Delete expense</Button>
      </div>
    );
  };
  
  
  
  export default Expense;
import React, { Component } from 'react';
import './App.css';
import SignUp from './components/SignUp'
import {Route} from 'react-router-dom'
import TripList from './components/TripList'
import AddTripForm from './components/AddTripForm'
import Trip from './components/Trip'
import ExpenseForm from './components/ExpenseForm'
import UsersList from './components/UsersList'
import Navigation from './components/Navigation'
import Welcome from './components/Welcome'
import Trips from './components/Trips' 
import firebase from './config/fire'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      trips:[],
      users:[]
    };
  }
  handleLogout= () =>{
    firebase
    .auth().signOut()
    .then(res =>{
      console.log(res);
      localStorage.removeItem('idToken');
    }
    )}

  render() {
    return (
      <div className="App">
      <Route path='/' render={props => (<Navigation {...props} handleLogout={this.handleLogout}/>)} />
      <Route path='/welcome' component={Welcome} />
      <Route exact path='/' component={SignUp} />
      <Route exact path='/trip'component={TripList} />
      <Route path='/trip-form' component={AddTripForm}/>
      <Route path="/trips" render={props => (  <Trip {...props}/> )} />
      <Route path='/trips/:id' component={Trips}/>
      <Route path="/expense-form" component={ExpenseForm} /> 
      <Route path='/users' component={UsersList} />
      
      </div>
    );
  }
}

export default App
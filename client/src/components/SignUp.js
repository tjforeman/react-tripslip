import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import firebase from "../config/fire";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Navigation from './Navigation'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/SignUp.css'

const email = new firebase.auth.EmailAuthProvider();
const google = new firebase.auth.GoogleAuthProvider();

class SignUp extends React.Component{
    state = {
        showLogin: true,
        newUser: false,
        newUsers: {
          email: "",
          password: "",
          errormessage:""
        },
        userInfo: {
          uid: null,
          token: null,
        },
      };
      componentDidMount(){
        console.log(firebase)
      }

      

      signUpWithEmail = event => {
        event.preventDefault()
        
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.newUser.email, this.state.newUser.password)
        .then(res => {
          
                console.log(res.user._lat)
                axios
                .post('https://trip-split-lambda.herokuapp.com/api/users/register', {
                    headers: {
                      token: res.user._lat
                    }
                })
        
          })
          .catch(err => {
            console.log(err);
          });
      };

      signUpWithGoogle = e =>{
        e.preventDefault()
        firebase
          .auth()
          .signInWithPopup(google)
          .then(res => {
            console.log(res)
            res.user.getIdToken(false).then(idToken=>{
              axios
            .post('https://trip-split-lambda.herokuapp.com/api/users/login', {
                  token: idToken
            })
            .then(res=> {
              localStorage.setItem('idToken',idToken)
            })
            .catch(err =>{
              console.log(err)
            })
            })
            if (res.additionalUserInfo.isNewUsers) {
              console.log(res);
              this.setState({
                ...this.state,
                showLogin: false,
                newUser: true,
                userInfo: {
                  uid: res.user.uid,
                  token: res.credential.idToken
                },
              });
            } else {
              this.saveAndRoute();
            }
          })
          .catch(err => {
            const errorMessage = err.message;
            console.error(errorMessage);
          });
 
          }
            handleChanges = e => {
              this.setState({
                ...this.state,
                newUser: {
                  ...this.state.newUser,
                  [e.target.name]: e.target.value,
                },
              });
            };
          
            createAccount = e => {
              e.preventDefault();
              const data = {
                email: this.state.newUser.email,
                // account_type: this.state.newUser.accountType,
                uid: this.state.userInfo.uid,
              };
              axios
                .post('https://trip-split-lambda.herokuapp.com/api/users/register', data)
                .then(res => {
                    this.saveAndRoute(this.state.userInfo);
                })
                .catch(err => {
                  console.log(err);
                });
            };
          
            saveAndRoute = () => {
              this.props.history.push("/welcome");
            };  

          

    render(){
        return(
            <div className='signup-container'>
            <h2>Welcome to TripSplit!</h2>
            <p>Sign in or create an account below.</p>
            <Button onClick={this.signUpWithGoogle} type='submit' color='primary'>Sign up or log in with Google</Button>
            </div>
        )
    }

}
      


export default SignUp
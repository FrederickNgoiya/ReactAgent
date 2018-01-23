import axios from "axios";
import history from "../utils/historyUtils";
import {AUTH_ERROR, AUTH_USER, UNAUTH_USER, FETCH_MESSAGE} from "./types";
import fetch from 'isomorphic-fetch';  
import { polyfill } from 'es6-promise';
import * as Cookies from 'js-cookie';

const ROOT_URL = "http://zolla3.yghqkmj5k2.eu-west-2.elasticbeanstalk.com";


function authUser() {
    return { type: AUTH_USER };
}

function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
 

export function signupUser(email, password, confirm_password, first_name, last_name, phone, dob, address, id_proof, is_agent) {
    return function(dispatch) {
        const signupUrl = `${ROOT_URL}/auth/register/`;

        fetch(signupUrl,{
            method: 'post',
             mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken'),
                'X-Requested-With': 'XMLHttpRequest'
              },
            email,
            password,
            confirm_password,
            first_name,
             last_name,
              phone, 
              dob, 
              address, 
              id_proof,
              is_agent
        })   
        .then((response) => {
            // If request is good...
            // Update state to indicate user is authenticated
            console.log(response);
            dispatch(authUser());

            // Save the JWT token
            localStorage.setItem("token", response);

            // redirect to the route '/feature'
            history.push("/feature");
        })
            .catch(error => {
                // If request is bad...
                // Show an error to the user
                console.log('request failed', error);
                dispatch(authError(error.response.data.error));
            });
    }
}

export function signinUser({ username, password }) {
    return function(dispatch) {
        console.log(username, password)
        const signinUrl = `${ROOT_URL}/auth/login/`;
        console.log(signinUrl)
        axios.post(signinUrl,{
            username,
            password
        }

        ).then(response =>{


            console.log(response)
            if(response.data.error)
            {
                console.log("NO USER");
                dispatch(authError("Bad Login Info"));
            }
            else
            {
                console.log("FOUND A USER");
                 //  If request is good...
                //Update state to indicate user is authenticated
               dispatch(authUser());

              //  Save the JWT token
               localStorage.setItem("token", response.data.token);
  
                history.push("/feature");
            }
             
                

            
        }).catch(error =>{
            console.log(error)
            dispatch(authError("Bad Login Info"));
        })
        
        
       // Submit email/password to the server
    //    const signinUrl = `${ROOT_URL}/auth/login/`;
    //    fetch(signinUrl, {
    //        method: 'post',
    //        //mode: 'no-cors',
    //         // headers: {
    //         //    "Content-Type": "application/json",
    //         //     "X-CSRFToken": Cookies.get('csrftoken'),
    //         //     'X-Requested-With': 'XMLHttpRequest'
    //         //  },
    //        //body: {
    //         username:username,
    //         password: password
    //        // }
    //    }) 
    //     .then((response) => {
    //               console.log(response)
    //           //  If request is good...
    //             //Update state to indicate user is authenticated
    //            dispatch(authUser());

    //           //  Save the JWT token
    //            //localStorage.setItem("token", response.data.token);

    //          //   redirect to the route '/feature'
    //             history.push("/feature");
    //        })
    //         .catch((error) => {
    //           //  If request is bad...
    //             //Show an error to the user
    //             console.log(error)
    //            dispatch(authError("Bad Login Info"));
    //         });
    }
}

export function signoutUser() {
    localStorage.removeItem("token");
    return {
        type: UNAUTH_USER
    };
}

export function fetchMessage() {
    return function(dispatch) {
        const balance = `${ROOT_URL}/user/balance/`;
        axios.get(balance, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}

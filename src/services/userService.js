import axios from 'axios';
import { getHeader, isResponseSuccessful } from '../utils/helpers';
import { setToken } from './tokenService';

export function axiosLogin(email, password, callback) {
  axios.post('/auth/login', {
      email,
      password
    })
    .then(res => {
      if(isResponseSuccessful(res.status)){
        console.log(res.data.payload);
        const token = res.data.payload;
        setToken(token);
        callback(true);
      }  
    })
    .catch(err => {
      console.log(err.response);
    });
}

export function axiosSignup (firstName, lastName, email, password, callback){
  axios.post('/auth/signup', {
      firstName,
      lastName,
      email,
      password
    })
    .then(res => {
      if(isResponseSuccessful(res.status)){
        console.log(res.data.payload);
        const user = res.data.payload;
        callback(user);
      }  
    })
    .catch(err => {
      console.log(err.response);
    });
}

export function axiosGetUser(authToken, callback){
  const options = getHeader(authToken);

  axios.get('/user/current', options)
    .then(res => {
      if(isResponseSuccessful(res.status)){
        console.log(res.data.payload);
        const user = res.data.payload;
        callback(user);
      } 
    })
    .catch(err => {
      console.log(err.response);
    });
}
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
        callback(true, null, null);
      }  
    })
    .catch(err => {
      console.log(err.response);
      if(err.response.status === 401){
        if(err.response.data.message === 'unauthorized - account does not exist'){
          callback(null, true, null)
        }else if(err.response.data.message === 'unauthorized - passwords do not match'){
          callback(null, null, true)
        }
      }
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
        callback(true, null);
      }  
    })
    .catch(err => {
      console.log(err.response);
      if(err.response.status === 409){
        callback(null, true);
      } 
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
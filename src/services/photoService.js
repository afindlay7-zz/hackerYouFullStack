import axios from "axios";
import { getHeader, isResponseSuccessful } from '../utils/helpers';

export function axiosAddPhoto(newPhoto, authToken, callback){
    const options = getHeader(authToken);
    axios.post('/photo/photos', {
            name: newPhoto.name,
            date: newPhoto.date,
            description: newPhoto.description,
            url: newPhoto.url,
            file: newPhoto.file
        }, options)
        .then(res => {
            if(isResponseSuccessful(res.status)){
                console.log(res.data.payload);
                callback(res.data.payload);
            }  
        })
        .catch(err => {
            console.log(err.response);
        });
}

export function axiosGetAllPhotos(authToken, callback){
    const options = getHeader(authToken);
    axios.get('/photo/photos', options)
      .then(res => {
        if(isResponseSuccessful(res.status)){
            console.log(res.data.payload);
            callback(res.data.payload);
        }  
      })
      .catch(err => {
        console.log(err.response);
      });
}

export function axiosGetPhotoById(id, authToken, callback){
    const options = getHeader(authToken);
    axios.get('/photo/photos/' + id, options)
        .then(res => {
            if(isResponseSuccessful(res.status)){
                console.log(res.data.payload[0]);
                callback(res.data.payload[0]);
            } 
        })
        .catch(err => {
            console.log(err.response);
        });
}

export function axiosUpdatePhotoById(updatedPhoto, id, authToken){
    const options = getHeader(authToken);

    axios.put('/photo/photos/' + id, {
            name: updatedPhoto.name,
            date: updatedPhoto.date,
            description: updatedPhoto.description,
            url: updatedPhoto.url, 
        }, options)
        .then(res => {
            console.log(res.data.payload);
        })
        .catch(err => {
            console.log(err.response);
        });
}

export function axiosDeletePhotoById(id, authToken){
    const options = getHeader(authToken);
    axios.delete('/photo/photos/' + id, options)
        .then(res => {
            if(isResponseSuccessful(res.status)){
                console.log(res.data.payload);
            } 
        })
        .catch(err => {
            console.log(err.response);
        });
}


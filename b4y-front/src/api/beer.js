import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem('b4y-token')

//on récupère les infos de toutes les bières
export function displayBeers(){
    return axios.get(`${config.api_url}/api/v1/beer/all`)
        .then((response)=> {
            return response.data
        })
        .catch((err)=>{
            return err
        })
}


//on récupère les infos d'une bière
export function takeOneBeer(id){
    return axios.get(`${config.api_url}/api/v1/beer/one/${id}`)
        .then((response)=> {
            return response.data
        })
        .catch((err)=>{
            return err
        })
}

//update d'une bière
export function updateOneBeer(datas, id){
    return axios.put(`${config.api_url}/api/v1/beer/update/${id}`, datas, {headers: {'x-access-token': token}})
    .then((response)=> {
        return response.data
    })
    .catch((err)=>{
        return err
    })
}


//on supprime une bière
export function deleteOneBeer(id){
    return axios.delete(`${config.api_url}/api/v1/beer/delete/${id}`, {headers: {'x-access-token': token}})
    .then((response)=> {
        return response.data
    })
    .catch((err)=>{
        return err
    })
}


//on ajoute une bière
export function addOneBeer(datas){
   return axios.post(config.api_url+"/api/v1/beer/save", datas,{headers: {'x-access-token': token}})
    .then((res)=>{
        return res.data.status
    })
    .catch((err)=>{
        return err
    })
}



import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem('b4y-token')

//enregistrement d'un utilisateur
export function addOneUser(datas){
    return axios.post(`${config.api_url}/api/v1/user/save`, datas)
        .then((response)=>{
            return response.data
        })
        .catch((err)=>{
            return err
        })
}

//connexion utilisateur
export function loginUser(datas){
    return axios.post(`${config.api_url}/api/v1/user/login`, datas)
        .then((response)=>{
            return response.data
        })
        .catch((err)=>{
            return err
        })
}

//modification des infos utilisateur
export function updateProfil(datas, id){
    return axios.put(`${config.api_url}/api/v1/user/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function checkMyToken(){
    return axios.get(`${config.api_url}/api/v1/user/checkToken`, {headers: {"x-access-token": token}})
        .then((response)=>{
            return response.data
        })
        .catch((err)=>{
            return err
        })
}


import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem('b4y-token')


export function saveOneOrder(datas){
    return axios.post(`${config.api_url}/api/v1/order/save`, datas, {headers: {'x-access-token': token}})
        .then((response)=> {
            return response.data
        })
        .catch((err)=>{
            return err
        })
}

export function checkPayment(datas){
    return axios.post(`${config.api_url}/api/v1/order/payment`, datas, {headers: {'x-access-token': token}})
        .then((response)=> {
            return response.data
        })
        .catch((err)=>{
            return err
        })
}

export function updateOrder(datas){
    return axios.post(`${config.api_url}/api/v1/order/validate`, datas, {headers: {'x-access-token': token}})
        .then((response)=> {
            return response.data
        })
        .catch((err)=>{
            return err
        })
}
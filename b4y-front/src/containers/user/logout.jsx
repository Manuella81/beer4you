import React, {useState, useEffect} from 'react'

import {useDispatch} from 'react-redux' 
import {logoutUser} from '../../slices/userSlice'
import {Navigate} from 'react-router-dom' 

const Logout = (props)=>{
    
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    
    useEffect(()=>{
        window.localStorage.removeItem('b4y-token')
        dispatch(logoutUser())
        setRedirect(true)
    },[])
    
    if(redirect){
        return <Navigate to="/login" />
    }
    return (
        <div>
        </div>
    )
    
}
export default Logout
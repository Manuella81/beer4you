import React, {useState, useEffect} from 'react'

import {loginUser} from '../../api/user'
import axios from 'axios'
import {Navigate} from 'react-router-dom'


const Login = (props) =>{
    
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    
    const login = () =>{
        let datas = {
            email: email,
            password: password
        }
        
        
        loginUser(datas)
        .then((res)=>{
            if(res.status === 200){
                //console.log(res)
                window.localStorage.setItem('b4y-token', res.token)
                setRedirect(true)
            }
        })
        .catch(err=>console.log(err))
    }
    
    if(redirect){
        return <Navigate to="/"/>
    }
    
    return (
        <section>
            <h2>Se connecter</h2>
            <form className = "b-form" onSubmit={(e)=>{
                e.preventDefault()
                login()   
            }}>
                
                <div>    
                    <input type="email" 
                           name="email" 
                           id="email" 
                           placeholder="Email"
                           onChange={(e)=>{
                        setMail(e.currentTarget.value)
                           }}
                        />
                </div>
                
                <div>
                    <input type="password" 
                           name="password" 
                           id="password" 
                           placeholder="Mot de passe"
                           onChange={(e)=>{
                        setPassword(e.currentTarget.value)
                           }}
                    />
                </div>
                
                <input type="submit" value="Envoyer"/>
            </form>
        </section>
    )
}

export default Login
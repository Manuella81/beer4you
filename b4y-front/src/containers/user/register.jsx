import React, {useState, useEffect} from 'react'

import {addOneUser} from '../../api/user'
import axios from 'axios'
import {Navigate} from 'react-router-dom'


const Register = (props) =>{
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState(false)
    
    //constante pour enregistrer un utilisateur
    const saveUser = () =>{
        let datas = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            address: address,
            zip: zip,
            city: city,
            phone: phone
        }
        
        addOneUser(datas)
        .then((res)=>{
            if(res.status === 200){
                setRedirect(true)
            }else{
                console.log("Echec envoi!")
            }
        })
        .catch(err=>console.log(err))
    }
    
    if(redirect){
        return <Navigate to="/"/>
    }
    
    return (
        <section>
            <h2>S'enregistrer</h2>
            <form className = "b-form" 
                onSubmit={(e)=>{
                e.preventDefault()
                saveUser()   
            }}>
                <div>
                    <input type="text" 
                           name="firstname" 
                           id="firstname" 
                           placeholder="Prénom"
                           onChange={(e)=>{
                        setFirstname(e.currentTarget.value)
                            }}
                    />
                </div>
                
                <div>    
                    <input type="text" 
                           name="lastname" 
                           id="lastname"
                           placeholder="Nom"
                           onChange={(e)=>{
                        setLastname(e.currentTarget.value)
                            }}
                    />
                </div>
                
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
                
                <div>
                    <input type="text" 
                           name="address" 
                           id="address" 
                           placeholder="Adresse"
                           onChange={(e)=>{
                        setAddress(e.currentTarget.value)
                           }}
                    />
                </div>
                
                <div>
                    <input type="number" 
                           name="zip" 
                           id="zip" 
                           placeholder="Code postal"
                           onChange={(e)=>{
                        setZip(e.currentTarget.value)
                           }}
                    />
                </div>
                
                <div>
                    <input type="text" 
                           name="city" 
                           id="city" 
                           placeholder="Ville"
                           onChange={(e)=>{
                        setCity(e.currentTarget.value)
                           }}
                    />
                </div>
                
                <div>
                    <input type="tel" 
                           name="phone" 
                           id="phone" 
                           placeholder="Téléphone"
                           onChange={(e)=>{
                        setPhone(e.currentTarget.value)
                           }}
                    />
                </div>
                
                <input type="submit" value="Envoyer"/>
            </form>
            
        </section>
    )
}

export default Register
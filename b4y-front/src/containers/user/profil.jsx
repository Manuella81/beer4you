import React, {useState, useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux' 
import {selectUser, connectUser} from '../../slices/userSlice'

import {updateProfil, checkMyToken} from '../../api/user'


const Profil = (props)=>{
    
    const user = useSelector(selectUser)
    
    const dispatch = useDispatch()
    
    const [msg, setMsg] = useState(null)
    const [firstName, setFirstName] = useState(user.infos.firstName)
    const [lastName, setLastName] = useState(user.infos.lastName)
    const [address, setAddress] = useState(user.infos.address)
    const [zip, setZip] = useState(user.infos.zip)
    const [city, setCity] = useState(user.infos.city)
    const [phone, setPhone] = useState(user.infos.phone)
    
    
    const onSubmitForm = () =>{
        let datas = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            zip: zip,
            city: city,
            phone: phone
        }
        
        console.log(datas)
        
        updateProfil(datas, user.infos.id)
        .then((res)=>{
            console.log(res)
            if(res.status !== 200){
                setMsg("Erreur lors de la modification")
            }else{
                checkMyToken()
                .then((res)=>{
                    //si le status de la réponse n'est pas 200
                    if(res.status !== 200){
                        setMsg("Erreur lors de la modification")
                    //sinon
                    }else{
                        const token = window.localStorage.getItem('b4y-token')
                        //on stock la réponse de la requète axios dans une variable user (retourne un objet)
                        let user = res.user[0]
                        //on peut rajouter une propriété token à user avec le token dedans
                        user.token = token
                        //appel l'action de connexion de l'utilisateur (store)
                        dispatch(connectUser(user))
                    }
                })
                .catch(err=>console.log(err))
                setMsg('Profil modifié avec succés!')
            }
        })
        .catch(err=>console.log(err))
    }
    
    return (
        <section>
            <h1>Mon profil</h1>
            {msg !== null && <p>{msg}</p>}
            <form
                className="b-form"
                onSubmit={(e)=>{
                 e.preventDefault()
                 onSubmitForm()
                }}
            >
                <input type="text"
                    defaultValue={user.infos.firstName}
                    onChange={(e)=>{
                        setFirstName(e.currentTarget.value)
                    }}
                />
                <input type="text"
                    defaultValue={user.infos.lastName}
                    onChange={(e)=>{
                        setLastName(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.address}
                    onChange={(e)=>{
                        setAddress(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.zip}
                    onChange={(e)=>{
                        setZip(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.city}
                    onChange={(e)=>{
                        setCity(e.currentTarget.value)
                    }}
                />
                
                <input type="text"
                    defaultValue={user.infos.phone}
                    onChange={(e)=>{
                        setPhone(e.currentTarget.value)
                    }}
                />
                
                <input type="submit" name="Enregistrer" />
            </form>
        </section>
    )
}

export default Profil
import React, {useState, useEffect} from 'react'
//import d'une action qui chargera les bière venant dun back

import {useSelector, useDispatch} from 'react-redux' 
import {selectUser, connectUser} from '../slices/userSlice'


import {Navigate, useParams} from 'react-router-dom'
import {updateProfil, checkMyToken} from '../api/user'
import {selectBeers, loadBeers} from '../slices/beerSlice'
import {displayBeers} from '../api/beer'

//HOC de controle des datas et de la sécurité
const RequireDataAuth = (props) =>{
    //on récup les params de la route
    const params = useParams()
    //on récupère la state user dans le store en mode lecture
    const user = useSelector(selectUser)
    //on récupère la state beers dans le store en mode lecture
    const allBeers = useSelector(selectBeers)
    //on prépare la fonctionnalité pour dispatcher notre action dans le store
    const dispatch = useDispatch()
    //on récupère le composant à afficher qui a été passé en tant que props via App.js
    const Child = props.child
    
    //gestion de la redirection
    const [redirect, setRedirect] = useState(false)
    
    //au chargement de chaque composant
    useEffect(()=>{
        //si les bières ne sont pas chargé dans redux, on les charge (action du store)
        if(allBeers.beers.length === 0){
            displayBeers()
            .then((res)=>{
                if(res.status === 200){
                    console.log(res)
                    dispatch(loadBeers(res.result))
                }
            })
            .catch(err=>console.log(err))
        }
        
        //on va tester si on est connecté via les infos de redux
        //si l'utilisateur n'est pas logged (store)
        if(user.isLogged === false){
            //on récup le token dans le localStore
            const token = window.localStorage.getItem('b4y-token')
            //si le storagee répond null (pas trouvé) et que la props auth est true (route protégée)
            if(token === null && props.auth){
                //on demande une redirection
                setRedirect(true)
            }else{ 
            //sinon
                //on appel notre requète axios qui va vérifier le token dans le back checkToken
                checkMyToken()
                .then((response)=>{
                    //si le status de la réponse n'est pas 200
                    if(response.status !== 200){
                        if(props.auth === true){
                            //on demande la redirection
                            setRedirect(true)
                        }
                    //sinon
                    }else{
                        //on stock la réponse de la requète axios dans une variable user (retourne un objet)
                        let user = response.user[0]
                        //on peut rajouter une propriété token à user avec le token dedans
                        user.token = token
                        //appel l'action de connexion de l'utilisateur (store)
                        dispatch(connectUser(user))
                    }
                })
                .catch(err=>console.log(err))
            }
        }         
                
    }, [props])
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    return (<Child {...props} params={params}/>)
}

export default RequireDataAuth
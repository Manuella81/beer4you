import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux' 
import {cleanBasket} from '../slices/basketSlice'

const Success = (props) =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        window.localStorage.removeItem("b4y-basket")
        dispatch(cleanBasket())
    }, [])
    
    return (
        <section>
            <h2>Beer4you vous remercie</h2>
            <p>Votre commande a été effectué avec succès</p>
            <Link to="/">Retour</Link>
        </section>
    )
}
export default Success
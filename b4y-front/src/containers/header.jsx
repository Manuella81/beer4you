import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import logo from '../assets/logo/logo-beer.png'
import {useSelector} from 'react-redux' 
import {selectUser} from '../slices/userSlice'
import {selectBasket} from '../slices/basketSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons'

const Header = (props) =>{
    
    const user = useSelector(selectUser)
    const basket = useSelector(selectBasket)
    
    return (
        <header className="header-nav">
            <nav>
                <div className="list1">
                    <img src={logo} />
                    <Link to="/">Home</Link>
                    <Link to="/product">produits</Link>
                </div>
                
                {user.isLogged === false ? <div className="list2">
                    <Link to="/register">S'enregistrer</Link>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/basket">Panier</Link>
                </div> : <div className="list2">
                    {user.infos.role === "admin" && <Link to="/admin">Admin</Link>}
                    <Link to="/profil">{user.infos.firstName} {user.infos.lastName.toUpperCase()}</Link>
                    <Link to="/logout">Déconnexion</Link>
                    <Link to="/basket"><FontAwesomeIcon icon={faCartShopping}/>{basket.basket.length > 0 && <span className="span-basket">{basket.basket.length}</span>}</Link>
                </div>}
            </nav>
            <section className="header-pict">
                <div className="background_opacity"></div>
                <h1>Beer4you, ça commence ici !</h1>
            </section>
        </header>
    )
}

export default Header
import React, {useState, useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux' 
import {selectUser} from '../slices/userSlice'
import {selectBasket, modifyBasket, cleanBasket} from '../slices/basketSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {saveOneOrder} from '../api/order'

const Basket = (props)=>{
    
    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [orderId, setOrderId] = useState(null)
    
    //au click on enregistre une commande
    const onClickSaveOrder = ()=>{
        if(user.isLogged){
            //on crée un objet datas qui récupère l'id de l'utilisateur et le panier dans le storage
            let datas = {
                user_id: user.infos.id,
                basket: basket.basket
            }
            saveOneOrder(datas)
            .then((res)=>{
                setOrderId(res.orderId)
                setRedirect(true)
            })
            .catch(err=>console.log(err))
        }
    }
    
    //au click on supprime un produit du panier
    const removeToBasket = (oldBasket, myBeer) =>{
        
        let newBasket = JSON.parse(JSON.stringify(oldBasket))
        console.log("basket",newBasket)
        
        let basketDel = newBasket.filter(b => b.id !== myBeer.id)
        let lsBasket = JSON.stringify(basketDel)
        window.localStorage.setItem("b4y-basket", lsBasket)
        dispatch(modifyBasket(basketDel))
    }
    
    //au click on vide le panier
    const vider = () =>{
        window.localStorage.removeItem("b4y-basket")
        dispatch(cleanBasket())
    }
    
    //chargement des produits dans le panier
    const listBasket = ()=>{
        return basket.basket.map((beer)=>{
            let total = parseInt(beer.price) * parseInt(beer.quantityInCart)
            return (<tr key={beer.id}>
                <td>{beer.quantityInCart}</td>
                <td>{beer.name}</td>
                <td>{beer.price}</td>
                <td>{total}</td>
                <td>
                    <button
                        className="trash-beer"
                        onClick={()=>{
                            removeToBasket(basket.basket, beer)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </td>
            </tr>)
        })
    }
    
    if(redirect){
        return <Navigate to={`/payment/${orderId}`} />
    }
    return (
        <section>
            <h2>Mon panier</h2>
            {basket.basket.length > 0 ? <table className="basketTable">
                <thead>
                    <tr>
                        <th>Quantité</th>
                        <th>Nom</th>
                        <th className="desktop">Prix unitaire</th>
                        <th>Prix total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <button
                                className="red-button"
                                onClick={(e)=>{
                                    vider()
                                }}
                            >
                                Vider le panier
                            </button>
                        </td>
                    </tr>
                </tfoot>
                <tbody>
                    {listBasket()}
                </tbody>
            </table> : <p>Votre panier est vide.</p>}
            {basket.basket.length > 0 && <button
                onClick={(e)=>{
                    onClickSaveOrder()
                }}
            >
                Payer
            </button>}
        </section>
    )
}

export default Basket
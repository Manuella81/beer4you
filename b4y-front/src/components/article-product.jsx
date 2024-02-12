import React, {useState, useEffect} from 'react'
import {config} from '../config'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PopUp from './popup'

import {useSelector, useDispatch} from 'react-redux' 
import {selectBasket, modifyBasket} from '../slices/basketSlice'

const ArticleDetail = (props)=>{
    
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch() 
    
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(null)
    const [isPopUp, setPopUp] = useState(false)
    
    //console.log(props.prod)
    
    const onClickBasket = (oldBasket, newProduct) =>{
        console.log('ajouté', quantity)
        let nbr = parseInt(quantity)
        
        if(isNaN(nbr)){
            setError("Veuillez saisir un nombre svp!")
        }else{
            if(parseInt(props.prod.quantity) < nbr){
                setError(`Veuillez choisir une quantitée inférieur ou égale à ${props.prod.quantity}`)
            }else{
                setError(null)
                
                let newBasket = JSON.parse(JSON.stringify(oldBasket))
                //console.log(newBasket)
                let same = newBasket.basket.findIndex((b) => b.id === newProduct.id)
                //console.log(same)
                if(same === -1){
                    let myProduct = JSON.parse(JSON.stringify(newProduct))
                    myProduct.quantityInCart = parseInt(quantity)
                    //console.log(myProduct)
                    let myBasket = [...newBasket.basket, myProduct]
                    let lsBasket = JSON.stringify(myBasket)
                    window.localStorage.setItem('b4y-basket', lsBasket)
                    dispatch(modifyBasket(myBasket))
                }else{
                    //console.log(newBasket.basket[same])
                    newBasket.basket[same].quantityInCart += parseInt(quantity)
                    let lsBasket = JSON.stringify(newBasket)
                    window.localStorage.setItem('b4y-basket', lsBasket)
                    dispatch(modifyBasket(newBasket))
                }
                setPopUp(true)
            }
        }
        
    } 
    
    return (
        <li className="product-mosaic">
            {/*popup*/}
            <PopUp 
                isPopUp={isPopUp}
                msg={`Vous avez ajouté: ${quantity} bières dans votre panier`}
                onClickClose={(e)=>{
                    setPopUp(false)
                    setQuantity("")
                }}
            />
            {error !== null && <p>{error}</p>}
            <Link to={`/detail/${props.prod.id}`}>
                <div>
                    <h3>{props.prod.name}</h3>
                    <img src={config.pict_url + props.prod.photo} />
                    <p>{props.prod.description.substr(0,50)}</p>
                    <p>prix: {props.prod.price} €</p>
                </div>
            </Link>
            <form
                onSubmit={(e)=>{
                    e.preventDefault()
                }}
            >
                <input type="text"
                    value={quantity}
                    onChange={(e)=>{
                        setQuantity(e.currentTarget.value)
                    }}
                />
                <div className="addToBasket"
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickBasket(basket, props.prod)
                    }}
                >
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </div>
            </form>
            
            
        </li>
    )
}

export default ArticleDetail
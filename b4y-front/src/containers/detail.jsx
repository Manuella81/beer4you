import React, {useState, useEffect} from 'react'
import {config} from '../config'
import {Link, Navigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import {takeOneBeer} from '../api/beer'
import PopUp from "../components/popup"

import {useSelector, useDispatch} from 'react-redux' 
import {selectBasket, modifyBasket} from '../slices/basketSlice'

const Detail = (props)=>{
    
    const id = props.params.id
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch() 
    
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(null)
    const [isPopUp, setPopUp] = useState(false)
    const [beer, setBeer] = useState(null)
    
    useEffect(()=>{
        takeOneBeer(id)
        .then((res)=>{
            console.log(res.result)
            setBeer(res.result)
        })
    }, [])
    
    const onClickBasket = (oldBasket, newProduct) =>{
        console.log('ajouté', quantity)
        let nbr = parseInt(quantity)
        
        if(isNaN(nbr)){
            setError("Veuillez saisir un nombre svp!")
        }else{
            if(parseInt(beer.quantity) < nbr){
                setError(`Veuillez choisir une quantitée inférieur ou égale à ${beer.quantity}`)
            }else{
                setError(null)
                
                let newBasket = JSON.parse(JSON.stringify(oldBasket))
                
                let same = newBasket.basket.findIndex((b) => b.id === newProduct.id)
                
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
    
    return (<section>
        <h2>Details {id}</h2>
        {/*popup*/}   
        <PopUp 
            isPopUp={isPopUp}
            msg={`Vous avez ajouté: ${quantity} bières dans votre panier`}
            onClickClose={(e)=>{
                setPopUp(false)
                setQuantity("")
            }}
        />
        <Link className="comeBack" to="/product"><FontAwesomeIcon icon={faArrowCircleLeft}/></Link>
        {beer !== null && <div className="beerDetail">
            <img src={config.pict_url+beer.photo} />
            <h3>{beer.name}</h3>
            <p>{beer.description}</p>
            
            {error !== null && <p>{error}</p>}
            <div className="paymentPart">
                <span>Prix unitaire: <em>{beer.price}</em> €</span>
                
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
                            onClickBasket(basket, beer)
                        }}
                    >
                        <FontAwesomeIcon icon={faPlusCircle}/>
                    </div>
                </form>
            </div>
        </div>}
    </section>)
}

export default Detail
import React, {useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import {selectUser} from '../../../slices/userSlice'
import {loadBeers} from '../../../slices/beerSlice'
import {Navigate} from 'react-router-dom'

import {addOneBeer} from '../../../api/beer'

import {displayBeers} from '../../../api/beer'

import axios from 'axios'
import {config} from '../../../config'

const AddBeer = (props) =>{
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setFile] = useState(null) 
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    
    //sauvegarder une bière
    const saveCompleteBeer = () =>{
        if(selectedFile === null){
            let datas = {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                photo: "no-pict.jpg"
            }
            addOneBeer(datas)
            .then((res)=>{
                displayBeers()
                .then((response)=>{
                    dispatch(loadBeers(response.result))
                    setRedirect(true)
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }else{
            let formData = new FormData()
            formData.append('image', selectedFile)
            
            axios({
                method: "post",
                url: `${config.api_url}/api/v1/beer/pict`,
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
            .then((response)=>{
                if(response.data.status === 200){
                    let datas = {
                        name: name,
                        description: description,
                        price: price,
                        quantity: quantity,
                        photo: response.data.url
                    }
                    addOneBeer(datas)
                    .then((res)=>{
                        displayBeers()
                        .then((response)=>{
                            dispatch(loadBeers(response.result))
                            setRedirect(true)
                        })
                        .catch(err=>console.log(err))
                    })
                    .catch(err=>console.log(err))
                }
            })
            .catch(err=>console.log(err))
        }
    }
    
    const onSubmitForm = ()=>{
        if(name === "" || description === "" || price === "" || quantity === ""){
            setError("Tous les champs ne sont pas encore remplis!")
        }else if(isNaN(quantity) || isNaN(price)){
            setError("Les champs prix et quantité doivent être des chiffres!")
        }else{
            saveCompleteBeer()
        }
    }
    
    if(redirect){
        return <Navigate to="/admin" />
    }
    return (
        <section>
            <h2>Ajouter un produit</h2>
            {error !== null && <p>{error}</p>}
            <form
                className="b-form"
                onSubmit={(e)=>{
                    e.preventDefault()
                    onSubmitForm()
                }}
            >
                <input
                    type="text"
                    placeholder="Nom de la bière"
                    onChange={(e)=>{
                        setName(e.currentTarget.value)
                    }}
                />
                
                <input
                    type="file"
                    onChange={(e)=>{
                        setFile(e.currentTarget.files[0])
                    }}
                />
                
                <textarea
                    name="description"
                    onChange={(e)=>{
                        setDescription(e.currentTarget.value)   
                    }}
                >
                </textarea>
                
                <input
                    type="text"
                    placeholder="Quantité disponible"
                    onChange={(e)=>{
                        setQuantity(e.currentTarget.value)
                    }}
                />
                
                <input
                    type="text"
                    placeholder="Prix de vente"
                    onChange={(e)=>{
                        setPrice(e.currentTarget.value)
                    }}
                />
                
                <button>Enregistrer</button>
            </form>
        </section>
    )
}

export default AddBeer
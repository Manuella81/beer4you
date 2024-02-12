import React, {useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import {selectBeers} from '../../slices/beerSlice'
import {loadBeers} from '../../slices/beerSlice'
import {Link, Navigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {config} from '../../config'
import {deleteOneBeer} from '../../api/beer'

import {displayBeers} from '../../api/beer'


const Admin = (props) =>{
    
    const beer = useSelector(selectBeers)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    //suppression d'une bière
    const onClickDeleteBeer = (id)=>{
        deleteOneBeer(id)
        .then((res)=>{
            displayBeers()
            .then((response)=>{
                dispatch(loadBeers(response.result))
            })
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to="/admin" />
    }
    
    return (
        <section>
            <h2>Administration</h2>
            <Link to="/addBeer"><FontAwesomeIcon icon={faPlusCircle}/>Ajouter une bière!</Link>
            <h3>Mes produits</h3>
            <table className="tableBeer">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {beer.beers.length > 0 ? beer.beers.map((b)=>{
                        return <tr key={b.id}>
                            <td><img src={config.pict_url+b.photo}/></td>
                            <td>{b.name}</td>
                            <td>
                                <Link to={`/editBeer/${b.id}`}>modifier</Link>
                                <button
                                    onClick={(e)=>{
                                      onClickDeleteBeer(b.id)  
                                    }}
                                >
                                    supprimer
                                </button>
                            </td>
                        </tr>
                    }) : <tr>
                        <td colSpan="3"></td>
                    </tr>
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Admin
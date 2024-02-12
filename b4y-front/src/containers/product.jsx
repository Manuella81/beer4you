import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import {selectBeers} from '../slices/beerSlice'
import ArticleDetail from '../components/article-product'

const Product = (props)=>{
    
    const produits = useSelector(selectBeers)
    
    
    return (
        <section>
            <h2>Je bois ma vie</h2>
            
            {produits.beers.length > 0 && <ul>
                {produits.beers.map((b)=>{
                    return <ArticleDetail key={b.id} prod={b}/>
                })}
            </ul>}
        </section>
    )
}

export default Product
import React from 'react'
import beer from '../assets/logo/bandeau6.jpg'

const Home = (props) =>{
    return (
        <section>
            <p id="home-presentation">Homepage.</p>
            <img src={beer} id="homerHome"/>
        </section>
    )
}


export default Home
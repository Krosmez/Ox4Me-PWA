import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../img/oxford-white.png'

export default function Home({screenWidth}) {
    return (
        <main>
            <div className='hero'>
                <h1>Ox4Me</h1>
                {/* <img src={Logo} alt="Logo de l'Oxford Pub" className="container" /> */}
            </div>
            <section className={`home-list ${screenWidth >= 768 ? "container" : ''}`}>
                <Link to='/list'>La liste</Link>
                <Link to='/random'>Cocktail aléatoire</Link>
                <Link to='/favorites'>Vos favoris</Link>
            </section>
        </main>
    )
}
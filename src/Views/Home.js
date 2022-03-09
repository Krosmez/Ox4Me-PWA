import React from 'react';
import { Link } from "react-router-dom";
import ButtonLink from '../Components/ButtonLink/ButtonLink';
import Logo from '../img/oxford-white.png'

export default function Home({ screenWidth }) {
    return (
        <main>
            <div className='hero'>
                <h1>Ox4Me</h1>
                {/* <img src={Logo} alt="Logo de l'Oxford Pub" className="container" /> */}
            </div>
            <section className={`home-list ${screenWidth >= 768 ? "container" : ''}`}>
                <ButtonLink isLink variant='home-link' to='list' content='La liste' />
                <ButtonLink isLink variant='home-link' to='random' content='Cocktail aléatoire' />
                <ButtonLink isLink variant='home-link' to='favorites' content='Vos favoris' />
            </section>
        </main>
    )
}
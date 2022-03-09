import React from 'react';
import { useState } from "react";
import { ReactComponent as Loupe } from '../../img/loupe.svg'
import ButtonLink from '../ButtonLink/ButtonLink';
import './navbar.css'

export default function NavBar({ isHeader }) {
    const [searchValue, setSearchValue] = useState("");

    function handleSearch(e) {
        e.preventDefault();

    }

    if (isHeader) {
        return (
            <header>
                <div className='container'>
                    <div className='search-input-ctn '>
                        <label htmlFor='cocktail-search' className='screen-reader-text'>Find a cocktail</label>
                        <input
                            type='search'
                            name='cocktail-search'
                            className='search'
                            placeholder='Rechercher un cocktail'
                            aria-label="Rechercher un cocktail"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <ButtonLink
                            type='submit'
                            onClick={handleSearch}
                            content={
                                <>
                                    <span className='screen-reader-text'>Lancer la recherche</span>
                                    <Loupe />
                                </>
                            }
                        />
                    </div>

                    <nav>
                        <ul className='menu'>
                            <li>
                                <ButtonLink isNavLink content='Accueil' />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='list' content='La liste' />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='random' content='Cocktail aléatoire' />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='favorites' content='Vos favoris' />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    } else {
        return (
            <header>
                <div className='container'>
                    <nav>
                        <ul className='menu'>
                            <li>
                                <ButtonLink isNavLink content='Accueil' />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='list' content='La liste' />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='random' content='Cocktail aléatoire' />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='favorites' content='Vos favoris' />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='mentions-legales' content='Mentions Légales' />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }

}
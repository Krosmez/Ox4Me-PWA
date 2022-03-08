import React from 'react';
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Loupe } from '../../img/loupe.svg'
import './navbar.css'

export default function NavBar({ IsElement }) {
    const [searchValue, setSearchValue] = useState("");

    function handleSearch(e) {
        e.preventDefault();

    }

    return (
        <IsElement>
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
                    <button type='submit' className='btn '
                        onClick={handleSearch}
                    >
                        <span className='screen-reader-text'>Lancer la recherche</span>
                        <Loupe />
                    </button>
                </div>

                <nav>
                    <ul className='menu'>
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/list'>La liste</NavLink>
                        </li>
                        <li>
                            <NavLink to='/random'>Cocktail aléatoire</NavLink>
                        </li>
                        <li>
                            <NavLink to='/favorites'>Vos favoris</NavLink>
                        </li>
                        {
                            IsElement !== 'footer' ? '' : 
                                <li>
                                    <NavLink to='/mentions-legales'>Mentions Légales</NavLink>
                                </li>
                        }
                    </ul>
                </nav>
            </div>
        </IsElement>
    )
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ReactComponent as Loupe } from '../../img/loupe.svg'
import ButtonLink from '../ButtonLink/ButtonLink';
import './navbar.css'

export default function NavBar({ isHeader, getSearchValue }) {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [isToggle, setIsToggle] = useState(false);

    function handleSearch(e) {
        e.preventDefault();
        getSearchValue(searchValue.trim());
        navigate(`/search`);
        setSearchValue('');
    };

    if (isHeader) {
        return (
            <header>
                <div className='container'>
                    <form className='search-input-ctn' onSubmit={handleSearch}>
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
                    </form>
                    <nav>
                        <button
                            className="toggle-menu"
                            aria-expanded={isToggle === true ? "true" : "false"}
                            aria-controls="menu"
                            onClick={() => { setIsToggle(!isToggle) }}
                        >
                            <span className="screen-reader-text">Menu</span>
                        </button>
                        <ul className="menu" id="menu" hidden={!isToggle ? true : false}>
                            <li>
                                <ButtonLink isNavLink content='Accueil' onClick={() => { setIsToggle(!isToggle) }} />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='list' content='La liste' onClick={() => { setIsToggle(!isToggle) }} />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='random' content='Cocktail aléatoire' onClick={() => { setIsToggle(!isToggle) }} />
                            </li>
                            <li>
                                <ButtonLink isNavLink to='favorites' content='Vos favoris' onClick={() => { setIsToggle(!isToggle) }} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    } else {
        return (
            <footer>
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
            </footer>
        )
    }

}
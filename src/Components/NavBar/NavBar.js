import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ReactComponent as Loupe } from '../../img/loupe.svg'
import ButtonLink from '../ButtonLink/ButtonLink';
import Menu from '../Menu/Menu';
import './navbar.css'

export default function NavBar({ getSearchValue, screenWidth }) {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        getSearchValue(searchValue.trim());
        navigate(`/search`);
        setSearchValue('');
    };

    return (
        <header>
            <div className='container'>
                <form className='search-input-ctn' onSubmit={handleSearch}>
                    <label htmlFor='cocktail-search' className='search-label'>
                        <span className='screen-reader-text'>Trouver un cocktail</span>
                        <Loupe />
                    </label>
                    <input
                        type='search'
                        name='cocktail-search'
                        className='search-btn'
                        spellCheck='false'
                        autoComplete='off'
                        placeholder='Rechercher un cocktail'
                        aria-label="Rechercher un cocktail"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
                <Menu screenWidth={screenWidth} />
            </div>
        </header>
    )
}


import { Link } from "react-router-dom";
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

                <div className='search-input-ctn'>
                    <label htmlFor='cocktail-search' className='screen-reader-text'>Find a cocktail</label>
                    <input
                        type='search'
                        name='cocktail-search'
                        placeholder='Rechercher un cocktail'
                        aria-label="Rechercher un cocktail"
                        className='search'
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button type='submit' className='loupe'
                        onClick={() => handleSearch}
                    >
                        <span className='screen-reader-text'>Lancer la recherche</span>
                        <Loupe />
                    </button>
                </div>

                <nav>
                    <ul className='menu'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/list'>La liste</Link>
                        </li>
                        <li>
                            <Link to='/random'>Cocktail aléatoire</Link>
                        </li>
                        <li>
                            <Link to='/favorites'>Vos favoris</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </IsElement>
    )
}
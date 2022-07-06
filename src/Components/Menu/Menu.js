import React from 'react';
import { useState, useEffect } from 'react';
import ButtonLink from '../ButtonLink/ButtonLink';
import './menu.css';

export default function Menu({ screenWidth }) {
    const menuLinks = [
        { "text": "Accueil", "to": "/" },
        { "text": "La liste", "to": "/list" },
        { "text": "Cocktail aléatoire", "to": "/random" },
        { "text": "Vos favoris", "to": "/favorites" },
        { "text": "Mentions Légales", "to": "/mentions-legales" }
    ];

    const [isToggle, setIsToggle] = useState(false);

    useEffect(() => {
        if (screenWidth >= 1080) {
            setIsToggle(true);
        };
    }, [screenWidth]);

    return (
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
                {screenWidth >= 1080 ?
                    menuLinks.map((link, index) => {
                        return (
                            <li key={index}>
                                <ButtonLink isNavLink to={link.to} content={link.text} />
                            </li>
                        )
                    })
                    :
                    menuLinks.map((link, index) => {
                        return (
                            <li key={index}>
                                <ButtonLink
                                    isNavLink
                                    to={link.to}
                                    content={link.text}
                                    onClick={() => { setIsToggle(!isToggle) }}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CheckBox } from '../../img/check-unboxed.svg';
import { ReactComponent as Cross } from '../../img/crossed.svg';
import { ReactComponent as Heart } from '../../img/heart.svg';
import { ReactComponent as HeartFill } from '../../img/heart-fill.svg';
import './listitem.css'


// Quelques informations :
// Pour le moment le logo n'est pas dispo, donc la fonctionnalite du picto "oxford"
// pour les specialites n'est pas disponible, ni meme creer. 
// PS : (Et je suis en qwerty flemme de faire les accents <3)

export default function ListItem({ to, name, data }) {
    const [isDrink] = useState(false);
    const [isLike, setIsLike] = useState(false);

    useEffect(()=> {
        // <Shlygly> : J'ai clear, ça faisait planter le navigateur
    }, [isLike]);

    return (
        <li className='cocktail-list-item'>
            <Link to={to} className='cocktail-link'>
                {name}
            </Link>
            <div className='icon-container'>
                {
                    isDrink ?
                        <CheckBox />
                        :
                        <Cross />
                }
                {
                    isLike ?
                        <HeartFill onClick={() => setIsLike(!isLike)}/>
                        :
                        <Heart onClick={() => setIsLike(!isLike)} />
                }
            </div >
        </li>
    )
}
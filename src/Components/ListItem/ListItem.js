import React from 'react';
import { useState } from 'react';
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

export default function ListItem({ to, name}) {
    const [isDrink, setIsDrink] = useState()
    const [isLike, setIsLike] = useState()
    return (
        <li className='cocktail-list-item'>
            <Link to={to} className='cocktail-link'>
                {name}
            </Link>
            <div className='icon-container'>
                {
                    isDrink ?
                        <CheckBox onClick={() => setIsDrink(!isDrink)} />
                        :
                        <Cross onClick={() => setIsDrink(!isDrink)} />
                }
                {
                    isLike ?
                        <HeartFill onClick={() => setIsLike(!isLike)} />
                        :
                        <Heart onClick={() => setIsLike(!isLike)} />
                }
            </div >
        </li>
    )
}
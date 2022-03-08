import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CheckBox } from '../../img/check-unboxed.svg';
import { ReactComponent as Heart } from '../../img/heart.svg';
import { ReactComponent as HeartFill } from '../../img/heart-fill.svg';
import './cocktailitem.css'
import StorageTools from "../../data/StorageTools";

export default function CocktailItem({ data }) {
    const {id, name} = data;

    const isConsumed = StorageTools.containsConsumedDrink(id);
    const [isLike, setIsLike] = useState(StorageTools.containsFavoriteDrink(id));

    function addRemoveLike() {
        if (!StorageTools.containsFavoriteDrink(id)) {
            StorageTools.addFavoriteDrink(id);
            setIsLike(true);
        } else {
            StorageTools.removeFavoriteDrink(id);
            setIsLike(false);
        }
    }

    return (
        <li className='cocktail-list-item'>
            <Link to={`/cocktail/${id}`} className='cocktail-link'>
                {name}
            </Link>
            <div className='icon-container'>
                {
                    isConsumed &&
                        <CheckBox />
                }
                {
                    isLike ?
                        <HeartFill onClick={addRemoveLike}/>
                        :
                        <Heart onClick={addRemoveLike} />
                }
            </div >
        </li>
    )
}
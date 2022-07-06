import React from 'react';
import { useState } from 'react';
import { ReactComponent as CheckBox } from '../../img/check-unboxed.svg';
import { ReactComponent as Heart } from '../../img/heart.svg';
import { ReactComponent as HeartFill } from '../../img/heart-fill.svg';
import StorageTools from "../../data/StorageTools";
import './cocktailitem.css';
import ButtonLink from '../ButtonLink/ButtonLink';

export default function CocktailItem({ data, onLikeDislike = () => {} }) {
    const { id, name, score } = data;

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
        onLikeDislike();
    }

    return (
        <li className='cocktail-list-item'>
            <ButtonLink isLink to={`/cocktail/${id}`} variant='cocktail-list-link' content={name} />
            {score && <div>{(score * 100).toFixed(2)}%</div>}
            <div className='icon-container'>
                {isConsumed && <CheckBox />}
                {
                    isLike ?
                        <HeartFill onClick={addRemoveLike} />
                        :
                        <Heart onClick={addRemoveLike} />
                }
            </div >
        </li>
    )
}
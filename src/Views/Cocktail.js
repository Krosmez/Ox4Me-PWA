import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OxAPI from '../data/OxAPI';
import StorageTools from "../data/StorageTools";
import IngredientListItem from '../Components/IngredientsListItem/IngredientListItem';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';
import { ReactComponent as CheckBox } from '../img/check-unboxed.svg'
import { ReactComponent as Cross } from '../img/crossed.svg'
import { ReactComponent as Heart } from '../img/heart.svg'
import { ReactComponent as HeartFill } from '../img/heart-fill.svg'

export default function Cocktail() {
    const params = useParams();

    const [isConsumed, setIsConsumed] = useState(StorageTools.containsConsumedDrink(params.id));
    const [isLike, setIsLike] = useState(StorageTools.containsFavoriteDrink(params.id));
    const [drinkName, setDrinkName] = useState("");
    const [drinkCategory, setDrinkCategory] = useState("");
    const [ingredients, setIngredients] = useState([]);

    function addRemoveLike() {
        if (!StorageTools.containsFavoriteDrink(params.id)) {
            StorageTools.addFavoriteDrink(params.id);
            setIsLike(true);
        } else {
            StorageTools.removeFavoriteDrink(params.id);
            setIsLike(false);
        }
    }

    function setResetConsumed() {
        if (!StorageTools.containsConsumedDrink(params.id)) {
            StorageTools.addConsumedDrink(params.id);
            setIsConsumed(true);
        } else {
            StorageTools.removeConsumedDrink(params.id);
            setIsConsumed(false);
        }
    }

    useEffect(() => {
        OxAPI.getDrinkDetails(params.id).then(({ name, category, ingredients }) => {
            setDrinkName(name);
            setDrinkCategory(category);
            setIngredients(ingredients);
        });
    }, [params.id]);

    if (!drinkName) {
        return <LoadingScreen />
    } else {
        return (
            <main className='cocktail-details container'>
                <section className='cocktail-top'>
                    <div className='cocktail-info'>
                        <div>
                            <img src={`https://ox4me.herokuapp.com/static/images/drink/${params.id}.svg`} alt={`Image du cocktail ${drinkName}`} loading='lazy'/>
                        </div>
                        <div>
                            <h2>{drinkName}</h2>
                            <p>
                                {
                                    drinkCategory === 'classic' ?
                                        "Classique" :
                                        drinkCategory === 'homemade' ?
                                            "Spécialité Oxford" :
                                            "Inconnu"
                                }
                            </p>
                        </div>
                    </div>

                    <div className='cocktail-icons'>
                        <label htmlFor='already-drink' onClick={setResetConsumed} className={!isConsumed ? 'btn-consumed ' : 'btn-consumed checked'}>
                            <input type='checkbox' name='already-drink' checked={isConsumed} readOnly />
                            {!isConsumed ? <Cross /> : <CheckBox />}
                            {!isConsumed ? " Jamais testé" : " Déjà bû"}
                        </label>
                        <label htmlFor='like' onClick={addRemoveLike} className='btn-heart'>
                            <input type='checkbox' name='like' checked={isLike} readOnly />
                            {!isLike ? <Heart /> : <HeartFill />}
                        </label>
                    </div>
                </section>

                <section className='cocktail-bottom'>
                    <h3>Les ingredients</h3>
                    <ul className='ingredients-list'>
                        {
                            ingredients.map((el, index) => {
                                return (
                                    <IngredientListItem
                                        data={el}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </ul>
                </section>
            </main>
        )
    }
}
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientListItem from '../Components/IngredientsListItem/IngredientListItem';
import OxAPI from '../data/OxAPI';
import Logo from '../img/oxford-white.png'
import StorageTools from "../data/StorageTools";
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';


export default function Cocktail() {
    const params = useParams();

    const [isConsumed, setIsConsumed] = useState(StorageTools.containsConsumedDrink(params.id));
    const [isLike, setIsLike] = useState(StorageTools.containsFavoriteDrink(params.id));
    const [drinkName, setDrinkName] = useState("");
    const [drinkCategory, setDrinkCategory] = useState("");
    // const [drinkImg, setDrinkImg] = useState("");
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
            <main className='cocktail-only container'>
                <section className='cocktail-top-info'>
                    <img src={Logo} alt='Test' />

                    <div className='cocktail-details'>
                        <div>
                            <h2>{drinkName}</h2>
                            <p>{
                                drinkCategory === 'classic' ?
                                    "Classique" :
                                    drinkCategory === 'homemade' ?
                                        "Spécialité Oxford" :
                                        "Inconnu"
                            }</p>
                        </div>

                        <div className='icon-and-btn'>
                            <label htmlFor='already-drink' onClick={setResetConsumed} className={!isConsumed ? '' : 'checked'}>
                                <input type='checkbox' name='already-drink' checked={isConsumed} readOnly />
                                &nbsp;
                                {!isConsumed ? "Jamais testé" : "Déjà bû"}
                            </label>
                            <label htmlFor='like' onClick={addRemoveLike}>
                                <input type='checkbox' name='like' className='heart' checked={isLike} readOnly />
                            </label>
                        </div>
                    </div>
                </section>

                <section>
                    <h3>Les ingredients</h3>
                    <ul className='ingredients-container'>
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
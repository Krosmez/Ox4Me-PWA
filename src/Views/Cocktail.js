import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OxAPI from '../data/OxAPI';
import StorageTools from '../data/StorageTools';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';
import IconBar from '../Components/IconBar/IconBar';
import IngredientListItem from '../Components/IngredientsListItem/IngredientListItem';
import Headings from '../Components/Headings/Headings';

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
                            <Headings Is='h2' text={drinkName}/>
                            <p>
                                {
                                    drinkCategory === 'classic' ?
                                        "Classique" :
                                        drinkCategory === 'homemade' ?
                                            "Sp??cialit?? Oxford" :
                                            "Inconnu"
                                }
                            </p>
                        </div>

                        <IconBar
                            isConsumed={isConsumed}
                            setResetConsumed={setResetConsumed}
                            addRemoveLike={addRemoveLike}
                            isLike={isLike}
                        />

                    </div>

                    <div className='cocktail-img'>
                        <img src={`https://ox4me.deta.dev/static/images/drink/${params.id}.svg`} alt={`Illustration du cocktail ${drinkName}`} loading='lazy' />
                    </div>

                </section>

                <section className='cocktail-bottom'>
                    <Headings Is='h3' text='Les ingr??dients' />
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
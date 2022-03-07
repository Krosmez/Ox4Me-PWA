import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientListItem from '../Components/IngredientsListItem/IngredientListItem';
import OxAPI from '../data/OxAPI';
import Logo from '../img/oxford-white.png'


export default function Cocktail({ screenWidth }) {
    const [isChecked, setIsChecked] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [drinkName, setDrinkName] = useState("");
    const [drinkCategory, setDrinkCategory] = useState("");
    const [drinkImg, setDrinkImg] = useState("")
    const [ingredients, setIngredients] = useState([]);

    let params = useParams();

    useEffect(async () => {
        const { name, category, ingredients } = await OxAPI.getDrinkDetails(params.id);
        setDrinkName(name);
        setDrinkCategory(category);
        setIngredients(ingredients);
    });
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
                                drinkCategory === 'Spécialité Oxford' ?
                                    "Spécialité Oxford" :
                                    "Inconnu"
                        }</p>
                    </div>
                    <div className='icon-and-btn'>
                        <label htmlFor='already-drink' onClick={() => setIsChecked(!isChecked)}>
                            {'Jamais tester'}
                            <input type='checkbox' name='already-drink' checked={isChecked} readOnly />
                        </label>
                        <label htmlFor='like' onClick={() => setIsLike(!isLike)}>
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
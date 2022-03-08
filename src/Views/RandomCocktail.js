import React from 'react';
import OxAPI from '../data/OxAPI';
import {useNavigate} from "react-router-dom";

export default function RandomCocktail() {
    const randomButtons = [
        {"text": "Tous cocktails", "criterion": "all"},
        {"text": "Fortement alcoolisé"},
        {"text": "Peu alcoolisé"},
        {"text": "Classique", "criterion": "classic"},
        {"text": "Spécialité Oxford", "criterion": "homemade"},
        {"text": "Sucré"},
        {"text": "Acidulé"},
        {"text": "Favoris seulement"},
        {"text": "A découvrir"},
        {"text": "La spéciale développeur"}
    ];

    const navigate = useNavigate();

    async function navigateToRandom(criterion) {
        const drinkData = await OxAPI.getRandomDrink(criterion);
        await navigate(`/cocktail/${drinkData.id}`);
    }

    return (
        <main className='container'>
            <div className='btn-random-ctn'>

                {
                    randomButtons.map(({text, criterion}) => (
                        <button
                            className="btn"
                            disabled={criterion === undefined}
                            onClick={async () => {
                            if (criterion) {
                                await navigateToRandom(criterion);
                            }
                        }}>
                            {text}
                        </button>
                    ))
                }

            </div>
        </main>
    )
}
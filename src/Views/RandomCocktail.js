import React from 'react';
import OxAPI from '../data/OxAPI';
import {useNavigate} from "react-router-dom";
import ButtonLink from '../Components/ButtonLink/ButtonLink';
import StorageTools from "../data/StorageTools";

export default function RandomCocktail() {
    const randomButtons = [
        {"text": "Tous cocktails", "criterion": "all"},
        {"text": "Fortement alcoolisé"},
        {"text": "Peu alcoolisé"},
        {"text": "Classique", "criterion": "classic"},
        {"text": "Spécialité Oxford", "criterion": "homemade"},
        {"text": "Sucré", "criterion": "sweet"},
        {"text": "Acidulé", "criterion": "sour"},
        {"text": "Amer", "criterion": "bitter"},
        {"text": "Crémeux", "criterion": "creamy"},
        {"text": "Épicé", "criterion": "spicy"},
        {"text": "Favoris seulement", "action": navigateToRandomFavorites},
        {"text": "A découvrir"},
        {"text": "La spéciale développeur"}
    ];

    const navigate = useNavigate();

    async function navigateToRandomCriterion(criterion) {
        const drinkData = await OxAPI.getRandomDrink(criterion);
        await navigate(`/cocktail/${drinkData.id}`);
    }

    async function navigateToRandomFavorites() {
        const drinks = StorageTools.initCheckFavoritesDrinks();
        await navigate(`/cocktail/${drinks[Math.floor(Math.random() * drinks.length)]}`);
    }

    return (
        <main className='container'>
            <div className='btn-random-ctn'>
                {
                    randomButtons.map(button => {
                        if (button.hasOwnProperty("action")) {
                            return (
                                <ButtonLink
                                    onClick={async () => await button.action()}
                                    content={button.text}
                                />
                            );
                        } else if (button.hasOwnProperty("criterion")) {
                            return (
                                <ButtonLink
                                    onClick={async () => await navigateToRandomCriterion(button.criterion)}
                                    content={button.text}
                                />
                            );
                        } else {
                            return (
                                <ButtonLink disabled content={button.text} />
                            )
                        }
                    })
                }

            </div>
        </main>
    )
}
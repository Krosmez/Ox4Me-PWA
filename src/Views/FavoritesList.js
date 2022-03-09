import React from 'react';
import { useState, useEffect } from 'react';
import StorageTools from '../data/StorageTools';
import OxAPI from '../data/OxAPI';
import CocktailItem from '../Components/CocktailItem/CocktailItem';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';

export default function FavoritesList() {
    const [drinks, setDrinks] = useState([]);

    const favoriteDrink = StorageTools.initCheckFavoritesDrinks();

    useEffect(() => {
        OxAPI.getAllDrinks().then(data => {
            setDrinks(data.drinks.sort((a, b) => {
                if (a.category !== b.category) {
                    return b.category.localeCompare(a.category);
                } else if (/[a-z]/i.test(a.name) === /[a-z]/i.test(b.name)) {
                    return a.name.localeCompare(b.name);
                } else {
                    return /[a-z]/i.test(a.name) ? -1 : 1;
                }
            }).filter(e => favoriteDrink.includes(e.id)));
        });
    }, [drinks]);

    if (drinks.length < 1) {
        return <LoadingScreen />;
    } else {
        return (
            <main className='container'>
                <ul className='cocktail-list '>
                    {
                        drinks.map((el) => {
                            return (
                                <CocktailItem
                                    key={el.id}
                                    data={el}
                                />
                            )
                        })
                    }
                </ul>
            </main>
        )
    }
}
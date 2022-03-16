import React from 'react';
import {useState, useEffect} from 'react';
import StorageTools from '../data/StorageTools';
import OxAPI from '../data/OxAPI';
import CocktailItem from '../Components/CocktailItem/CocktailItem';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';
import Headings from '../Components/Headings/Headings';

export default function FavoritesList() {
    const [allDrinks, setAllDrinks] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    function updateLikeAndSuggestions() {
        const favoriteDrink = StorageTools.initCheckFavoritesDrinks();
        setDrinks(allDrinks.sort((a, b) => {
            if (a.category !== b.category) {
                return b.category.localeCompare(a.category);
            } else if (/[a-z]/i.test(a.name) === /[a-z]/i.test(b.name)) {
                return a.name.localeCompare(b.name);
            } else {
                return /[a-z]/i.test(a.name) ? -1 : 1;
            }
        }).filter(e => favoriteDrink.includes(e.id)));

        setSuggestions([]);
        OxAPI.getDrinksSuggestions(favoriteDrink).then(suggestDrink => {
            setSuggestions(
                allDrinks
                    .filter(d => suggestDrink.some(({id}) => d.id === id))
                    .map(drink => Object({
                        ...drink,
                        "score": suggestDrink.find(({id}) => drink.id === id).score
                    }))
                    .sort((d1, d2) => d2.score - d1.score)
            );
        })
    }

    useEffect(() => {
        OxAPI.getAllDrinks().then(data => {
            setAllDrinks(data.drinks);
        });
    }, []);

    useEffect(updateLikeAndSuggestions, [allDrinks]);

    return (
        <main className='container favorites'>
            <section>
                <Headings Is='h2' text='Vos favoris'/>
                {
                    drinks.length > 0 ?
                        <ul className='cocktail-list '>
                            {
                                drinks.map((el) => {
                                    return (
                                        <CocktailItem
                                            key={el.id}
                                            data={el}
                                            onLikeDislike={updateLikeAndSuggestions}
                                        />
                                    )
                                })
                            }
                        </ul>
                        :
                        <LoadingScreen/>
                }
            </section>
            <section>
                <Headings Is='h2' text='Suggestions'/>
                <p>
                    D'après votre liste de cocktails favoris, nous vous recommandons :
                </p>
                {
                    suggestions.length > 0 ?
                        <ul className='cocktail-list '>
                            {
                                suggestions.map((el) => {
                                    return (
                                        <CocktailItem
                                            key={el.id}
                                            data={el}
                                            onLikeDislike={updateLikeAndSuggestions}
                                        />
                                    )
                                })
                            }
                        </ul>
                        :
                        <LoadingScreen/>
                }
            </section>
        </main>
    )
}
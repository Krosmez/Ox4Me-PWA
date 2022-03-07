import React from 'react';
import { useState, useEffect } from 'react';
import ListItem from "../Components/ListItem/ListItem"
import OxAPI from "../data/OxAPI";

export default function CocktailList() {
    const [drinks, setDrinks] = useState([]);

    useEffect(async () => {
        setDrinks((await OxAPI.getAllDrinks()).drinks
            .sort((a, b) => {
                if (a.category !== b.category) {
                    return b.category.localeCompare(a.category);
                } else if (/[a-z]/i.test(a.name) === /[a-z]/i.test(b.name)) {
                    return a.name.localeCompare(b.name);
                } else {
                    return /[a-z]/i.test(a.name) ? -1 : 1;
                }
            })
        );
    }, []);
    return (
        <main class='container'>
            <ul className='cocktail-list '>
                {
                    !drinks ? 'Chargement' :
                        drinks.map((el, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    to={`/cocktail/${el.id}`}
                                    name={el.name}
                                />

                            )
                        })
                }
            </ul>
        </main>
    )
}
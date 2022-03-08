import React from 'react';
import { useEffect, useState } from 'react';



export default function FavoritesList() {
    const [drinks, setDrinks] = useState([]);

    useEffect( () => {
        console.log('ouhouhouh')
    }, []);

    return (
        <main className='container'>
            <ul className='cocktail-list '>
                {
                    // !drinks ? 'Chargement' :
                    //     drinks.map((el, index) => {
                    //         return (
                    //             <ListItem
                    //                 key={index}
                    //                 to={`/cocktail/${el.id}`}
                    //                 name={el.name}
                    //             />

                    //         )
                    //     })
                }
            </ul>
        </main>
    )
}
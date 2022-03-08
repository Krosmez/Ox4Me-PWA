import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../Components/Button/Button';
import OxRandomAPI from '../data/OxRandomAPI';

export default function RandomCocktail() {
    const [randomDrink, setRandomDrink] = useState('');
    const [homemade, setHomemade] = useState('');
    const [classic, setClassic] = useState('');
    useEffect(async () => {
        setRandomDrink(await OxRandomAPI.getRandomDrink());
        setHomemade(await OxRandomAPI.getDrinkByCategory('homemade'));
        setClassic(await OxRandomAPI.getDrinkByCategory('classic'));
    }, []);

    return (
        <main className='container'>
            <div className='btn-random-ctn'>

                <Button
                    cocktailId={randomDrink}
                    value='Full Random'
                />
                <Button
                    value='Fortement alcoolisé'
                    variant='disabled'
                />
                <Button
                    value='Peu alcoolisé'
                    variant='disabled'
                />
                <Button
                    cocktailId={classic}
                    value='Classique'
                />
                <Button
                    cocktailId={homemade}
                    value='Spécialité Oxford'
                />
                <Button
                    value='Sucré'
                    variant='disabled'
                />
                <Button
                    value='Acidulé'
                    variant='disabled'
                />
                <Button
                    value='Favoris seulement'
                    variant='disabled'
                />
                <Button
                    value='A découvrir'
                    variant='disabled'
                />
                <Button
                    value='La spéciale de ...'
                    variant='disabled'
                />
                <Button
                    value='La spéciale Développeur'
                    variant='disabled'
                />

            </div>
        </main>
    )
}
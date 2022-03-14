import React from 'react';
import { useState, useEffect } from 'react';
import ButtonLink from '../Components/ButtonLink/ButtonLink';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';
import OxAPI from "../data/OxAPI";

export default function Home({ screenWidth }) {
    const [isLoading, setIsLoading] = useState(true);
    const [drinkOfTheDay, setDrinkOfTheDay] = useState(false);

    function initLoadingTime() {
        setTimeout(
            () => setIsLoading(false), 300
        )
    }

    useEffect(() => {
        initLoadingTime();
        clearTimeout(initLoadingTime);

        OxAPI.drinkOfTheDay().then(drink => setDrinkOfTheDay(drink));
    }, []);

    return (
        <main>
            <div className='hero'>
                <h1>Ox4Me</h1>
            </div>
            {
                isLoading ? <LoadingScreen /> :
                    <section className={`home-list ${screenWidth >= 768 ? "container" : ''}`}>
                        <ButtonLink
                            variant="home-link btn"
                            disabled={drinkOfTheDay === false}
                            isLink={drinkOfTheDay !== false}
                            to={drinkOfTheDay.hasOwnProperty("id") ? `/cocktail/${drinkOfTheDay.id}` : ""}
                            content={drinkOfTheDay.hasOwnProperty("name") ? `Cocktail du jour : ${drinkOfTheDay.name}` : "Chargement du cocktail du jour..."}
                        />
                        <ButtonLink isLink variant='home-link' to='list' content='La liste' />
                        <ButtonLink isLink variant='home-link' to='random' content='Cocktail aléatoire' />
                        <ButtonLink isLink variant='home-link' to='favorites' content='Vos favoris' />
                    </section>
            }
        </main>
    )
}
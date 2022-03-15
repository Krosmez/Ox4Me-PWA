import React from 'react';
import { useState, useEffect } from 'react';
import ButtonLink from '../Components/ButtonLink/ButtonLink';
import Headings from '../Components/Headings/Headings';
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
        <main className='home'>
            {
                isLoading ? <LoadingScreen /> :
                    <>
                        <section className='hero container'>
                            <Headings Is='h1' text='Ox4Me' />
                        </section>

                        <section className='daily'>
                            <Headings Is='h2' variant='container' text='Le Cocktail du Jour' />
                            <div className='daily-content container'>

                                <div className='daily-info container'>
                                    <div>
                                        <Headings Is='h3' text={drinkOfTheDay.name} />
                                        <p>
                                            {
                                                drinkOfTheDay.category === 'classic' ?
                                                    "Classique" :
                                                    drinkOfTheDay.category === 'homemade' ?
                                                        "Spécialité Oxford" :
                                                        "Inconnu"
                                            }
                                        </p>
                                    </div>
                                    <ButtonLink
                                        isLink
                                        variant='link-btn'
                                        to={drinkOfTheDay.hasOwnProperty("id") ? `/cocktail/${drinkOfTheDay.id}` : ""}
                                        content='Voir le cocktail'
                                    />
                                </div>
                                <div className='cocktail-img'>
                                    <img src={`https://ox4me.herokuapp.com/static/images/drink/${drinkOfTheDay.id}.svg`} alt={`Illustration du cocktail ${drinkOfTheDay.name}`} loading='lazy' />
                                </div>
                            </div>

                        </section>

                        <Headings Is='h2' variant='container' text="Explorer l'application" />

                        <section className={`home-list ${screenWidth >= 768 ? "container" : ''}`}>
                            <ButtonLink isLink variant='home-link' to='list' content='La liste' />
                            <ButtonLink isLink variant='home-link' to='favorites' content='Vos favoris' />
                            <ButtonLink isLink variant='home-link' to='random' content='Cocktail aléatoire' />
                        </section>
                    </>
            }
        </main>
    )
}
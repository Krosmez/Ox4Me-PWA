import React from 'react';
import { useState, useEffect } from 'react';
import ButtonLink from '../Components/ButtonLink/ButtonLink';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';

export default function Home({ screenWidth }) {
    const [isLoading, setIsLoading] = useState(true);

    function initLoadingTime() {
        setTimeout(
            () => setIsLoading(false), 300
        )
    };
    useEffect(() => {
        initLoadingTime();
        clearTimeout(initLoadingTime);
    }, []);

    return (
        <main>
            <div className='hero'>
                <h1>Ox4Me</h1>
            </div>
            {
                isLoading ? <LoadingScreen /> :
                    <section className={`home-list ${screenWidth >= 768 ? "container" : ''}`}>
                        <ButtonLink isLink variant='home-link' to='list' content='La liste' />
                        <ButtonLink isLink variant='home-link' to='random' content='Cocktail aléatoire' />
                        <ButtonLink isLink variant='home-link' to='favorites' content='Vos favoris' />
                    </section>
            }
        </main>
    )
}
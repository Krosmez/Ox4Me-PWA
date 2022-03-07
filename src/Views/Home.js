import { Link } from "react-router-dom";
import Logo from '../img/oxford-white.png'

export default function Home() {
    return (
        <>
            <div className='hero'>
                <img src={Logo} alt="Logo de l'Oxford Pub" className="container" />
            </div>
            <section className='home-list'>
                <Link to='/list'>La liste</Link>
                <Link to='/random'>Cocktail aléatoire</Link>
                <Link to='/favorites'>Vos favoris</Link>
            </section>
        </>
    )
}
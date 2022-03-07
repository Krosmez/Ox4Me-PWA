import ListItem from "../Components/ListItem/ListItem"

export default function CocktailList({data}) {
    
    return (
        <main class='container'>
            <ul className='cocktail-list '>
                {
                    !data ? 'Chargement' :
                        data.map((el, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    to={`cocktail/${el.id}`}
                                    name={el.name}
                                />

                            )
                        })
                }
            </ul>
        </main>
    )
}
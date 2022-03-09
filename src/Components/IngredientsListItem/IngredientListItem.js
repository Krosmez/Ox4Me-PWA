import React from 'react';
import './ingredients.css';

export default function IngredientListItem({ data, ...props }) {
    return (

        !data ? 'Ingredients non fournis' :
            <li className='ingredients-list-item' {...props}>
                <p className='container'>
                    {data.name}
                </p>
            </li>

    )
}
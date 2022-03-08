import React from 'react';
import { Link } from 'react-router-dom';
import './button.css';

export default function Button({ value, cocktailId = 'krakn_stormy', variant }) {
    return (
        <Link to={`/cocktail/${cocktailId}`} className={`random btn ${variant}`} >
            {value}
        </Link>
    )
}
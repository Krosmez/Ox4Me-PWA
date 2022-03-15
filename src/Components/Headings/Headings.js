import React from 'react';
import './headings.css';

export default function Headings({Is, text, variant }) {
    return (
        <Is className={`title ${(variant && variant) || ''}`}>
            {text}
        </Is>
    )
}
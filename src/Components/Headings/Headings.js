import React from 'react';
import './headings.css';

export default function Headings({ Is, text, variant, cardTitle, isConsumed }) {
    return (
        <Is className={`${(variant && variant) || 'title'}`}>
            {
                cardTitle && isConsumed ?
                    <><span></span>{text}</> :
                    text
            }
        </Is>
    )
}
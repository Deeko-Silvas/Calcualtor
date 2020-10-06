import React from 'react';
import './button.css';

const Button = ( {text, i, type, buttonClicked} ) => {

    return (
        <button className={`btn ${type}`} onClick={() => buttonClicked(i)}>
            {text}

        </button>
    )
}

export default Button;
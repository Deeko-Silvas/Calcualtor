import React from 'react';
import './button.css';

const Button = ( {text, i, buttonClicked} ) => {
    return (
        <button onClick={() => buttonClicked(i)}>
            {text}
        </button>
    )
}

export default Button;
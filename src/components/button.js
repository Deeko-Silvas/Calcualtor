import React from 'react';
import './button.css';

const Button = ( {text, i, type, buttonClicked} ) => {
    // const encodedStr = text.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
    //     return '&#' + i.charCodeAt(0) + ';';
    //   });

    return (
        <button className={`btn ${type}`} onClick={() => buttonClicked(i)}>
            {text}

        </button>
    )
}

export default Button;
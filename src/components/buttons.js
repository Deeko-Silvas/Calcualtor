import React from 'react';
import './buttons.css';
import Button from './button';


const Buttons = ( {buttonDetails, buttonClicked} ) => {
    let i = 0;

    const renderedButtons = buttonDetails.map( button => {
        i = buttonDetails.indexOf(button)
        return (
            <React.Fragment key={i}>
                <Button 
                    text={button.text}
                    i={i}
                    buttonClicked={buttonClicked}
                />
            </React.Fragment>
        )
    })


    return (
        <div className="btn-container">
            {renderedButtons}
        </div>
    )
}

export default Buttons

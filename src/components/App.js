import React, { useState } from 'react';
import './App.css';
import Screen from './screen';
import Buttons from './buttons';
import buttonDetails from './buttonDetails';

const App = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const [memory, setMemory] = useState(0);

  const buttonClicked = ( i ) => {
    if (i.type === "operand") {
      
    }
  }


  return (
    <div className="app-conatiner">
      <Screen />
      <Buttons 
        buttonDetails={buttonDetails}
        buttonClicked={buttonClicked}
        />
      

    </div>
  )
}

export default App;

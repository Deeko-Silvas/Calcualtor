import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Screen from './screen';
import Buttons from './buttons';
import buttonDetails from './buttonDetails';

const App = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const [secondOperand, setSecondOperand] = useState(false);
  const [totalNum, setTotalNum] = useState(0);
  const [operator, setOperator] = useState();
  const [memory, setMemory] = useState(0);

  const isInitialMount = useRef(true);

  const buttonClicked = ( i ) => {
    if (buttonDetails[i].type === "operand") {
      if (secondOperand) {
        setCurrentNum(currentNum + buttonDetails[i].text)
      } else {
        setCurrentNum(buttonDetails[i].text);
        setSecondOperand(true);
      }
    } else if (buttonDetails[i].type === "operator") {
      setTotalNum(currentNum);
      setOperator(buttonDetails[i].out);
      setSecondOperand(false);
    } else if (buttonDetails[i].type === "function") {
      buttonFuncs(buttonDetails[i].out);
      setSecondOperand(false);
    }
  }

  const runOperator = () => {
    setTotalNum()
  }

  const buttonFuncs = ( out ) => {
    switch(out) {
      case "memoryClear":
        setMemory(0);
        break;
      case "memoryRecall":
        setCurrentNum(memory);
        break;
      case "memoryPlus":
        setMemory(memory + Number(currentNum))
        break;
      case "memoryMinus":
        setMemory(memory - Number(currentNum))
        break;
      case "clearLast":
        setCurrentNum(0);
        break;
      case "clearAll":
        setCurrentNum(0);
        setTotalNum(0);
        break;
      case "delete":
        setCurrentNum(parseInt(currentNum / 10))
        break;
      default:
        console.log("default")
    } 
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      runOperator();
    }
  }, [operator])

  return (
    <div className="app-conatiner">
      <Screen 
        currentNum={currentNum}
      />
      <Buttons 
        buttonDetails={buttonDetails}
        buttonClicked={buttonClicked}
        />
      

    </div>
  )
}

export default App;

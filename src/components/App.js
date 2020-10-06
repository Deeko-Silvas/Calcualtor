import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Screen from './screen';
import Buttons from './buttons';
import buttonDetails from './buttonDetails';

const App = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const [secondOperand, setSecondOperand] = useState(false);
  // const [secondOperator, setSecondOperator] = useState(false)
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
      runOperator();
      setOperator(buttonDetails[i].out);
      setSecondOperand(false);
    } else if (buttonDetails[i].type === "function") {
      buttonFuncs(buttonDetails[i].out);
      setSecondOperand(false);
    } else if (buttonDetails[i].type === "equals") {
      runOperator();
    }
  }

  const runOperator = () => {
    if (operator) {
      console.log(operator);
      console.log(totalNum);
      console.log(currentNum);
      switch(operator) {
        case "%":
          console.log("percent");
          break;
        case "sqrt":
          console.log("square root");
          setTotalNum(Math.sqrt(currentNum));
          break;
        case "square":
          console.log("square");
          setTotalNum(Number(currentNum) * Number(currentNum));
          break;
        case "/":
          console.log("divide");
          setTotalNum(Number(totalNum) / Number(currentNum));
          break;
        case "*":
          setTotalNum(Number(totalNum) * Number(currentNum))  
          break;
        case "-":
          setTotalNum(Number(totalNum) - Number(currentNum))  
          break;
        case "+":
          setTotalNum(Number(totalNum) + Number(currentNum))  
          break;
        default:
          console.log("default");
      }
    }
  }

  // const equals = () => {
  //   runOperator();
  // }

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
        setOperator();
        break;
      case "delete":
        setCurrentNum(parseInt(currentNum / 10))
        break;
      case "plusMinus":
        if (Number(currentNum) <= 0) {
          setCurrentNum(Math.abs(currentNum))
        } else {
          setCurrentNum("-" + currentNum);
        }
        break;
      default:
        console.log("default");
    } 
  }

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     runOperator();
  //   }
  // }, [operator])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setCurrentNum(totalNum);
    }
  }, [totalNum])

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

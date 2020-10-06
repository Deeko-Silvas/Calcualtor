import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Screen from './screen';
import Buttons from './buttons';
import buttonDetails from './buttonDetails';

const App = () => {
  const [displayNum, setDisplayNum] = useState("0");
  const [currentNum, setCurrentNum] = useState("0");
  const [incNum, setIncNum] = useState(0);
  const [secondOperand, setSecondOperand] = useState(false);
  const [secondOperator, setSecondOperator] = useState(false);
  const [totalNum, setTotalNum] = useState(0);
  const [operator, setOperator] = useState();
  const [memory, setMemory] = useState(0);
  const [enableDelete, setEnableDelete] = useState(true)

  const isInitialMount = useRef(true);

  const buttonClicked = ( i ) => {
    if (buttonDetails[i].type === "operand") {
      setEnableDelete(true);
      if (secondOperand) {
        setCurrentNum(currentNum + buttonDetails[i].text)
      } else {
        setCurrentNum(buttonDetails[i].text);
        setSecondOperand(true);
        setSecondOperator(false);
      }
    } else if (buttonDetails[i].type === "operator") {
      setEnableDelete(false);
      if (secondOperator) {
        let o = operator + buttonDetails[i].out
        if (o.length > 2) {
          o = o.substring(1);
        }
        setOperator(o)
      } else {
        setTotalNum(currentNum);
        runOperator();
        setOperator(buttonDetails[i].out);
        setSecondOperand(false);
        setSecondOperator(true);
      }
    } else if (buttonDetails[i].type === "function") {
      buttonFuncs(buttonDetails[i].out);
      setSecondOperand(false);
      setSecondOperator(false);
    } else if (buttonDetails[i].type === "equals") {
      setEnableDelete(false)
      runOperator();
      if (!secondOperator) {
        setOperator(null);
        setCurrentNum(0);
        setSecondOperand(false);
      }
    }
  }

  const runOperator = () => {
    if (operator) {
      switch(operator) {
        case "%":
          break;
        case "sqrt":
          setTotalNum(Math.sqrt(currentNum));
          break;
        case "square":
          console.log("square");
          setTotalNum(Number(currentNum) * Number(currentNum));
          break;
        case "/":
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
        case "++":
          checkIncNum();
          setTotalNum(Number(totalNum) + incNum);  
          break;
        case "--":
          checkIncNum();
          setTotalNum(Number(totalNum) - incNum);  
          break;
        case "**":
          checkIncNum();
          if (incNum !== 0) {
            setTotalNum(Number(totalNum) * incNum);  
          }
          break;
        case "//":
          checkIncNum();
          if (incNum !== 0) {
            setTotalNum(Number(totalNum) / incNum);  
          }
          break;
        default:
          //pass
      }
    }
  }
  
  // Check if inc num is set to 0
  const checkIncNum = () => {
    if (incNum === 0) {
      setIncNum(Number(currentNum));
    }
  }

  const buttonFuncs = ( out ) => {
    switch(out) {
      case "memoryClear":
        setMemory(0);
        break;
      case "memoryRecall":
        setCurrentNum(memory)
        break;
      case "memoryPlus":
        setMemory(memory + Number(currentNum))
        break;
      case "memoryMinus":
        setMemory(memory - Number(currentNum))
        break;
      case "clearLast":
        setCurrentNum("0");
        break;
      case "clearAll":
        setCurrentNum("0");
        setTotalNum(0);
        setOperator(null);
        setSecondOperand(false);
        setIncNum(0);
        break;
      case "delete":
        if (enableDelete) {
          setCurrentNum(parseInt(currentNum / 10))
        }
        break;
      case "plusMinus":
        if (Number(currentNum) <= 0) {
          setCurrentNum(Math.abs(currentNum))
        } else {
          setCurrentNum("-" + currentNum)
        }
        break;
      default:
        //pass
    } 
  }

  let splitNum = [];
  let wholeNum

  //Formats number to screen adding commas and decimals
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (currentNum === ".") {
        wholeNum = "0"
      } else {
        splitNum = currentNum.toString().split(".");
        wholeNum = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (wholeNum.length === 0) {
          wholeNum = 0;
        }
      }
      splitNum[1] ? setDisplayNum(wholeNum + "." + splitNum[1]) : setDisplayNum(wholeNum + ".");
    }
  }, [currentNum])

  //Set current number to match total number.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setCurrentNum(totalNum);
    }
  }, [totalNum])



  return (
    <div className="calculator-container">
      <Screen 
        displayNum={displayNum}
      />
      <Buttons 
        buttonDetails={buttonDetails}
        buttonClicked={buttonClicked}
        />
      

    </div>
  )
}

export default App;

import { useReducer } from "react"
import './App.css';
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"





export const ACTIONS = {
  ADD_DIGIT: 'add_digit',
  CHOOSE_OPERATION: 'choose_operation',
  CLEAR: 'clear',
  DELETE: 'delete',
  EQUAL: 'equal'
}



function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) { // Overwrite currentOperand with new number selected after a calculation has complete.
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state // Returning state means to not make changes
      if (payload.digit === "." && state.currentOperand.includes(".")) { // If it includes "." and we are attempting to add "." then return current state.
        return state
       }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) { // What does it do?
        return state
      }
      if (state.currentOperand == null) { // What does it do?
        return {
          ...state,
          operation: payload.operation
        }
      }
      if (state.previousOperand == null) { // Action that changes operation symbol if wrong operation was chosen
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return { // Default action of operation
        ...state, // return state
        previousOperand: equal(state), // taking current and previous operand and combining both by using operation and setting that total as the previousOperand
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {} // (AC) When running AC, we want state to be clear
    
    case ACTIONS.DELETE:
      if (state.overwrite) { // Overwrite curernt state by returning empty state
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) { // If currentOperand does not contain value then return state as empty
        return state
      }
      if (state.currentOperand.length === 1) { // If there is one digit in currentOperand then return empty state 
        return {
          ...state,
          currentOperand: null
        }
      }
      return { // return last digit from currentOperand
         ...state,
         currentOperand: state.currentOperand.slice(0,-1)
      }
    
    
    case ACTIONS.EQUAL:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null ) { // Return nothing if operands do not contain any values.
      }

      return { // (=) If all operands contain values, then complete calculation.
        ...state,
        overwrite: true, // Overwrite currentOperand with new number or operation selected after a calculation has complete.
        previousOperand: null,
        operation: null,
        currentOperand: equal(state),
      }
  }
}

function equal({ currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand) // convert string to number
  const current = parseFloat(currentOperand) // convert string to number
  if (isNaN(prev) || isNaN(current)) return "" // If not a number for previous or not a number for current then return empty string
  let computation = "" // Computation equals to empty string
  switch (operation) { // Defining what each operation symbol is supposed to accomplish
    case "+": // Switch case for adding
      computation = prev + current // Add current and previous values and save calculation within computation
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }
  return computation.toString() // convert number back to string after computation has been completed
}


function App() {
  const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});
  
  return (
    <div class="calculator-grid"> 
      <div className="output">
        <div className="previousOperand">{previousOperand}{operation}</div>

        <div className="currentOperand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}></OperationButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EQUAL })}>=</button>
    </div>
  );
}

export default App;


/*History of calculations
      External file that contains history.
  Error Handling
      Invalid input: can't divide by 0

Class Component

Function Component

Math.js library

Event handling (use state)

***WHAT IS PAYLOAD AND STATE?

*/
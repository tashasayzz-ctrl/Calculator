

// math functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => b===0 ? null: a/b

 // DOM elements
 const display = document.getElementById('display');
 const digitButtons = document.querySelectorAll('.digit');
 const operatorButtons = document.querySelectorAll('.operator');
 const equalsButton = document.getElementById('equals');
 const clearButton = document.getElementById('clear');

 // State variables
 let firstOperand = null;
 let secondOperand = null;
 let currentOperator = null;
 let shouldResetDisplay = false;

// operate function to call the correct math function
 function operate(operator, a, b){
   switch(operator){
    case '+':
        return add(a,b);
    case '-':
        return subtract(a,b);
    case '*':
        return multiply(a,b);
    case '/':
        return divide(a,b);
    default:
        return b;   
   }
 };

 

// Function to update the display
 const updateDisplay = (value) => {
    // If the value is a number, round it to avoid long decimals
    if (typeof value === 'number') {
        value = Math.round(value * 1000) / 1000;
    }
    display.textContent = value;
};


 // Handle digit button clicks
 const handleDigitClick = (event) => {
    const digit = event.target.textContent;
    if (shouldResetDisplay) {
        updateDisplay(digit);
        shouldResetDisplay = false;
    } else if (display.textContent === '0' || display.textContent === 'Error: / by 0') {
        if (digit === '.') {
            updateDisplay('0.');
        } else {
            updateDisplay(digit);
        }
    } else if (digit === '.' && display.textContent.includes('.')) {
        return; // Do nothing if a decimal already exists
    } else {
        updateDisplay(display.textContent + digit);
    }
};

 // Handle operator button clicks
 const handleOperatorClick = (event) => {
    const operator = event.target.textContent;
    const inputValue = parseFloat(display.textContent);

    if (currentOperator && !shouldResetDisplay) {
        secondOperand = inputValue;
        const result = operate(currentOperator, firstOperand, secondOperand);
        updateDisplay(result);
        firstOperand = result;
    } else {
        firstOperand = inputValue;
    }
    
    currentOperator = operator;
    shouldResetDisplay = true;
};

 // Handle equals button click
 const handleEqualsClick = () => {
    if (currentOperator === null) {
        return;
    }
    
    secondOperand = parseFloat(display.textContent);
    const result = operate(currentOperator, firstOperand, secondOperand);
    updateDisplay(result);
    
    // Reset state
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = true;
};

// Handle clear button click
const handleClearClick = () => {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay(0);
};

// Add event listeners
digitButtons.forEach(button => {
    button.addEventListener('click', handleDigitClick);
});

operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

equalsButton.addEventListener('click', handleEqualsClick);
clearButton.addEventListener('click', handleClearClick);

// Initial display update
window.onload = () => updateDisplay(0);
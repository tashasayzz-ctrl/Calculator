let firstNumber = 3;
let operator = "+";
let secondNumber = 5;






function add(a,b){
return a + b 
}

function subtract(a,b){
return a - b
};

function multiply(a, b){
    return a * b
};
 function division(a, b){
    if (b === 0) {
        return "Error: Cannot divide by zero";
      }
    return a / b
 };


 function operate(operator, a, b){
    if (operator === "+") {
        return add(a, b);
      } else if (operator === "-") {
        return subtract(a, b);
      } else if (operator === "*") {
        return multiply(a, b);
      } else if (operator === "/") {
        return divide(a, b);
      } else {
        return "Invalid operator";
      }
 }
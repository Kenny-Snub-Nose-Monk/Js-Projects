const display = document.querySelector(".display h1");
const inputBtns = document.querySelectorAll("button");
const numberBtns = document.querySelectorAll("number");
const operatorBtns = document.querySelectorAll("operator");
const clearBtn = document.querySelector(".clear");
const positive_negative_conversion = document.querySelector(
  ".plus_minus_conversion"
);

let firstNumber = 0;
let operatorValue = "";
let waitforSecondNumber = false;

// display.textContent = firstNumber;
function strip(number) {
  return parseFloat(number);
}

const calculate = {
  "/": (firstNumber, secondNumber) =>
    Number.parseFloat(firstNumber / secondNumber),
  "*": (firstNumber, secondNumber) =>
    Number.parseFloat(firstNumber * secondNumber),
  "+": (firstNumber, secondNumber) =>
    Number.parseFloat(firstNumber + secondNumber),
  "-": (firstNumber, secondNumber) =>
    Number.parseFloat(firstNumber - secondNumber),
  "%": (firstNumber, secondNumber) =>
    Number.parseFloat(firstNumber % secondNumber),
  "=": (firstNumber, secondNumber) => Number.parseFloat(secondNumber),
};

const sendNumberValue = (number) => {
  if (waitforSecondNumber) {
    display.textContent = number;
    waitforSecondNumber = false;
  } else {
    const displayValue = display.textContent;
    display.textContent = displayValue === "0" ? number : displayValue + number;
  }
};

const plus_minus_conversion = () => {
  display.textContent = Number(display.textContent) * -1;
};

const useOperator = (operator) => {
  const currentValue = Number(display.textContent);

  console.log(currentValue);

  // Prevent multiple operators
  if (operatorValue && waitforSecondNumber) {
    operatorValue = operator;
    return;
  }

  // Assign firstValue if no value
  if (!firstNumber && !operatorValue) {
    firstNumber = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstNumber, currentValue);
    display.textContent = calculation;
    firstNumber = calculation;
  }

  //Ready for next value, store operator
  waitforSecondNumber = true;
  operatorValue = operator;
};

const addDecimal = () => {
  // If operator pressed, don't add decimal
  if (!display.textContent.includes(".")) {
    display.textContent = `${display.textContent}.`;
  }
};

//Reset all values, display
function resetAll() {
  firstNumber = 0;
  // operatorValue = "";
  waitforSecondNumber = false;
  display.textContent = "0";
}

//Add Event Listeners for numbers, operators, decimal
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.contains("number")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

//Event Listener
clearBtn.addEventListener("click", resetAll);
positive_negative_conversion.addEventListener("click", plus_minus_conversion);

// Didn't solve
//  Decimal problem
// multiple "=" problem

const display = document.querySelector(".display h1");
const buttons = document.querySelectorAll("button");
let firstValue = "";
let currentValue = "";
let lastOperator = "";
let waitforSecondNumber = false;

function sendNumberValue(number) {
  // display.textContent = number;
  currentValue = display.textContent;

  if (waitforSecondNumber) {
    display.textContent = number;
    waitforSecondNumber = false;
  } else {
    display.textContent = currentValue === "0" ? number : currentValue + number;
  }
}

function calculate(lastValue, currentValue, operator) {
  // if click "=" over 1 time

  if (operator === "=" && !lastOperator) {
    operator = lastOperator;
  }

  if (operator === "+") {
    lastOperator = operator;
    return parseFloat(Number(lastValue) + Number(currentValue));
  } else if (operator === "-") {
    lastOperator = operator;
    return parseFloat(Number(lastValue) - Number(currentValue));
  } else if (operator === "*") {
    lastOperator = operator;
    return parseFloat(Number(lastValue) * Number(currentValue));
  } else if (operator === "/") {
    lastOperator = operator;
    return parseFloat(Number(lastValue) / Number(currentValue));
  } else if (operator === "=") {
    return parseFloat(currentValue);
  }
}

function useOperator(operator) {
  currentValue = display.textContent;

  if (lastOperator && waitforSecondNumber) {
    lastOperator = operator;
    return;
  }

  if (!firstValue && firstValue !== "0") {
    firstValue = currentValue;
  } else {
    // console.log(firstValue);
    // console.log(lastOperator);
    // console.log(currentValue);
    // console.log(operator);

    display.textContent = calculate(firstValue, currentValue, lastOperator);
    firstValue = display.textContent;
  }

  lastOperator = operator;
  waitforSecondNumber = true;
}

function addDecimal() {
  if (!display.textContent.includes(".")) {
    display.textContent = `${display.textContent}.`;
  }
}

function clear() {
  firstValue = 0;
  // operatorValue = "";
  waitforSecondNumber = false;
  display.textContent = "0";
}

function signChange() {
  display.textContent = Number(display.textContent) * -1;
}

function percentage() {
  if (display.textContent === "0") return;

  if (!display.textContent.startsWith("0.")) {
    let dotPosition = 0;
    if (display.textContent.indexOf(".") > 0) {
      dotPosition = display.textContent.indexOf(".") - 2;
    } else {
      dotPosition = display.textContent.length - 2;
    }

    if (dotPosition > 0) {
      display.textContent =
        display.textContent.replace(".", "").slice(0, dotPosition) +
        "." +
        display.textContent.replace(".", "").slice(dotPosition);
    } else {
      display.textContent =
        "0." +
        "0".repeat(Math.abs(dotPosition)) +
        display.textContent.replace(".", "");
    }
  } else {
    display.textContent =
      "0." + "0".repeat(2) + display.textContent.replace("0.", "");
  }
}

// function decimal(number){
//   if (number.indexOf(".") > 0) {
//     return 0.1 ^ (lastValue.length - number.indexOf(".")) ;
//   }
//   return 1
// }

buttons.forEach((button) => {
  if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("number")) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("plus_minus_conversion")) {
    button.addEventListener("click", signChange);
  } else if (button.classList.contains("clear")) {
    button.addEventListener("click", clear);
  } else if (button.classList.contains("percentage")) {
    button.addEventListener("click", percentage);
  } else {
    button.addEventListener("click", addDecimal);
  }
});

document.addEventListener("keydown", (e) => {
  const operatorList = ["+", "-", "*", "/", "="];
  console.log(e);
  if (operatorList.includes(e.key)) {
    useOperator(e.key);
  } else if (e.key.match(/[0-9]/)) {
    sendNumberValue(e.key);
  } else if (e.key === "Delete" || e.key === "Backspace") {
    clear();
  } else if (e.key === ".") {
    percentage();
  }
});

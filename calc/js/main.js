import { resetAllBtn, resetSomeBtn, actions, equalBtn, result, numbers } from './view.js';
let resultValue = result.textContent;

let firstNum;
let secondNum;
let operator = '+';

const checkSize = () => {
  if (String(resultValue).length >= 10) {
    result.style.fontSize = '46px';
    result.style.lineHeight = '46px';
  } else if (String(resultValue).length >= 7) {
    result.style.fontSize = '64px';
    result.style.lineHeight = '64px';
  } else {
    result.style.fontSize = '96px';
    result.style.lineHeight = '96px';
  }
};

const showResult = () => {
  result.textContent = resultValue;
};

numbers.forEach(item => {
  item.addEventListener('click', () => {
    let number = item.getAttribute('data-value');
    if (result.textContent[0] == 0) {
      resultValue = result.textContent.slice(1, result.textContent.length);
    }
    resultValue += number;
    checkSize();
    showResult();
  });
});


resetAllBtn.addEventListener('click', () => {
  resultValue = 0;
  result.textContent = 0;
});


resetSomeBtn.addEventListener('click', () => {
  resultValue = String(resultValue).slice(0, -1);
  result.textContent = String(result.textContent).slice(0, -1);
  checkSize();
});

actions.addEventListener('click', (e) => {
  firstNum = +resultValue;
  secondNum = 0;
  let action = e.target.getAttribute('id');
  if (action == 'divider' || action == 'minus' || action == 'plus' || action == 'times') {
    result.textContent = 0;
  }
  switch (action) {
    case 'divider':
      operator = '/';
      break;
    case 'minus':
      operator = '-';
      break;
    case 'plus':
      operator = '+';
      break;
    case 'times':
      operator = '*';
      break;
  }
});


function calc(a, b, operator) {
  if (a === undefined || b === undefined || operator === undefined) {
    return "Error";
  }
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case ":":
    case "/":
      if (b == 0) {
        return "You cannot divide by zero";
      }

      return a / b;
    case "^":
      return a ^ b;
    case "%":
      return a % b;
    default:
      return "unknown operation";
  }
}

equalBtn.addEventListener('click', () => {
  secondNum = +resultValue;
  resultValue = +calc(firstNum, secondNum, operator).toFixed(5);
  checkSize();
  showResult();
});

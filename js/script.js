class Calculator {
  constructor() {
    this.DOMElements = {
      calculator: document.querySelector('.calculator'),
      screen: document.querySelector('[data-screen]'),
      keys: document.querySelector('.keys'),
    };
  }

  initialApp() {
    this.addEventsListener();
  }

  addEventsListener() {
    this.DOMElements.keys.addEventListener('click', (e) => {
      const curr = e.target;
      const currValue = e.target.textContent;
      const { type } = curr.dataset;
      const screenValue = this.DOMElements.screen.textContent;
      const { previousKeyType } = this.DOMElements.calculator.dataset;

      if (type === 'number') this.screenUpdate(currValue, previousKeyType);
      if (type === 'negation') this.DOMElements.screen.textContent *= -1;
      if (
        type === 'decimal' &&
        !this.DOMElements.screen.textContent.includes('.')
      ) {
        this.DOMElements.screen.textContent += currValue;
      }

      if (type === 'C') this.removeAllDigits(curr);
      if (type === 'back') this.removeLastDigit();

      if (type === 'oneArgOperator') this.oneArgumentOperation(curr);
      if (type === 'twoArgsOperator') {
        this.addActiveClass(curr);
        this.DOMElements.calculator.dataset.firstNumber = screenValue;
        this.DOMElements.calculator.dataset.operator = curr.dataset.sign;
      }

      if (type === 'equal') {
        const { operator, firstNumber } = this.DOMElements.calculator.dataset;
        this.twoArgumentsOperation(firstNumber, screenValue, operator);
      }

      this.DOMElements.calculator.dataset.previousKeyType = type;
    });
  }

  screenUpdate(value, prevKey) {
    if (this.DOMElements.screen.textContent === 'Domain!') {
      this.DOMElements.screen.textContent = value;
      this.DOMElements.screen.style.color = '#fff';
    } else if (
      this.DOMElements.screen.textContent === '0' ||
      prevKey === 'twoArgsOperator'
    ) {
      this.DOMElements.screen.textContent = value;
    } else {
      this.DOMElements.screen.textContent += value;
    }
  }

  domainWarning() {
    this.DOMElements.screen.style.color = '#ad1010';
    this.DOMElements.screen.textContent = 'Domain!';
  }

  removeAllDigits(current) {
    this.addActiveClass(current);
    this.DOMElements.calculator.dataset.firstNumber = '';
    this.DOMElements.calculator.dataset.operator = '';
    this.DOMElements.screen.textContent = 0;
  }

  removeLastDigit() {
    const arrNumber = this.DOMElements.screen.textContent.toString().split('');
    arrNumber.pop();
    arrNumber.length === 0
      ? (this.DOMElements.screen.textContent = 0)
      : (this.DOMElements.screen.textContent = arrNumber.join(''));
  }

  oneArgumentOperation(current) {
    this.addActiveClass(current);
    const { sign } = current.dataset;
    if (sign === 'percent') this.percentOperation();
    if (sign === 'reciprocal') this.reciprocalOperation();
    if (sign === 'power') this.powerOperation();
    if (sign === 'sqrt') this.sqrtOperation();
  }

  twoArgumentsOperation(num1, num2, operator) {
    if (operator === 'divide') this.divideOperation(num1, num2);
    if (operator === 'times') this.timesOperation(num1, num2);
    if (operator === 'minus') this.minusOperation(num1, num2);
    if (operator === 'plus') this.plusOperation(num1, num2);
  }

  addActiveClass(current) {
    const operatorKeys = this.DOMElements.keys.querySelectorAll(
      '.special-sign'
    );
    operatorKeys.forEach((operator) => {
      operator.classList.remove('active');
    });
    current.classList.add('active');
  }

  percentOperation() {
    this.DOMElements.screen.textContent =
      +this.DOMElements.screen.textContent / 100;
  }

  reciprocalOperation() {
    +this.DOMElements.screen.textContent === 0
      ? this.domainWarning()
      : (this.DOMElements.screen.textContent =
          1 / +this.DOMElements.screen.textContent);
  }

  powerOperation() {
    this.DOMElements.screen.textContent =
      (+this.DOMElements.screen.textContent) ** 2;
  }

  sqrtOperation() {
    +this.DOMElements.screen.textContent <= 0
      ? this.domainWarning()
      : (this.DOMElements.screen.textContent = Math.sqrt(
          +this.DOMElements.screen.textContent,
          2
        ));
  }

  divideOperation(num1, num2) {
    num2 == 0
      ? this.domainWarning(num2)
      : (this.DOMElements.screen.textContent = num1 / num2);
  }

  timesOperation(num1, num2) {
    this.DOMElements.screen.textContent = num1 * num2;
  }

  minusOperation(num1, num2) {
    this.DOMElements.screen.textContent = num1 - num2;
  }

  plusOperation(num1, num2) {
    this.DOMElements.screen.textContent = +num1 + +num2;
  }
}

const calculator = new Calculator();
calculator.initialApp();

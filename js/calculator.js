export class Calculator {
  constructor(elements) {
    this._elements = elements
  }

  initialApp() {
    this.addEventsListener()
  }

  addEventsListener() {
    this._elements.keys.addEventListener('click', (e) => {
      const curr = e.target
      const currValue = e.target.textContent
      const { type } = curr.dataset
      const screenValue = this._elements.screen.textContent
      const { previousKeyType } = this._elements.calculator.dataset

      if (type === 'number') this.screenUpdate(currValue, previousKeyType)
      if (type === 'negation') this._elements.screen.textContent *= -1
      if (
        type === 'decimal' &&
        !this._elements.screen.textContent.includes('.')
      ) {
        this._elements.screen.textContent += currValue
      }

      if (type === 'C') this.removeAllDigits(curr)
      if (type === 'back') this.removeLastDigit()

      if (type === 'oneArgOperator') this.oneArgumentOperation(curr)
      if (type === 'twoArgsOperator') {
        this.addActiveClass(curr)
        this._elements.calculator.dataset.firstNumber = screenValue
        this._elements.calculator.dataset.operator = curr.dataset.sign
      }

      if (type === 'equal') {
        const { operator, firstNumber } = this._elements.calculator.dataset
        this.twoArgumentsOperation(firstNumber, screenValue, operator)
      }

      this._elements.calculator.dataset.previousKeyType = type
    })
  }

  screenUpdate(value, prevKey) {
    if (this._elements.screen.textContent === 'Domain!') {
      this._elements.screen.textContent = value
      this._elements.screen.style.color = '#fff'
    } else if (
      this._elements.screen.textContent === '0' ||
      prevKey === 'twoArgsOperator'
    ) {
      this._elements.screen.textContent = value
    } else {
      this._elements.screen.textContent += value
    }
  }

  domainWarning() {
    this._elements.screen.style.color = '#ad1010'
    this._elements.screen.textContent = 'Domain!'
  }

  removeAllDigits(current) {
    this.addActiveClass(current)
    this._elements.calculator.dataset.firstNumber = ''
    this._elements.calculator.dataset.operator = ''
    this._elements.screen.textContent = 0
  }

  removeLastDigit() {
    const arrNumber = this._elements.screen.textContent.toString().split('')
    arrNumber.pop()
    arrNumber.length === 0
      ? (this._elements.screen.textContent = 0)
      : (this._elements.screen.textContent = arrNumber.join(''))
  }

  oneArgumentOperation(current) {
    this.addActiveClass(current)
    const { sign } = current.dataset
    if (sign === 'percent') this.percentOperation()
    if (sign === 'reciprocal') this.reciprocalOperation()
    if (sign === 'power') this.powerOperation()
    if (sign === 'sqrt') this.sqrtOperation()
  }

  twoArgumentsOperation(num1, num2, operator) {
    if (operator === 'divide') this.divideOperation(num1, num2)
    if (operator === 'times') this.timesOperation(num1, num2)
    if (operator === 'minus') this.minusOperation(num1, num2)
    if (operator === 'plus') this.plusOperation(num1, num2)
  }

  addActiveClass(current) {
    const operatorKeys = this._elements.keys.querySelectorAll('.special-sign')
    operatorKeys.forEach((operator) => {
      operator.classList.remove('active')
    })
    current.classList.add('active')
  }

  percentOperation() {
    this._elements.screen.textContent = +this._elements.screen.textContent / 100
  }

  reciprocalOperation() {
    ;+this._elements.screen.textContent === 0
      ? this.domainWarning()
      : (this._elements.screen.textContent =
          1 / +this._elements.screen.textContent)
  }

  powerOperation() {
    this._elements.screen.textContent =
      (+this._elements.screen.textContent) ** 2
  }

  sqrtOperation() {
    ;+this._elements.screen.textContent <= 0
      ? this.domainWarning()
      : (this._elements.screen.textContent = Math.sqrt(
          +this._elements.screen.textContent,
          2
        ))
  }

  divideOperation(num1, num2) {
    num2 == 0
      ? this.domainWarning(num2)
      : (this._elements.screen.textContent = num1 / num2)
  }

  timesOperation(num1, num2) {
    this._elements.screen.textContent = num1 * num2
  }

  minusOperation(num1, num2) {
    this._elements.screen.textContent = num1 - num2
  }

  plusOperation(num1, num2) {
    this._elements.screen.textContent = +num1 + +num2
  }
}

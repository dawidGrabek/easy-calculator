import { Calculator } from './calculator.js'
import { DOMElements } from './DOMElements.js'

window.onload = () => {
  const calculator = new Calculator(DOMElements)
  calculator.initialApp()
}

export const adding = (a, b) => {
  return a + b
}

class Calculator {
  /**
   * @param {DOMElement} app
   * @param {String} id
   * @returns {DOMElement}
   */
  constructor (app, id) {
    this.appContainer = app
    this.id = id
    this.clear()
    this.display()
    return app
  }
  display () {
    this.appContainer.addEventListener('click', function (event) {
      this.input = this.appContainer.querySelector('.display')
      this.input.setAttribute('id', 'input' + this.uppId)
      this.inputId = this.input.getAttribute('id')
      this.screen = this.appContainer.querySelector('#' + this.inputId)
      // if the clicked button is a number, display its value on the screen and consider it as a current number
      if (event.target.classList.contains('num')) {
        this.screen.value += event.target.value
        this.currentNum = this.screen.value
        console.log(' now =  ' + this.currentNum)
      }
      // if the clicked button is an operator, save the current number or the old given result as a previous number
      if (event.target.classList.contains('operator')) {
        this.operation = event.target.id
        this.operations()
        if (isNaN(this.resulte)) {
          this.prevNum = this.currentNum
          this.currentNum = ' '
        } else {
          this.prevNum = this.resulte
        }
        this.screen.value = this.currentNum
        console.log('old   ' + this.prevNum + '  new   ' + this.currentNum)
      }
      // if the clicked button is 'equals' display the resulte on the screen
      if (event.target.classList.contains('equals')) {
        this.operations()
        this.screen.value = this.resulte
      }
    }.bind(this))
  }
  // when the 'AC' button is clicked,it resets the calculator
  clear () {
    this.appContainer.querySelector('.clear').addEventListener('click', function (event) {
      this.currentNum = ''
      this.screen.value = ''
      this.prevNum = ''
      this.resulte = NaN
    }.bind(this))
  }

  operations () {
    const prev = parseFloat(this.prevNum)
    const current = parseFloat(this.currentNum)
    // cant perform the operations unless you have both values
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case 'plus':
        this.resulte = prev + current
        break

      case 'minus':
        this.resulte = prev - current
        break
      case 'times':
        this.resulte = prev * current
        break

      case 'divided-by':
        this.resulte = prev / current
        break
      default:
        return
    }
    this.prevNum = this.resulte
    this.screen.value = ''
    this.currentNum = ' '
  }
}

module.exports = Calculator

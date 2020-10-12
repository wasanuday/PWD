const a = require('./AppWindow')
const Chat = require('./Chat')
const Game = require('./MemoryGame')
const Calculator = require('./Calculator')
let id = 0
var appContainer = document.createElement('div')
appContainer.setAttribute('class', 'appContainer')

window.$(document).ready(function () {
  document.getElementById('btn1').onclick = function () {
    window.$(appContainer).load('imports/memoryGame.html', function () {
      appContainer.setAttribute('id', id++)
      let icon = document.querySelector('#btn1').cloneNode(true)
      a.CreateWindow(icon, new Game(appContainer.cloneNode(true)))
    })
  }
})
window.$(document).ready(function () {
  document.getElementById('btn2').onclick = function () {
    window.$(appContainer).load('imports/chat.html', function () {
      appContainer.setAttribute('id', id++)
      let icon = document.querySelector('#btn2').cloneNode(true)
      a.CreateWindow(icon, new Chat(appContainer.cloneNode(true), id++))
    })
  }
})
window.$(document).ready(function () {
  document.getElementById('btn3').onclick = function () {
    window.$(appContainer).load('imports/calculator.html', function () {
      appContainer.setAttribute('id', id++)
      let icon = document.querySelector('#btn3').cloneNode(true)
      let app = new Calculator(appContainer.cloneNode(true), id++)
      a.CreateWindow(icon, app)
    })
  }
})

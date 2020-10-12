let winId = 0
let containerId = 0
let closeId = 0
let iconId = 0
let windowContainerId = 0
let maxZIndex = 1
/**
 *
 * @param {DOMElement} icon
 * @param {object} app
 *  this method is used to add app in the window and add the clicked icon in the upper bar of the window
 */
module.exports.CreateWindow = function (icon, app) {
  let windowContainer = document.createElement('div')
  windowContainer.setAttribute('class', 'windowContainer')
  window.$(document).ready(function () {
    window.$(document.body).append(window.$(windowContainer).load('imports/appwindow.html', function () {
      setIds()
      document.querySelector('#' + iconId).appendChild(icon)
      window.$('#' + containerId).append(app)
      dragDiv(winId)
      closeApp(closeId, windowContainerId)
      getFocus(document.getElementById(winId))
    }))
  })
}
/**
 *  Assign id to each div element
 */
function setIds () {
  const windowContainer = document.querySelectorAll('.windowContainer')
  const win = document.querySelectorAll('.windowDiv')
  const close = document.querySelectorAll('.close')
  const container = document.querySelectorAll('.container')
  const icon = document.querySelectorAll('.icon')
  for (var i = 0; i < win.length; i++) {
    windowContainer[i].setAttribute('id', 'windowContainer' + i)
    if (win !== undefined) {
      win[i].setAttribute('id', 'windowDiv' + i)
      close[i].setAttribute('id', 'close' + i)
      container[i].setAttribute('id', 'container' + i)
      icon[i].setAttribute('id', 'icon' + i)
      windowContainerId = windowContainer[i].getAttribute('id')
      winId = win[i].getAttribute('id')
      containerId = container[i].getAttribute('id')
      closeId = close[i].getAttribute('id')
      iconId = icon[i].getAttribute('id')
      console.log(win[i] + 'inside')
    }
  }

  console.log(winId + '   id')
  document.getElementById(winId).style.top = i * 40 + 'px'
  document.getElementById(winId).style.left = i * 60 + 'px'
}
/**
 * Function for drag and move the windows
 * @param {String} id
 */
function dragDiv (id) {
  function dragStart (event) {
    event.dataTransfer.setData('id', event.target.id)
    const style = window.getComputedStyle(event.target, null)
    event.dataTransfer.setData('text/plain',
      (parseInt(style.getPropertyValue('left'), 10) - event.clientX) + ',' +
   (parseInt(style.getPropertyValue('top'), 10) - event.clientY))
  }
  function dragOver (event) {
    event.preventDefault()
  }
  function drop (event) {
    const div = document.querySelector('#' + event.dataTransfer.getData('id'))
    topWin(div)
    const offset = event.dataTransfer.getData('text/plain').split(',')
    div.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px'
    div.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px'
  }
  document.addEventListener('dragstart', dragStart, false)
  document.addEventListener('drop', drop, false)
  document.addEventListener('dragover', dragOver, false)
}

/**
 * If remove icon is clicked, the window will be removed
 * @param {String} iconId
 * @param {String} appWinId
 */
function closeApp (iconId, appWinId) {
  document.querySelector('#' + iconId).onclick = function () {
    let divApp = document.getElementById(appWinId)
    document.body.removeChild(divApp)
    console.log('divid ' + divApp.id)
  }
}
/**
 * The window with focus shall be on top of all other windows
 */
function getFocus (appWin) {
  let divApp = document.querySelector('#' + appWin.id)
  divApp.onclick = function () {
    topWin(appWin)
  }
}

/**
 * When clicking a div, z-index value is incremented
 */
function topWin (appWin) {
  maxZIndex += 1
  appWin.style.zIndex = maxZIndex
}

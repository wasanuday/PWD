// Based on implementation from: https://www.youtube.com/watch?v=8Mt0Buk3rK0
class MemoryGame {
  /**
   * @param {DOMElement} app
   * @returns {DOMElement}
   */
  constructor (app) {
    this.appContainer = app
    this.tiles = []
    this.click1 = false
    this.turn1 = 0
    this.turn2 = 0
    this.img1 = null
    this.img2 = null
    this.pairs = 0
    this.choseGameLevel()
    return app
  }

  /**
   *clone template and display the cards based on the geven numbers of columns and rows
   * @param {number} rows
   * @param {number} cols
   */
  playGame (rows, cols) {
    this.shuffle(rows, cols)
    let tmp = this.appContainer.getElementsByTagName('template')[0]
    var $template = window.$('#template')
    $template.prop('content')
    let tmpDiv = tmp.content.cloneNode(false)
    this.tiles.forEach(function (tile, index) {
      tile = tmp.content.cloneNode(true)
      tile.firstElementChild.firstElementChild.setAttribute('brickNum', index)
      tmpDiv.appendChild(tile)
      if ((index + 1) % cols === 0) {
        tmpDiv.appendChild(document.createElement('br'))
      }
    })
    this.click()
    this.handleKeys()
    this.appContainer.querySelectorAll('#bricks')[0].appendChild(tmpDiv)
  }
  /** compare if the the first clicked image is the same the scond one , remove both */
  click () {
    this.appContainer.querySelectorAll('#bricks')[0].addEventListener('click', function (event) {
      event.preventDefault()
      let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      let index = img.getAttribute('brickNum')
      img.src = 'image/' + this.tiles[index] + '.png'
      setTimeout(function () {
        img.src = '../image/0.png'
      }, 600)
      if (this.click1 === false) {
        this.turn1 = this.tiles[index]
        this.click1 = true
        img.src = 'image/' + this.turn1 + '.png'
        this.img1 = img
      } else {
        this.turn2 = this.tiles[index]
        img.src = 'image/' + this.turn2 + '.png'
        this.img2 = img
        this.click1 = false
      }
      if (this.turn1 === this.turn2 && this.img1.getAttribute('brickNum') !== this.img2.getAttribute('brickNum')) {
        console.log('pair ')
        setTimeout(function () {
          this.img1.classList.add('removed')
          this.img2.classList.add('removed')
          this.pairs += 1
          if (this.pairs === this.tiles.length / 2) {
            console.log('win')
          }
        }.bind(this), 600)
      }
    }.bind(this))
  }

  /**
   * add the given numbers of columns and rows to the array
   * @param {number} rows
   * @param {number} cols
   */
  shuffle (rows, cols) {
    let i
    for (i = 1; i <= (rows * cols) / 2; i++) {
      this.tiles.push(i)
      this.tiles.push(i)
    }
    // Randomize array
    for (let i = this.tiles.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1))
      let temporaryValue = this.tiles[i]
      this.tiles[i] = this.tiles[randomIndex]
      this.tiles[randomIndex] = temporaryValue
    }
  }
  /**
    Extra feature for choosing the game level
   */
  choseGameLevel () {
    this.appContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('level2')) {
        this.appContainer.querySelector('.selection').classList.add('removed')
        this.playGame(4, 4)
      }
      if (event.target.classList.contains('level1')) {
        this.appContainer.querySelector('.selection').classList.add('removed')
        this.playGame(2, 2)
      }
    }.bind(this))
  }
  /**
   * play the game with left and right arrow keys */
  handleKeys () {
    this.appContainer.querySelectorAll('#bricks')[0].addEventListener('keydown', function (e) {
      this.currSelected = e.target
      this.currSelected.focus()
      this.currSelected.firstElementChild.classList.add('currSelected')
      if (e.keyCode === 39) {
        if (this.currSelected.nextElementSibling.nodeName === 'BR' && this.currSelected.nextElementSibling.nextElementSibling !== null) {
          this.currSelected.firstElementChild.classList.remove('currSelected')
          this.currSelected = this.currSelected.nextElementSibling.nextElementSibling
          this.currSelected.focus()
          this.currSelected.firstElementChild.classList.add('currSelected')
        } else if (this.currSelected.nextElementSibling.nodeName === 'A') {
          this.currSelected.firstElementChild.classList.remove('currSelected')
          this.currSelected = this.currSelected.nextElementSibling
          this.currSelected.focus()
          this.currSelected.firstElementChild.classList.add('currSelected')
        } else { this.currSelected.focus() }
      } else if (e.keyCode === 37) {
        if (e.target.previousElementSibling.nodeName === 'BR' && this.currSelected.previousElementSibling.previousElementSibling !== null) {
          this.currSelected.firstElementChild.classList.remove('currSelected')
          this.currSelected = this.currSelected.previousElementSibling.previousElementSibling
          this.currSelected.focus()
          this.currSelected.firstElementChild.classList.add('currSelected')
        } else if (this.currSelected.previousElementSibling.nodeName === 'A') {
          this.currSelected.firstElementChild.classList.remove('currSelected')
          this.currSelected = this.currSelected.previousElementSibling
          this.currSelected.focus()
          this.currSelected.firstElementChild.classList.add('currSelected')
        } else { this.currSelected.focus() }
      }
    }.bind(this))
  }
}
module.exports = MemoryGame

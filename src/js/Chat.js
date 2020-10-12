class Chat {
  /**
   * @param {DOMElement} app
   * @param {String} id
   * @returns {DOMElement}
   */
  constructor (app, id) {
    this.chatApp = app
    this.uppId = id
    this.socket = null
    this.author = null
    this.setIds()
    this.editUserName()
    this.sendMessage()
    // When the application is opened for the first time, add your name.
    if (window.localStorage.getItem('message') === null && window.localStorage.getItem('user') === null) {
      this.addUsername()
    }
    this.getMessagesList()
    return app
  }
  connect () {
    return new Promise(function (resolve, reject) {
      if (this.socket && this.socket.readyState === 1) {
        resolve(this.socket)
        return
      }
      this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
      this.socket.addEventListener('open', function () {
        resolve(this.socket)
      }.bind(this))
      this.socket.addEventListener('error', function () {
        reject(new Error('can not connect'))
      })
      this.socket.addEventListener('message', function (event) {
        this.showMessage(JSON.parse(event.data))
        this.saveMessages()
      }.bind(this))
    }.bind(this))
  }
  /**
   * when the enter key is pressed, Connect socket and send the massege content
   */
  sendMessage () {
    this.chatApp.querySelector('.message-area').addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        let obj = {
          type: 'message',
          data: event.target.value,
          username: JSON.parse(window.localStorage.getItem('user')),
          channel: '',
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }
        event.target.value = ''
        event.preventDefault()
        this.connect().then(function (socket) {
          socket.send(JSON.stringify(obj))
        }).catch(function (error) {
          console.log(error)
        })
      }
    }.bind(this))
  }
  /**
   * display the message content in the cloned template
   * @param {Object} message
   */
  showMessage (message) {
    this.temp = this.chatApp.getElementsByTagName('template')[0]
    this.messageDiv = this.temp.content.cloneNode(true)
    this.author = this.messageDiv.querySelectorAll('.user')[0].textContent = message.username
    this.text = this.messageDiv.querySelectorAll('.text')[0].textContent = message.data
    this.date = this.messageDiv.querySelectorAll('.date')[0].textContent = new Date().toDateString().substring(0, 3) + ' ' +
    new Date().toLocaleTimeString('en-US').substring(0, 4) + ' ' +
    new Date().toLocaleTimeString('en-US').substring(8, 11)
    this.chatApp.querySelectorAll('.messages')[0].appendChild(this.messageDiv)
  }

  addUsername () {
    this.chatApp.querySelector('#' + this.chatDivId).classList.add('hidden')
    this.chatApp.querySelector('#' + this.userDivId).classList.remove('hidden')
    this.chatApp.querySelector('#' + this.btnId).addEventListener('click', function (event) {
      if (document.getElementById(this.usernameId).value.length > 0) {
        window.localStorage.setItem('user', JSON.stringify(document.getElementById(this.usernameId).value))
        console.log('mmm ' + this.chatApp.querySelector('#' + this.userDivId).getAttribute('class'))
        document.querySelector('#' + this.chatDivId).classList.remove('hidden')
        document.querySelector('#' + this.userDivId).classList.add('hidden')
      }
    }.bind(this))
  }

  saveMessages () {
    const result = {
      allUsers: this.author,
      text: this.text,
      date: this.date
    }
    // get
    let messages = []
    const retrievedData = window.localStorage.getItem('message')
    if (retrievedData !== null) {
      messages = JSON.parse(retrievedData)
    }
    // add
    messages.push(result)
    window.localStorage.setItem('message', JSON.stringify(messages))
  }
  // display the 20 latest messages
  getMessagesList () {
    let messagesList = JSON.parse(window.localStorage.getItem('message'))
    if (window.localStorage.getItem('message') === null) { return }
    messagesList.slice(0, 20)
    for (let i = 0; i < messagesList.length; i++) {
      let temp = this.chatApp.getElementsByTagName('template')[0]
      this.messageDiv = temp.content.cloneNode(true)
      this.messageDiv.querySelectorAll('.user')[0].textContent = messagesList[i].allUsers
      this.messageDiv.querySelectorAll('.text')[0].textContent = messagesList[i].text
      this.messageDiv.querySelectorAll('.date')[0].textContent = messagesList[i].date
      this.chatApp.querySelectorAll('.messages')[0].appendChild(this.messageDiv)
    }
  }
  editUserName () {
    this.chatApp.querySelector('#edit').addEventListener('click', function (event) {
      this.addUsername()
      this.getMessagesList()
    }.bind(this))
  }
  setIds () {
    this.btn = this.chatApp.querySelector('.submit')
    this.username = this.chatApp.querySelector('.username')
    this.userDiv = this.chatApp.querySelector('.userInput')
    this.chatDiv = this.chatApp.querySelector('.chatDiv')

    this.btn.setAttribute('id', 'submit' + this.uppId)
    this.username.setAttribute('id', 'username' + this.uppId)
    this.userDiv.setAttribute('id', 'userDiv' + this.uppId)

    this.chatDiv.setAttribute('id', 'chatDiv' + this.uppId)
    this.userDivId = this.userDiv.getAttribute('id')
    this.btnId = this.btn.getAttribute('id')
    this.usernameId = this.username.getAttribute('id')
    this.chatDivId = this.chatDiv.getAttribute('id')
  }
}
module.exports = Chat

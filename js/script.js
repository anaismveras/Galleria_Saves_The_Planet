const game = document.getElementById('canvas')
const trashPoints = document.getElementById('trash')
const timeGame = document.getElementById('time')
const startGame = document.getElementById('startButton')
const inscrtuions = document.getElementById('status')
const ctx = game.getContext('2d')

game.setAttribute('width', 300)
game.setAttribute('height', 150)
ctx.width = game.width
ctx.height = game.height
let trashArray = []

//game loop
const gameLoop = () => {
    ctx.clearRect(0, 0, 750, 300)
    if (beachGoer.alive && garbage.alive) {
        beachGoer.render()
        garbage.render()
    }
    galleria.render()
}

function gameStart() {
    inscrtuions.innerText = ` `
    gameTimer()
    gameLoop()
}

// timer to go down after instructions
function gameTimer () {
    let timeMinute = 1;
    let timeSecond = 30
    let displayedSeconds = String(timeSecond)
    let timerForGame = setInterval(() => {
        displayedSeconds = String(timeSecond)
        if (timeSecond == 00) {
            timeSecond = 60
            displayedSeconds = "00"
        }  
        if (timeSecond == 59) {
            timeMinute--     
        }
        if (displayedSeconds.length == 1) {
            displayedSeconds = '0' + displayedSeconds
        }
        if (timeMinute === 0 && displayedSeconds == 00) {
            clearInterval(timerForGame)
        }
        timeGame.innerText = `Time: ${timeMinute}:${displayedSeconds}`
        timeSecond--
    }, 1000)
}

// getting Galleria on the board 
function heroRender (x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.height = height
    this.width = width
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
let galleria = new heroRender(250, 50, '#FFFFFF', 10, 30)
// console.log('this is hero', galleria)
const galleriaMovement = (e) => {
    switch(e.keyCode) {
        case (38): 
        galleria.y -= 10
        if (galleria.y <= 0) {
            galleria.y = 0
        }
        break 
        case (40):
        galleria.y += 10
        if (galleria.y + galleria.height >= ctx.height) {
            galleria.y = ctx.height - galleria.height
        }
        break
    }
}

function trashRender (x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.height = height
    this.width = width
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
let garbage = new trashRender(10, 10, 'red', 10, 10)

// Galleria Movement


function beachGoersRender (x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.height = height
    this.width = width
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
let beachGoer = new beachGoersRender(10, 70, 'lightgreen', 20, 40)


let stop = () => {clearInterval(gameInterval)}

document.addEventListener('keydown', galleriaMovement)
let gameInterval = setInterval(gameLoop, 70)
startGame.addEventListener('click', gameStart)

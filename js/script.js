const game = document.getElementById('canvas')
const trashPoints = document.getElementById('trash')
const timeGame = document.getElementById('time')
const startGame = document.getElementById('startButton')
const inscrtuions = document.getElementById('status')
const ctx = game.getContext('2d')



function gameStart() {
    inscrtuions.innerText = `Move Galleria up and down to help her pick up trash and avoid hitting the Beach Goers before time runs out`
    setTimeout(gameLoop, 5000)
}

// timmer to go down after instructions
// let timeMinute = 1;
// let timeSecond = 30
// setInterval(() => {
//     timeGame.innerText = `${timeMinute}:${timeSecond}`
//     timeSecond--
//     if (timeSecond == 00) {
//         timeMinute--
//         timeSecond = 60
//         if(timeMinute == 0) {
//             timeMinute = 1
//         }
//     }
// }, 1000)

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
let garbage = new trashRender(100, 10, 'red', 10, 10)

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
let beachGoer = new beachGoersRender(100, 70, 'lightgreen', 20, 40)

//game loop
const gameLoop = () => {
    ctx.clearRect(0, 0, 750, 300)
    if (beachGoer.alive && garbage.alive) {
        beachGoer.render()
        garbage.render()
    }
    galleria.render()
}

let stop = () => {clearInterval(gameInterval)}

let gameInterval = setInterval(gameLoop, 70)
startGame.addEventListener('click', gameStart)


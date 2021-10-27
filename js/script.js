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
ctx.minY = game.height + 5
ctx.maxY = game.height - 5
let trashArray = []
let beachGoerArray = []
let points = 0

//game loop
const gameLoop = () => {
    ctx.clearRect(0, 0, 750, 300)
    trashArray.forEach((trashitem) => {
        trashitem.render()
        trashitem.x += 3
        ditectTrashHit()
    })
    trashPoints.innerText = `Trash: ${points}/40`
    galleria.render()
    inscrtuions.innerText = ' '
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
        // moves her upward
        galleria.y -= 10
        // prevents her from going off canvas-up
        if (galleria.y <= 0) {
            galleria.y = 0
        }
        break 
        case (40):
        // moves her downwards
        galleria.y += 10
        // prevents her from going off canvas-down
        if (galleria.y + galleria.height >= ctx.height) {
            galleria.y = ctx.height - galleria.height
        }
        break
    }
}

function Trash (x, y, color, width, height) {
    this.x = x
    this.y = y
    this.height = height
    this.color = color
    this.width = width
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const createTrash = () => {
    let generateRandomY = Math.floor(Math.random() * ctx.height)
    let garbage = new Trash(1, generateRandomY, 'red', 10, 20)
    if (garbage.y <=0) {
        garbage.y = 0
    }
    if (garbage.y + garbage.height >= ctx.height) {
        garbage.y = ctx.height - garbage.height
    }
    trashArray.push(garbage)
    console.log(trashArray)
}
const trashInterval = setInterval(createTrash, 2500)

const ditectTrashHit = () => {
    for(let i = 0; i < trashArray.length; i++) {
        if (galleria.x < trashArray[i].x + trashArray[i].width &&
            galleria.x + galleria.width > trashArray[i].x && 
            galleria.y < trashArray[i].y + trashArray[i].height &&
            galleria.y + galleria.height > trashArray[i].y) {
                trashArray[i].alive = false 
                if (trashArray[i].alive === false) {
                    trashArray.splice(i, 1)
                    points++
                }
        }
    }
}


// BeachGoer Movement
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
let gameInterval = () => {setInterval(gameLoop, 70)}
startGame.addEventListener('click', gameInterval)

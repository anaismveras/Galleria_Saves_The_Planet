const game = document.getElementById('canvas')
const trashPoints = document.getElementById('trash')
const timeGame = document.getElementById('time')
const startGame = document.getElementById('startButton')
const resetGame = document.getElementById('resetButton')
const inscrtuions = document.getElementById('status')
const winningh3 = document.getElementById('winning')
const losingh3 = document.getElementById('losing')
winningh3.style.display = 'none'
losingh3.style.display = 'none'
let timerForGame 
let gameInterval

const ctx = game.getContext('2d')

game.setAttribute('width', 300)
game.setAttribute('height', 150)
ctx.width = game.width
ctx.height = game.height
let trashArray = []
let beachGoerArray = []
let points = 0

const beachGoerImage = new Image()
beachGoerImage.src = '/css/images/beachGoer.png'
const trashImage = new Image()
trashImage.src = '/css/images/soda_cup.png' 

//game loop
const gameLoop = () => {
    ctx.clearRect(0, 0, 750, 300)
    winningConditions()
    losingConditions()
    trashArray.forEach((trashitem) => {
        trashitem.render()
        if (timeGame.innerText >= 'Time: 0:45') {
            trashitem.x += 3
        } else {
            trashitem.x += 7
        } 
        ditectTrashHit()
        // trashAwayFromBeachGoer()
    })
    beachGoerArray.forEach((beachPerson) => {
        beachPerson.render()
        if (timeGame.innerText > 'Time: 0:45') {
            beachPerson.x += 3
        } else {
            beachPerson.x += 7
        }
        ditectBeachGoerHit()
    })
    trashPoints.innerText = `Trash: ${points}/30`
    galleria.render()
    inscrtuions.innerText = ''
}


// timer to go down after instructions
function gameTimer () {
    let timeMinute = 1;
    let timeSecond = 30
    let displayedSeconds = String(timeSecond)
    timerForGame = setInterval(() => {
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
        // console.log(timeGame.innerText)
    }, 1000)
}

//creating Galleria player
function Galleria (x, y, color, width, height) {
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
let galleria = new Galleria(250, 50, '#FFFFFF', 10, 30)

// movement for Galleria
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

// creating a trash and letting it slide into the screen at random y-axis
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
}
const trashInterval = 
    setInterval(createTrash, 6000)
    if (timeGame.innerText >= 'Time: 0:45') {
        setInterval(createTrash, 4000)
    } else {
        setInterval(createTrash, 2000)
    } 

// BeachGoer Movement
function BeachGoer (x, y, color, width, height) {
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

const createBeachGoer = () => {
    let generateRandomY = Math.floor(Math.random() * ctx.height)
    let beachGoers = new BeachGoer(1, generateRandomY,'lightgreen', 20, 30)
    if (beachGoers.y <=0) {
        beachGoers.y = 0
    }
    if (beachGoers.y + beachGoers.height >= ctx.height) {
        beachGoers.y = ctx.height - beachGoers.height
    }
    beachGoerArray.push(beachGoers)
}
const beachGoerInterval = 
    setInterval(createBeachGoer, 2500)
    if (timeGame.innerText >= 'Time: 0:45') {
        setInterval(createBeachGoer, 2000)
    } else {
        setInterval(createBeachGoer, 2000)
    } 

// detecting if trash is hit than one point will add to trash points
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

// detecting if beachGoers are hit than points will minus trash points
const ditectBeachGoerHit = () => {
    for(let i = 0; i < beachGoerArray.length; i++) {
        if (galleria.x < beachGoerArray[i].x + beachGoerArray[i].width &&
            galleria.x + galleria.width > beachGoerArray[i].x && 
            galleria.y < beachGoerArray[i].y + beachGoerArray[i].height &&
            galleria.y + galleria.height > beachGoerArray[i].y) {
                beachGoerArray[i].alive = false 
            if (beachGoerArray[i].alive === false) {
                beachGoerArray.splice(i, 1)
                if (points >= 2) {
                    points--
                    points--
                } else if (points == 1) {
                    points--
                }
            }
        }
    }
}

// if (trashArray.x !== beachGoerArray.x 
//     || trashArray.y !== beachGoerArray.y
//     || trashArray.y + trashArray.height !== beachGoerArray.y + beachGoerArray.height
//     || trashArray.x + trashArray.width !== beachGoerArray.x + beachGoerArray.width
//     || trashArray.x + trashArray.height + trashArray.y + trashArray.height) {
//         console.log('they can keep going')
// } else {
//     let keepGoing = 0
//     for(let i = 0; i < trashArray.length; i++) {
//         if (beachGoerArray[i].x < trashArray[i].x + trashArray[i].width &&
//             beachGoerArray[i].x + beachGoerArray[i].width > trashArray[i].x && 
//             beachGoerArray[i].y < trashArray[i].y + trashArray[i].height &&
//             beachGoerArray[i].y + beachGoerArray[i].height > trashArray[i].y) {
//                 console.log('they are connected')
//                 break
//             } else {
//                 keepGoing++
//                 console.log('this is keepGoing:', keepGoing)
//             if (keepGoing === trashArray.x !== beachGoerArray.x 
//                 || trashArray.y !== beachGoerArray.y
//                 || trashArray.y + trashArray.height !== beachGoerArray.y + beachGoerArray.height
//                 || trashArray.x + trashArray.width !== beachGoerArray.x + beachGoerArray.width
//                 || trashArray.x + trashArray.height + trashArray.y + trashArray.height) {
//                     console.log('they can keep going2')
//             }
//         }
//     }
// }


function winningConditions () {
    if (points == 30) {
        clearInterval(gameInterval)
        clearInterval(timerForGame)
        winningh3.style.display = "block"

    }
}

function losingConditions () {
    if (timeGame.innerText == `Time: 0:00`) {
        clearInterval(gameInterval)
        losingh3.style.display = "block"
    }
}

document.addEventListener('keydown', galleriaMovement)
startGame.addEventListener('click', () => {
    gameTimer()
    gameInterval = setInterval(gameLoop, 70)
})
resetGame.addEventListener('click', ()=> {
    window.location.reload()
})

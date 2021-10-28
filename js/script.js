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

// Game Sounds
function sound(src) {
    this.sound = document.createElement('audio')
    this.sound.src = src
    this.sound.setAttribute('preload', 'auto')
    this.sound.setAttribute('controls', 'none')
    this.sound.style.display = 'none'
    document.body.appendChild(this.sound)
    this.play = function() {
        this.sound.play()
    }
    this.stop = function() {
        this.sound.pause()
    }
}

trashSound = new sound('/css/sounds/trashbag_throw.mp3')
beachGoerHit = new sound('/css/sounds/beachGoer_Yelling_Ouch.mp3')
gameMusic = new sound('css/sounds/gameMusi.mp3')
losingSound = new sound('css/sounds/loseSound.mp3')
winingSound = new sound('css/sounds/winSound.mp3')

//game loop
const gameLoop = () => {
    ctx.clearRect(0, 0, 750, 300)
    winningConditions()
    losingConditions()
    gameMusic.play()
    trashArray.forEach((trashitem) => {
        trashitem.render()
        if (timeGame.innerText >= 'Time: 0:45') {
            trashitem.x += 3
        } else {
            trashitem.x += 7
        } 
        ditectTrashHit()
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

const galleriaImage = new Image()
    galleriaImage.src = ('/css/images/galleria.png')

//creating Galleria player
function Galleria (url, x, y, width, height) {
    this.url = url
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.alive = true
    this.render = function() {
        ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
    }
}
let galleria = new Galleria(galleriaImage ,250, 50, 20, 30)

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
    
    const trashImage = new Image()
    trashImage.src = ('/css/images/soda_cup.png') 

    function Trash (url, x, y, width, height) {
        this.url = url
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.alive = true
        this.render = function() {
            ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
        }
    }
    
    // creating a trash and letting it slide into the screen at random y-axis
    const createTrash = () => {
        let generateRandomY = Math.floor(Math.random() * ctx.height)
        let garbage = new Trash(trashImage, 1, generateRandomY, 10, 20)
        if (garbage.y <=0) {
            garbage.y = 0
        }
        if (garbage.y + garbage.height >= ctx.height) {
            garbage.y = ctx.height - garbage.height
        }
        // the following line will only run after passing findEmptySpot on garbage and trashArray and garbage and beachGoerArray
        if (findEmptySpot(garbage, trashArray) && findEmptySpot(garbage, beachGoerArray)) {
            trashArray.push(garbage)
        }
    }
    const trashInterval = 
    setInterval(createTrash, 6000)
    if (timeGame.innerText >= 'Time: 0:45') {
        setInterval(createTrash, 4000)
    } else {
        setInterval(createTrash, 2000)
    } 
    
    const findEmptySpot = (thing, thingArr) => {
        // thing will be either trash or beachGoer
        // findEmptySpot runs if trash can be created
        // findEmptySpot checks x & y width and height of beachGoers and trash
        // returns if spot is empty, returns false is spot is full
        // when calling fineEmptySpot an ex. is like this:
        // findEmptySpot(garbage, beachGoer)
        // or like this fidnEmptySport(garbage, trashArray)
        // of like this findEmptySport (beachGoer, beachGoerArray)
        for(let i = 0; i < thingArr.length; i++) {
            if (thing.x < thingArr[i].x + thingArr[i].width &&
                thing.x + thing.width > thingArr[i].x && 
                thing.y < thingArr[i].y + thingArr[i].height &&
                thing.y + thing.height > thingArr[i].y) {
                    return false 
                }

            }
            return true
    }


    const beachGoerImage = new Image()
    beachGoerImage.src = ('/css/images/beachGoer.png')

    // BeachGoer Movement
    function BeachGoer (url, x, y, width, height) {
        this.url = url
        this.x = x
        this.y = y
        this.height = height
    this.width = width
    this.alive = true
    this.render = function() {
        ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
    }
}

const createBeachGoer = () => {
    let generateRandomY = Math.floor(Math.random() * ctx.height)
    let beachGoers = new BeachGoer(beachGoerImage, 1, generateRandomY, 30, 40)
    if (beachGoers.y <=0) {
        beachGoers.y = 0
    }
    if (beachGoers.y + beachGoers.height >= ctx.height) {
        beachGoers.y = ctx.height - beachGoers.height
    }
    // the line below will only run after calling findEmptySpot on beachGoerArray and BeachGoer and trashArray
    if (findEmptySpot(beachGoers, trashArray) && findEmptySpot(beachGoers, beachGoerArray)) {
        beachGoerArray.push(beachGoers)
    }
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
                    trashSound.play()
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
                beachGoerHit.play()
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

function winningConditions () {
    if (points == 30) {
        clearInterval(gameInterval)
        clearInterval(timerForGame)
        winningh3.style.display = "block"
        winingSound.play()
    }
}

function losingConditions () {
    if (timeGame.innerText == `Time: 0:00`) {
        clearInterval(gameInterval)
        losingh3.style.display = "block"
        losingSound.play()
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

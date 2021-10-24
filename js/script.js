const game = document.getElementById('canvas')
const trashPoints = document.getElementById('trash')
const timeGame = document.getElementById('time')
const ctx = game.getContext('2d')

function hero (x, y, color, width, height) {
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
let galleria = new hero(10, 10, '#FFFFFF', 20, 100)
console.log('this is hero', galleria)


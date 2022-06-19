const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const score = document.querySelector("#score")
const level = document.querySelector("#level")
const gameOver = document.querySelector("#gameOver")
const restart = document.querySelector("#restart")
const themeSound = document.querySelector("#theme")
const jumpSound = document.querySelector("#jump")
const deathSound = document.querySelector("#death")

// loop sound
if (typeof themeSound.loop == "boolean") {
    themeSound.loop = true
} else {
    themeSound.addEventListener("ended", () => {
        this.currentTime = 0
        this.play
    }, false)
}
themeSound.play()

// jump
const jump = () => {
    mario.classList.add("jump")
    jumpSound.play()

    setTimeout(() => {
        mario.classList.remove("jump")
    }, 500)
}

// score
let intervalScore = null
let playerScore = 0
const scoreCounter = () => {
    playerScore++
    score.innerHTML = `Score <b>${playerScore}</b>`
    pipe.style.animation = "pipe-animation "+`${2-(Math.floor(playerScore/50)/5)}`+"s infinite linear"
    level.innerHTML = "Level "+`${Math.floor(playerScore/50)+1}`
}
intervalScore = setInterval(scoreCounter, 300)

// loop of game
const loopGame = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = parseInt(window
        .getComputedStyle(mario)
        .bottom.replace("px", ""))

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = "none"
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = "none"
        mario.style.bottom = `${marioPosition}px`

        mario.src = "img/over.png"
        themeSound.pause()
        deathSound.play()
        clearInterval(intervalScore)

        level.style.display = "none"
        gameOver.style.display = "block"
        restart.style.display = "block"
        mario.style.width = "75px"
        mario.style.marginLeft = "45px"

        clearInterval(loopGame)
    }
}, 10)

document.addEventListener("keydown", jump)
document.addEventListener("click", jump)
document.addEventListener("touchstart", jump)
// Battle
const battleBackgroundImg = new Image()
const draggleImg = new Image()
const embyImg = new Image()
battleBackgroundImg.src = './img/battleBackground.png'
draggleImg.src = './img/draggleSprite.png'
embyImg.src = './img/embySprite.png'

// Setup battle background image
const battleBackground = new Sprite({
  image: battleBackgroundImg,
  position: {
    x: 0,
    y: 0
  }
})

// Setup battle character images
const draggle = new Sprite({
  animate: true,
  frames: { max: 4, hold: 30 },
  image: draggleImg,
  isEnemy: true,
  name: 'Draggle',
  position: {
    x: 800,
    y: 100
  }
})

const emby = new Sprite({
  animate: true,
  frames: { max: 4, hold: 30 },
  image: embyImg,
  name: 'Emby',
  position: {
    x: 280,
    y: 330
  }
})

const renderedSprites = [
  battleBackground,
  draggle,
  emby
]

// Battle sequence animation
const animateBattle = () => {
  window.requestAnimationFrame(animateBattle)
  renderedSprites.forEach((sprite) => sprite.draw())
}

animateBattle()

// Queue of Draggle's attacks
const queue = []

// Event listeners for attacks
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    const selectedAttack = e.target.innerHTML
    emby.attack({
      attack: attacks[selectedAttack],
      recipient: draggle,
      renderedSprites
    })

    queue.push(() => {
      draggle.attack({
        attack: attacks.Tackle,
        recipient: emby,
        renderedSprites
      })
    })
  })
})

// Event listener on dialog box
document.querySelector('#dialogBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    // Run function at first element of queue
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})

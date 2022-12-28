// Background img
const battleBackgroundImg = new Image()
battleBackgroundImg.src = './img/battleBackground.png'

// Setup battle background image
const battleBackground = new Sprite({
  image: battleBackgroundImg,
  position: {
    x: 0,
    y: 0
  }
})

// Setup battle character images
const draggle = new Monster(monsters.Draggle)
const emby = new Monster(monsters.Emby)

const renderedSprites = [
  battleBackground,
  draggle,
  emby
]

// Populate attack box with character attacks
emby.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)
})

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

    const randomAttack =
      draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

    queue.push(() => {
      draggle.attack({
        attack: randomAttack,
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

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

// Characters
let draggle
let emby
let renderedSprites
// Used to stop the battle when a character faints
let battleAnimationId
// Queue of Draggle's attacks
let queue

// Run at the beginning of each battle
const initBattle = () => {
  // Display user interface properly
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  // Setup characters images
  draggle = new Monster(monsters.Draggle)
  emby = new Monster(monsters.Emby)
  renderedSprites = [battleBackground, draggle, emby]
  queue = []

  // Populate attack box with character attacks
  emby.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })

  // Event listeners for attacks
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const selectedAttack = e.target.innerHTML
      emby.attack({
        attack: attacks[selectedAttack],
        recipient: draggle,
        renderedSprites
      })

      // Check if draggle has fainted
      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint()
        })
        queue.push(() => {
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete() {
              // Go back to map
              cancelAnimationFrame(battleAnimationId)
              document.querySelector('#userInterface').style.display = 'none'
              gsap.to('#overlappingDiv', {
                opacity: 0
              })
              battle.initiated = false
              animate()
            }
          })
        })
        return
      }

      // Enemy's (draggle) attacks
      const randomAttack =
        draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites
        })
      })

      // Check if emby has fainted
      if (emby.health <= 0) {
        queue.push(() => {
          emby.faint()
        })
        queue.push(() => {
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete() {
              // Go back to map
              cancelAnimationFrame(battleAnimationId)
              document.querySelector('#userInterface').style.display = 'none'
              gsap.to('#overlappingDiv', {
                opacity: 0
              })
              battle.initiated = false
              animate()
            }
          })
        })
        return
      }
    })

    // Display attack type
    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.target.innerHTML]
      document.querySelector('#attackType').innerHTML = selectedAttack.type
      document.querySelector('#attackType').style.color = selectedAttack.color
    })
  })
}

// Battle sequence animation
const animateBattle = () => {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  renderedSprites.forEach((sprite) => sprite.draw())
}

initBattle()
animateBattle()

// Event listener on dialog box
document.querySelector('#dialogBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    // Run function at first element of queue
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})

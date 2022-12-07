// Canvas setup
const canvas = document.querySelector('canvas')
const CANVAS_WIDTH = 1024
const CANVAS_HEIGHT = 576
const STEP_SPEED = 8
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
const context = canvas.getContext('2d')

// Get images
const playerUpImg = new Image()
const playerDownImg = new Image()
const playerLeftImg = new Image()
const playerRightImg = new Image()
const backgroundImg = new Image()
const foregroundImg = new Image()
playerUpImg.src = './img/playerUp.png'
playerDownImg.src = './img/playerDown.png'
playerLeftImg.src = './img/playerLeft.png'
playerRightImg.src = './img/playerRight.png'
backgroundImg.src = './img/pokemonMap.png'
foregroundImg.src = './img/foregroundObjects.png'

// Create and use collisions map
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70))
}

const boundaries = []

const backgroundOffset = {
  x: -1100,
  y: -760
}

collisionsMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.height + backgroundOffset.x,
            y: i * Boundary.width + backgroundOffset.y
          }
        })
      )
    }
  })
})

// Setup background image
const background = new Sprite({
  image: backgroundImg,
  position: {
    x: backgroundOffset.x,
    y: backgroundOffset.y
  }
})

// Setup foreground objects image
const foreground = new Sprite({
  image: foregroundImg,
  position: {
    x: backgroundOffset.x - 4,
    y: backgroundOffset.y
  }
})

// Setup player image
const player = new Sprite({
  frames: { max: 4 },
  image: playerDownImg,
  position: {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 - BLOCK / 2
  },
  sprites: {
    up: playerUpImg,
    down: playerDownImg,
    left: playerLeftImg,
    right: playerRightImg
  }
})

// Setup keys that will be pressed
const keys = {
  w: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  a: { pressed: false }
}
let lastKeyPressed = ''

// Elements that will move with pressed keys
const movables = [
  background,
  foreground,
  ...boundaries
]

// This tests collision between 2 elements
const rectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  )
}

// Main animation
const animate = () => {
  window.requestAnimationFrame(animate)
  background.draw()
  boundaries.forEach((boundary) => {
    boundary.draw()
  })
  player.draw()
  foreground.draw()

  let moving = true
  player.moving = false

  if (keys.w.pressed && lastKeyPressed === 'w') {
    player.moving = true
    player.image = player.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + STEP_SPEED
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    if (moving) movables.forEach((item) => item.position.y += STEP_SPEED)
  }
  else if (keys.s.pressed && lastKeyPressed === 's') {
    player.moving = true
    player.image = player.sprites.down
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - STEP_SPEED
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    if (moving) movables.forEach((item) => item.position.y -= STEP_SPEED)
  }
  else if (keys.d.pressed && lastKeyPressed === 'd') {
    player.moving = true
    player.image = player.sprites.right
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - STEP_SPEED,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    if (moving) movables.forEach((item) => item.position.x -= STEP_SPEED)
  }
  else if (keys.a.pressed && lastKeyPressed === 'a') {
    player.moving = true
    player.image = player.sprites.left
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + STEP_SPEED,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    if (moving) movables.forEach((item) => item.position.x += STEP_SPEED)
  }
}

animate()

// Get pressed keys
window.addEventListener('keydown', (e) => {
  if (e.key === 'w' || e.key === 's' || e.key === 'd' || e.key === 'a') {
    keys[e.key].pressed = true
    lastKeyPressed = e.key
  }
})

window.addEventListener('keyup', (e) => {
  if (e.key === 'w' || e.key === 's' || e.key === 'd' || e.key === 'a') keys[e.key].pressed = false
})

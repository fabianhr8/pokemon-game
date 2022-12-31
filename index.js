// Canvas setup
const canvas = document.querySelector('canvas')
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
const context = canvas.getContext('2d')

// Create and use collisions map
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70))
}

const boundaries = []

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

// Create and use battle zones map
const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, i + 70))
}

const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element === 1025) {
      battleZones.push(
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
  ...boundaries,
  ...battleZones
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

const battle = {
  initiated: false
}

// Main animation
const animate = () => {
  const animationId = window.requestAnimationFrame(animate)
  background.draw()
  boundaries.forEach((boundary) => {
    boundary.draw()
  })
  battleZones.forEach((battleZone) => {
    battleZone.draw()
  })
  player.draw()
  foreground.draw()

  player.animate = false

  if (battle.initiated) return

  // Activate battle
  if (keys.w.pressed || keys.s.pressed || keys.d.pressed || keys.a.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
        Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
        Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({ rectangle1: player, rectangle2: battleZone }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.02
      ) {
        battle.initiated = true

        // Cancel current animation loop
        window.cancelAnimationFrame(animationId)

        // Play battle initiated music
        audio.map.stop()
        audio.initBattle.play()
        audio.battle.play()

        // Animation
        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // Activate new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })
          }
        })

        break
      }
    }
  }

  // let moving = true

// Check for collision with boundaries
  if (keys.w.pressed && lastKeyPressed === 'w') movement('up')
  else if (keys.s.pressed && lastKeyPressed === 's') movement('down')
  else if (keys.d.pressed && lastKeyPressed === 'd') movement('right')
  else if (keys.a.pressed && lastKeyPressed === 'a') movement('left')
}

animate()

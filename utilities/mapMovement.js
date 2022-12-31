const movement = (direction) => {
  let moving = true
  player.animate = true
  player.image = player.sprites[direction]
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]

    const nextPosition = {
      up: {
        x: boundary.position.x,
        y: boundary.position.y + STEP_SPEED
      },
      down: {
        x: boundary.position.x,
        y: boundary.position.y - STEP_SPEED
      },
      right: {
        x: boundary.position.x - STEP_SPEED,
        y: boundary.position.y
      },
      left: {
        x: boundary.position.x + STEP_SPEED,
        y: boundary.position.y
      }
    }

    // Check if player collides with boundaries
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: nextPosition[direction]
        }
      })
    ) {
      moving = false
      break
    }
  }

  // Move images
  if (moving) movables.forEach((item) => {
    switch(direction) {
      case 'up':
        item.position.y += STEP_SPEED
        break;
      case 'down':
        item.position.y -= STEP_SPEED
        break;
      case 'right':
        item.position.x -= STEP_SPEED
        break;
      case 'left':
        item.position.x += STEP_SPEED
        break;
    }
  })
}

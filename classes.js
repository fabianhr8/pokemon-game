const BLOCK = 48

// Render images
class Sprite {
  constructor({
    animate = false,
    frames = { max: 1, hold: 10 },
    image,
    isEnemy = false,
    position,
    sprites = {}
  }) {
    this.frames = { ...frames, val: 0, elapsed: 0 }
    this.image = image
    this.position = position

    this.image.onload = () => {
        this.height = this.image.height
        this.width = this.image.width / this.frames.max
    }
    this.animate = animate
    this.sprites = sprites
    this.opacity = 1
    this.health = 100
    this.isEnemy = isEnemy
  }

  draw() {
    context.save()          // Everething between this and restore() is used only here, not globally
    context.globalAlpha = this.opacity
    context.drawImage(
      this.image,
      // crop position, with and height
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      // rendering coordinates, width and height
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
    context.restore()

    // this will only happen for player img
    if (!this.animate && this.frames.max > 1) return
    if (this.frames.max > 1) this.frames.elapsed++
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }

  attack({ attack, recipient }) {
    const timeline = gsap.timeline()

    this.health -= attack.damage

    let movementDistance = 20
    let healthBar = '#enemyHealthBar'
    if (this.isEnemy) {
      movementDistance *= -1
      healthBar = '#playerHealthBar'
    }

    timeline.to(this.position, {
      x: this.position.x - movementDistance
    }).to(this.position, {
      x: this.position.x + movementDistance,
      duration: 0.1,
      onComplete: () => {
        // Here's where enemy actually gets hit
        gsap.to(healthBar, {
          width: this.health + '%'
        })

        gsap.to(recipient.position, {
          x: recipient.position.x + 10,
          yoyo: true,
          repeat: 5,
          duration: 0.1
        })

        gsap.to(recipient, {
          opacity: 0,
          repeat: 5,
          yoyo: true,
          duration: 0.1
        })
      }
    }).to(this.position, {
      x: this.position.x
    })
  }
}

// Create individual boundary element
class Boundary {
  static height = BLOCK
  static width = BLOCK
  constructor ({ position }){
    this.position = position
    this.height = BLOCK
    this.width = BLOCK
  }

  draw() {
    context.fillStyle = 'rgba(255, 0, 0, 0)'
    context.fillRect(this.position.x, this.position.y, this.height, this.width)
  }
}

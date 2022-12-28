const BLOCK = 48

// Render images
class Sprite {
  constructor({
    animate = false,
    frames = { max: 1, hold: 10 },
    image,
    position,
    rotation = 0,
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
    this.rotation = rotation
  }

  draw() {
    context.save()          // Everething between this and restore() is used only here, not globally
    // This will move point to center of img and rotate it
    context.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    context.rotate(this.rotation)
    context.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )

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
}

// Create a monster
class Monster extends Sprite {
  constructor({
    animate = false,
    attacks,
    frames = { max: 1, hold: 10 },
    image,
    isEnemy = false,
    name,
    position,
    rotation = 0,
    sprites = {}
  }) {
    super({
      animate,
      frames,
      image,
      position,
      rotation,
      sprites
    })
    this.attacks = attacks
    this.health = 100
    this.isEnemy = isEnemy
    this.name = name
  }

  attack({ attack, recipient, renderedSprites }) {
    // Display text in dialog box
    document.querySelector('#dialogBox').style.display = 'block'
    document.querySelector('#dialogBox').innerHTML = `${this.name} used ${attack.name}`

    this.health -= attack.damage
    let healthBar = '#enemyHealthBar'
    let rotation = 1
    if (this.isEnemy) {
      healthBar = '#playerHealthBar'
      rotation = -2.2
    }

    switch(attack.name) {
      case 'Fireball':
        const fireballImg = new Image()
        fireballImg.src = './img/fireball.png'
        const fireball = new Sprite({
          animate: true,
          frames: { max: 4, hold: 10 },
          image: fireballImg,
          position: {
            x: this.position.x,
            y: this.position.y
          },
          rotation
        })
        renderedSprites.splice(2, 0, fireball)

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
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
            renderedSprites.splice(2, 1)
          }
        })
      break

      case 'Tackle':
        const timeline = gsap.timeline()
        let movementDistance = 20
        if (this.isEnemy) movementDistance *= -1

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
      break
    }
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

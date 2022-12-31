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

    recipient.health -= attack.damage
    let healthBar = '#enemyHealthBar'
    let rotation = 1
    if (this.isEnemy) {
      healthBar = '#playerHealthBar'
      rotation = -2.2
    }

    switch(attack.name) {
      case 'Fireball':
        audio.initFireball.play()
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
            audio.fireballHit.play()
            gsap.to(healthBar, {
              width: recipient.health + '%'
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
            audio.tackleHit.play()
            gsap.to(healthBar, {
              width: recipient.health + '%'
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

  faint() {
    // Display "fainted" message
    document.querySelector('#dialogBox').innerHTML = `${this.name} fainted!`
    gsap.to(this.position, {
      y: this.position.y + 20
    })
    gsap.to(this, {
      opacity: 0
    })
    gsap.to(this.position, {
      x: this.position.x,
      y: this.position.y
    })
    audio.battle.stop()
    audio.victory.play()
  }
}

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
    this.image = new Image()
    this.position = position

    this.image.onload = () => {
        this.height = this.image.height
        this.width = this.image.width / this.frames.max
    }

    this.image.src = image.src
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

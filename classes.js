const BLOCK = 48

// Render images
class Sprite {
  constructor({
    animate = false,
    frames = { max: 1, hold: 10 },
    image,
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
  }

  draw() {
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

    // this will only happen for player img
    if (!this.animate && this.frames.max > 1) return
    if (this.frames.max > 1) this.frames.elapsed++
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
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
    context.fillStyle = 'rgba(255, 0, 0, 0.8)'
    context.fillRect(this.position.x, this.position.y, this.height, this.width)
  }
}

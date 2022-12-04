const BLOCK = 48

// Render images
class Sprite {
  constructor({ frames = { max: 1 }, image, position, velocity }) {
    this.frames = frames
    this.image = image
    this.position = position

    this.image.onload = () => {
        this.height = this.image.height
        this.width = this.image.width / this.frames.max
    }
  }

  draw() {
    context.drawImage(
      this.image,
      // crop position, with and height
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      // rendering coordinates, width and height
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
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
    context.fillStyle = 'rgba(255, 0, 0, 1)'
    context.fillRect(this.position.x, this.position.y, this.height, this.width)
  }
}

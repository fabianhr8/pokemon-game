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

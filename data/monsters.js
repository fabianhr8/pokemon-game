const embyImg = new Image()
const draggleImg = new Image()
draggleImg.src = './img/draggleSprite.png'
embyImg.src = './img/embySprite.png'

const monsters = {
  Emby: {
    animate: true,
    attacks: [attacks.Tackle, attacks.Fireball],
    frames: { max: 4, hold: 30 },
    image: embyImg,
    name: 'Emby',
    position: {
      x: 280,
      y: 330
    }
  },
  Draggle: {
    animate: true,
    attacks: [attacks.Tackle],
    frames: { max: 4, hold: 30 },
    image: draggleImg,
    isEnemy: true,
    name: 'Draggle',
    position: {
      x: 800,
      y: 100
    }
  }
}

const monsters = {
  Emby: {
    animate: true,
    attacks: [attacks.Tackle, attacks.Fireball],
    frames: { max: 4, hold: 30 },
    image: {
      src: './img/embySprite.png'
    },
    name: 'Emby',
    position: {
      x: 280,
      y: 330
    }
  },
  Draggle: {
    animate: true,
    attacks: [attacks.Tackle, attacks.Fireball],
    frames: { max: 4, hold: 30 },
    image: {
      src: './img/draggleSprite.png'
    },
    isEnemy: true,
    name: 'Draggle',
    position: {
      x: 800,
      y: 100
    }
  }
}

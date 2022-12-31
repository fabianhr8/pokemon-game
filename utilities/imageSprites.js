// Get images
const playerUpImg = new Image()
const playerDownImg = new Image()
const playerLeftImg = new Image()
const playerRightImg = new Image()
const backgroundImg = new Image()
const foregroundImg = new Image()
playerUpImg.src = './img/playerUp.png'
playerDownImg.src = './img/playerDown.png'
playerLeftImg.src = './img/playerLeft.png'
playerRightImg.src = './img/playerRight.png'
backgroundImg.src = './img/pokemonMap.png'
foregroundImg.src = './img/foregroundObjects.png'

const backgroundOffset = {
  x: -1100,
  y: -760
}

// Setup background image
const background = new Sprite({
  image: backgroundImg,
  position: {
    x: backgroundOffset.x,
    y: backgroundOffset.y
  }
})

// Setup foreground objects image
const foreground = new Sprite({
  image: foregroundImg,
  position: {
    x: backgroundOffset.x - 4,
    y: backgroundOffset.y
  }
})

// Setup player image
const player = new Sprite({
  frames: { max: 4, hold: 10 },
  image: playerDownImg,
  position: {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 - BLOCK / 2
  },
  sprites: {
    up: playerUpImg,
    down: playerDownImg,
    left: playerLeftImg,
    right: playerRightImg
  }
})

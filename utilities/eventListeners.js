// Get pressed keys
window.addEventListener('keydown', (e) => {
  if (e.key === 'w' || e.key === 's' || e.key === 'd' || e.key === 'a') {
    keys[e.key].pressed = true
    lastKeyPressed = e.key
  }
})

window.addEventListener('keyup', (e) => {
  if (e.key === 'w' || e.key === 's' || e.key === 'd' || e.key === 'a') keys[e.key].pressed = false
})

// Start map audio
let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.map.play()
    clicked = true
  }
})

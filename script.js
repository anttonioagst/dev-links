function toggleMode() {
  const html = document.documentElement
  html.classList.toggle('light')

  //pegar img
  const img = document.querySelector("#profile img")

  //substituição da imagem
  if (html.classList.contains('light')) {
    img.setAttribute("src", "./assets/assets/avatar-light.png")
  } else {
    img.setAttribute("src", "./assets/assets/Avatar.png")
  }
}

// Event listener para compatibilidade com Safari/iOS
document.addEventListener('DOMContentLoaded', () => {
  const switchElement = document.querySelector('#switch')

  if (switchElement) {
    // Escuta o evento de clique (mouse)
    switchElement.addEventListener('click', toggleMode)

    // Escuta o evento de toque (mobile/iOS)
    switchElement.addEventListener('touchend', (e) => {
      e.preventDefault()
      toggleMode()
    })
  }
})

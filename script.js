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

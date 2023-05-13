document.addEventListener("DOMContentLoaded", function() {
  var toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener("click", toggleTheme);

  // Restaurar el tema desde el almacenamiento local al cargar la página
  var theme = localStorage.getItem("theme");
  if (theme) {
    var themeLink = document.getElementById("theme");
    themeLink.setAttribute("href", theme);
  }
});

function toggleTheme() {
  var themeLink = document.getElementById("theme");
  var currentTheme = themeLink.getAttribute("href");
  var newTheme = (currentTheme === "light.css") ? "dark.css" : "light.css";
  themeLink.setAttribute("href", newTheme);
  
  // Guardar el tema actual en el almacenamiento local
  localStorage.setItem("theme", newTheme);
}

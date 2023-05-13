document.addEventListener("DOMContentLoaded", function() {
  // Tu código aquí
  var toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener("click", toggleTheme);
});


function toggleTheme() {
	var theme = document.getElementById("theme");
	console.log("Ejecuta!");
	if (theme.getAttribute("href") == "light.css") {
		console.log("Ejecuta1!");
		theme.setAttribute("href", "dark.css");
	} else {
		theme.setAttribute("href", "light.css");
		console.log("Ejecuta2!");

	}
}

document.addEventListener("DOMContentLoaded", function() {
  // Tu código aquí
  var toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener("click", toggleTheme);
});


function toggleTheme() {
	var theme = document.getElementById("theme");
	if (theme.getAttribute("href") == "light.css") {
		theme.setAttribute("href", "dark.css");
	} else {
		theme.setAttribute("href", "light.css");
	}
}

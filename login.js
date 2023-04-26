const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = form.elements.username.value;
  const password = form.elements.password.value;
  if (username === 'usuario' && password === 'tu_contraseña') {
    window.location.href = 'https://github.com/Hackdarkyeh/paginadiscord/blob/main/inicio.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = form.elements.username.value;
  const password = form.elements.password.value;
  if (username === 'tu_usuario' && password === 'tu_contraseña') {
    window.location.href = 'https://tusitio.github.io/pagina-secreta';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});

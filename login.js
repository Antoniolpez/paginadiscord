document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = form.elements.usuario.value;
    const password = form.elements.password.value;
    if (username === 'tu_usuario' && password === 'tu_contraseña') {
      window.location.href = 'https://hackdarkyeh.github.io/paginadiscord/inicio.html';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });
});


const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Formulario enviado'); // Agrega esta línea para ver si se ejecuta este evento
  const username = form.elements.usuario.value;
  const password = form.elements.contraseña.value;
  console.log(username, password); // Agrega esta línea para ver los valores de usuario y contraseña
  if (username === 'usuario' && password === 'tu_contraseña') {
    console.log('Ingreso correcto'); // Agrega esta línea para ver si se ejecuta este evento
    window.location.href = 'https://github.com/Hackdarkyeh/paginadiscord/blob/main/inicio.html';
  } else {
    console.log('Ingreso incorrecto'); // Agrega esta línea para ver si se ejecuta este evento
    alert('Usuario o contraseña incorrectos');
  }
});

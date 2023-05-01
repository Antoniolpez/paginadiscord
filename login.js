document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  let intentos = 0;
  let tiempo = 0;
  let intervalo = null;
  const mensaje = document.querySelector('#mensaje');
  const contador = document.createElement('span');
  contador.innerText = '00:00';
  mensaje.appendChild(contador);
  const tiempoRestante = document.querySelector('#tiempo-restante');

  // Verifica si el usuario está bloqueado
  if (localStorage.getItem('bloqueado') === 'true') {
    form.elements.usuario.disabled = true;
    form.elements.password.disabled = true;
    tiempoRestante.style.display = 'block';
    const tiempoRestanteTexto = localStorage.getItem('tiempoRestante');
    contador.innerText = tiempoRestanteTexto;
    mensaje.innerText = `Demasiados intentos fallidos. Por favor, espere ${tiempoRestanteTexto} antes de volver a intentarlo.`;
    tiempo = parseInt(localStorage.getItem('tiempo'));
    iniciarContador();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = form.elements.usuario.value;
    const password = form.elements.password.value;
    if (username === 'tu_usuario' && password === 'tu_contraseña') {
      window.location.href = 'https://hackdarkyeh.github.io/paginadiscord/inicio.html';
    } else {
      intentos++;
      if (intentos >= 3) {
        clearInterval(intervalo);
        form.elements.usuario.disabled = true;
        form.elements.password.disabled = true;
        tiempoRestante.style.display = 'block';
        const tiempoRestanteTexto = contador.innerText;
        mensaje.innerText = `Demasiados intentos fallidos. Por favor, espere ${tiempoRestanteTexto} antes de volver a intentarlo.`;
        // Guarda el estado del bloqueo en localStorage
        localStorage.setItem('bloqueado', 'true');
        localStorage.setItem('tiempoRestante', tiempoRestanteTexto);
        localStorage.setItem('tiempo', tiempo);
        return;
      }
      alert('Usuario o contraseña incorrectos, intentelo de nuevo');
    }
  });

  const contarTiempo = () => {
    tiempo--;
    if (tiempo <= 0) {
      clearInterval(intervalo);
      form.elements.usuario.disabled = false;
      form.elements.password.disabled = false;
      contador.innerText = '';
      mensaje.innerText = '';
      tiempoRestante.style.display = 'none';
      // Borra el estado del bloqueo en localStorage
      localStorage.removeItem('bloqueado');
      localStorage.removeItem('tiempoRestante');
      localStorage.removeItem('tiempo');
    } else {
      const minutos = Math.floor(tiempo / 60).toString().padStart(2, '0');
      const segundos = (tiempo % 60).toString().padStart(2, '0');
      contador.innerText = `${minutos}:${segundos}`;
    }
  };

  const iniciarContador = () => {
    intervalo = setInterval(contarTiempo, 1000);
  };

  // Inicia el contador solo si el usuario no está bloqueado
  if (!localStorage.getItem('bloqueado')) {
    tiempo = 300;
    iniciarContador();
  }
});

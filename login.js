document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  let intentos = 0;
    let tiempo = 0;
    let intervalo = null;
    const mensaje = document.querySelector('#mensaje');
    const contador = document.createElement('span');
    contador.innerText = '00:00';
    mensaje.appendChild(contador);
    
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
          const tiempoRestante = contador.innerText;
          mensaje.innerText = `Demasiados intentos fallidos. Por favor, espere ${tiempoRestante} antes de volver a intentarlo.`;
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
      } else {
        const minutos = Math.floor(tiempo / 60).toString().padStart(2, '0');
        const segundos = (tiempo % 60).toString().padStart(2, '0');
        contador.innerText = `${minutos}:${segundos}`;
      }
    }

    const iniciarContador = () => {
      tiempo = 300;
      intervalo = setInterval(contarTiempo, 1000);
    }

    iniciarContador();
});
 


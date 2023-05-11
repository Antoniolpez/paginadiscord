document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const message = document.querySelector('#mensaje');
  const usernameInput = form.elements.usuario;
  const passwordInput = form.elements.password;
  const MAX_ATTEMPTS = 3;
  const LOCK_TIME = 300; // in seconds

  let attempts = 0;
  let remainingTime = localStorage.getItem('remainingTime') || LOCK_TIME;
  let intervalId = null;
  // Selecciona el botón de cambio de tema
  const toggleThemeButton = document.querySelector('.toggle-theme');

  // Escucha el evento click en el botón
  toggleThemeButton.addEventListener('click', function() {
    // Selecciona el elemento body
    const body = document.querySelector('body');

    // Si el body tiene la clase 'dark-theme', remuévela, y viceversa
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
    } else {
      body.classList.add('dark-theme');
    }
  });

  const lockForm = () => {
    clearInterval(intervalId);
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    message.innerText = `Demasiados intentos fallidos. Por favor, espere ${formatTime(remainingTime)} antes de volver a intentarlo.`;
    message.style.display = 'block';
    localStorage.setItem('locked', true);
    remainingTime = LOCK_TIME;
    localStorage.setItem('remainingTime', remainingTime);
  };

  const unlockForm = () => {
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    attempts = 0;
    message.innerText = '';
    message.style.display = 'none';
    clearInterval(intervalId);
    localStorage.removeItem('locked');
    localStorage.removeItem('remainingTime');
  };

  const updateTimer = () => {
  remainingTime--;
  if (remainingTime === 0) {
    unlockForm();
    clearInterval(intervalId);
    attempts = 0; // Reinicia el número de intentos
  } else if (remainingTime < 0) {
    remainingTime = 0;
    unlockForm();
  } else {
    message.innerText = `Demasiados intentos fallidos. Por favor, espere ${formatTime(remainingTime)} antes de volver a intentarlo.`;
    localStorage.setItem('remainingTime', remainingTime);
  }
};


  const startTimer = () => {
  intervalId = setInterval(updateTimer, 1000);
  if (remainingTime <= 0) {
    unlockForm();
  } else {
    message.style.display = 'block';
    message.innerText = `Demasiados intentos fallidos. Por favor, espere ${formatTime(remainingTime)} antes de volver a intentarlo.`;
  }
};


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSubmit = (event) => {
   event.preventDefault();
   const username = usernameInput.value;
   const password = passwordInput.value;
   if (username === 'tu_usuario' && password === 'tu_contraseña') {
     window.location.href = 'https://hackdarkyeh.github.io/paginadiscord/inicio.html';
   } else {
     attempts++;
     if (attempts >= MAX_ATTEMPTS) {
       lockForm();
       if (!localStorage.getItem('locked')) {
         localStorage.setItem('locked', true);
         localStorage.setItem('remainingTime', LOCK_TIME);
         startTimer();
       } else {
         remainingTime = localStorage.getItem('remainingTime');
         startTimer();
       }
     } else {
       alert('Usuario o contraseña incorrectos, intentelo de nuevo');
     }
   }
 };


  if (localStorage.getItem('locked')) {
    remainingTime = localStorage.getItem('remainingTime');
    lockForm();
    startTimer();
  }

  form.addEventListener('submit', handleSubmit);
});

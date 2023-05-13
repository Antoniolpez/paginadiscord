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
  
  const toggleSwitch = document.querySelector('.toggle-theme input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      
      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        document.getElementById('theme-style').disabled = true;
        document.getElementById('theme-style-dark').disabled = false;
      }
    }
    let toggleSwitch = document.getElementById('toggleSwitch');
    if (toggleSwitch) {
      toggleSwitch.addEventListener('change', switchTheme, false);
    } else {
      console.log('El elemento toggleSwitch no se ha encontrado en la página');
    }

    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.getElementById('theme-style').disabled = true;
        document.getElementById('theme-style-dark').disabled = false;
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.getElementById('theme-style').disabled = false;
        document.getElementById('theme-style-dark').disabled = true;
      }
    }
    
    toggleSwitch.addEventListener('change', switchTheme, false);

  form.addEventListener('submit', handleSubmit);
});

const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

// register form
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = registerForm.password.value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      registerForm.reset();
    }).catch(err => {
      registerForm.querySelector('.error').textContent = err.message;
  });
})

// login form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      loginForm.reset();
    }).catch(err => {
      loginForm.querySelector('.error').textContent = err.message;
  });
})

// sign out
signOut.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => console.log('Signed out.'));
})

// auth listener
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    authWrapper.classList.remove('open');
    authModals.forEach(modal => modal.classList.remove('active'));
  } else {
    authWrapper.classList.add('open');
    authModals[0].classList.add('active');
  }
});

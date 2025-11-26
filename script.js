function login() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Accetta qualsiasi nome/email, ma suggeriamo di non lasciare vuoti
  if (!name || !email) {
    alert('Inserisci nome ed email.');
    return;
  }

  // Salva in localStorage per riutilizzo
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);

  // Reindirizza alla welcome
  window.location.href = 'welcome.html';
}
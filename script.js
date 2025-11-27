function login() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Fake login 
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

// ---  FUNZIONE LOGOUT ---
function logout() {
  // 1. Pulizia Salesforce (Sessione Chat)
  // Usiamo un try-catch per evitare errori se la funzione viene chiamata dove la chat non c'è
  try {
    // Controlliamo se l'oggetto Salesforce esiste in questa pagina
    if (typeof embeddedservice_bootstrap !== 'undefined' && embeddedservice_bootstrap.utilAPI) {
        embeddedservice_bootstrap.utilAPI.clearSession();
        console.log("Sessione Salesforce terminata.");
    }
  } catch (err) {
    console.log("Nessuna sessione Salesforce attiva da chiudere o API non disponibile.");
  }

  // 2. Pulizia Memoria Locale (I tuoi dati)
  localStorage.removeItem('name');
  localStorage.removeItem('email');

  // 3. Reindirizzamento al Login
  window.location.href = 'index.html';
}
function login() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    alert('Inserisci nome ed email.');
    return;
  }

  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  window.location.href = 'welcome.html';
}

// --- FUNZIONE LOGOUT "ASINCRONA" ---
function logout() {
  // 1. Pulizia Locale Immediata
  localStorage.removeItem('name');
  localStorage.removeItem('email');

  // Funzione per reindirizzare (la useremo tra poco)
  const vaiAllaHome = () => {
      window.location.href = 'index.html';
  };

  // 2. Pulizia Salesforce con attesa
  try {
    if (typeof embeddedservice_bootstrap !== 'undefined' && embeddedservice_bootstrap.utilAPI) {
        
        console.log("Tentativo chiusura sessione Salesforce...");
        
        // Lanciamo il comando e aspettiamo la risposta (.then)
        embeddedservice_bootstrap.utilAPI.clearSession()
            .then(() => {
                console.log("Sessione Salesforce chiusa correttamente.");
                vaiAllaHome(); // Vai alla home SOLO ORA
            })
            .catch((err) => {
                console.warn("Errore durante la chiusura sessione (ignorato):", err);
                vaiAllaHome(); // Vai alla home comunque
            });

        // SAFETY CHECK: Se Salesforce non risponde entro 2 secondi, esci lo stesso!
        setTimeout(vaiAllaHome, 2000);
        
    } else {
        // Se non c'è Salesforce (es. sei già sloggato o non ha caricato), vai via subito
        vaiAllaHome();
    }
  } catch (err) {
    console.log("Errore generico logout:", err);
    vaiAllaHome();
  }
}
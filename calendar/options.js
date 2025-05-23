// Valori predefiniti
const DEFAULT_SETTINGS = {
    baseDomain: 'meet.osaspace.it',
    addButtonText: 'Aggiungi stanza OSA',
    joinButtonText: 'Collegati alla stanza OSA',
    inviteMessage: 'Clicca sul link seguente per collegarti alla stanza:'
};

// Carica le impostazioni salvate
function loadSettings() {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
        document.getElementById('baseDomain').value = items.baseDomain;
        document.getElementById('addButtonText').value = items.addButtonText;
        document.getElementById('joinButtonText').value = items.joinButtonText;
        document.getElementById('inviteMessage').value = items.inviteMessage;
    });
}

// Salva le impostazioni
function saveSettings(e) {
    e.preventDefault();
    
    const settings = {
        baseDomain: document.getElementById('baseDomain').value.trim(),
        addButtonText: document.getElementById('addButtonText').value.trim(),
        joinButtonText: document.getElementById('joinButtonText').value.trim(),
        inviteMessage: document.getElementById('inviteMessage').value.trim()
    };

    // Validazione base
    if (!settings.baseDomain) {
        showStatus('Il dominio non può essere vuoto', false);
        return;
    }

    chrome.storage.sync.set(settings, () => {
        showStatus('Impostazioni salvate con successo!', true);
        // Forza il reload della pagina dopo il salvataggio
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    });
}

// Mostra il messaggio di stato
function showStatus(message, isSuccess) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    statusDiv.className = 'status ' + (isSuccess ? 'success' : 'error');
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Inizializza la pagina
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    document.getElementById('optionsForm').addEventListener('submit', saveSettings);
}); 
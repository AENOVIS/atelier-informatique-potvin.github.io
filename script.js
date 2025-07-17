
// ROBIT - Activation du dashboard caché avec mot de passe

let keySequence = [];
let clickCount = 0;
let lastClickTime = 0;
let comboActivated = false;

document.addEventListener('keydown', function(e) {
    if (comboActivated) return;

    const key = e.key.toUpperCase();
    if (['SHIFT', 'A', 'W', 'D', ' '].includes(key)) {
        if (!keySequence.includes(key)) {
            keySequence.push(key);
        }
    }

    if (keySequence.includes('SHIFT') &&
        keySequence.includes('A') &&
        keySequence.includes('W') &&
        keySequence.includes('D') &&
        keySequence.includes(' ')) {
        // Listen for 5 fast left clicks
        document.addEventListener('click', clickListener);
    }
});

function clickListener(e) {
    const now = Date.now();
    if (now - lastClickTime < 700) {
        clickCount++;
    } else {
        clickCount = 1;
    }
    lastClickTime = now;

    if (clickCount >= 5) {
        comboActivated = true;
        document.removeEventListener('click', clickListener);
        promptPassword();
    }
}

function promptPassword() {
    const pass = prompt("Mot de passe requis pour accéder au panneau secret :");
    if (pass === "p@TRICKp0T20!aRK") {
        showDashboard();
    } else {
        alert("Accès refusé.");
    }
}

function showDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'robit-dashboard';
    dashboard.innerHTML = `
        <div style="
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            background: #161b22;
            color: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 0 30px rgba(0,0,0,0.8);
            z-index: 9999;
            max-width: 90%;
            width: 600px;
            font-family: sans-serif;
        ">
            <h2 style="margin-bottom: 1rem; color: #58a6ff;">🔒 ROBIT :: DASHBOARD SECRET</h2>
            <p>Métriques en temps réel :</p>
            <ul style="margin-bottom: 1rem;">
                <li>👥 Visiteurs : <span id="visiteurs">--</span></li>
                <li>💳 Paiements (QuickBooks) : <span id="paiements">--</span></li>
                <li>📈 Factures générées : <span id="factures">--</span></li>
            </ul>
            <button onclick="this.parentElement.remove()" style="
                background: #e74c3c;
                color: white;
                border: none;
                padding: 0.6rem 1.2rem;
                border-radius: 8px;
                cursor: pointer;
            ">Fermer</button>
        </div>
    `;
    document.body.appendChild(dashboard);
}

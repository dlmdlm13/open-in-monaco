console.log("BACKGROUND SCRIPT LOADED");

function newWindow() {
    // Ouvrir une nouvelle fenêtre
    let nouvelleFenetre = window.open('', '', 'width=600,height=400');

    // Vérifier si la nouvelle fenêtre a été bloquée par un bloqueur de pop-up
    if (!nouvelleFenetre) {
        alert("La fenêtre n'a pas pu s'ouvrir. Veuillez désactiver votre bloqueur de pop-up.");
        return;
    }

    // Créer une nouvelle div
    let div = nouvelleFenetre.document.createElement('div');
    div.innerHTML = 'Contenu de la div'; // Ajouter du contenu à la div

    // Ajouter la div à la nouvelle fenêtre
    nouvelleFenetre.document.body.appendChild(div);
}

document.addEventListener('keydown', function(event) {
    // Vérifier si 'Ctrl' et 'Q' sont pressés ensemble
    if (event.ctrlKey && event.key === 'q') {
        // event.preventDefault(); // Empêcher l'action par défaut de ces touches
        newWindow(); // Exécuter la fonction newWindow
    }
});

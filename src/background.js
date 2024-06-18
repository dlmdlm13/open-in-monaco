console.log("BACKGROUND SCRIPT LOADED");

import monaco from 'monaco-editor';

function newWindow() {
    // Ouvrir une nouvelle fenêtre
    var url = chrome.runtime.getURL('new-window.html');

    // Ouvrez le fichier HTML dans une nouvelle fenêtre
    var newWindow = window.open(url, '', 'width=500,height=500');

    // newWindow.document.write('<h1>Hello, new Window!</h1>');
    // newWindow.console.log('Hello, new window!');

}

document.addEventListener('keydown', function(event) {
    // Vérifier si 'Ctrl' et 'Q' sont pressés ensemble
    if (event.ctrlKey && event.key === 'q') {
        // event.preventDefault(); // Empêcher l'action par défaut de ces touches
        newWindow(); // Exécuter la fonction newWindow
    }
});

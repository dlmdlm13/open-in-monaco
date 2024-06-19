function newWindow(content = "") {
    // Stocker le message dans chrome.storage avec la clé 'myKey'
    chrome.storage.local.set({ monacoKey: content });

    // Ouvrir une nouvelle fenêtre
    var url = chrome.runtime.getURL('new-window.html');

    // Ouvrez le fichier HTML dans une nouvelle fenêtre
    var newWindow = window.open(url, '', 'width=500,height=500');
}

document.addEventListener('keydown', function(event) {
    // Vérifier si 'Ctrl' et 'Q' sont pressés ensemble
    if (event.ctrlKey && event.key === 'q' && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        // event.preventDefault(); // Empêcher l'action par défaut de ces touches
        newWindow(document.activeElement.value); // Exécuter la fonction newWindow
    }
});

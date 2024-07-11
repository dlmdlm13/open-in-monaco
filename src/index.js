function saveOptions() {
    var diff = document.getElementById('diff-option').checked;
    chrome.storage.sync.set({diff: diff}, function() {
    });
}

// Restaure les options de l'utilisateur
function restoreOptions() {
    chrome.storage.sync.get('diff', function(items) {
        document.getElementById('diff-option').checked = items.diff;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('diff-option').addEventListener('click', saveOptions);
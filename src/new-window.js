import monaco from 'monaco-editor';

var content = "";
var editor;

chrome.storage.local.get(['monacoKey'], function (result) {
    if (result.monacoKey) {
        content = result.monacoKey;
    }
    createEditor();
});

function createEditor() {
    editor = monaco.editor.create(document.getElementById('container'), {
        value: content,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
    });
}

document.getElementById('save-button').addEventListener('click', function () {
    saveContent();
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveContent();
    }
});

function saveContent() {
    chrome.tabs.query({ active: true, currentWindow: false }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "save", content: editor.getValue() });
    });
}

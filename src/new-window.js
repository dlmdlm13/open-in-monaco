import monaco from 'monaco-editor';

var content = "";

chrome.storage.local.get(['monacoKey'], function(result) {
    if (result.monacoKey) {
        content = result.monacoKey;
    }
    createEditor();
});

function createEditor() {
    monaco.editor.create(document.getElementById('container'), {
        value: content,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
    });
}

import monaco from 'monaco-editor';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));

var editor;
var originalModel;
var modifiedModel;
var language = "";
var content = "";

chrome.storage.local.get(['monacoKey'], function (result) {
    if (result.monacoKey) {
        content = result.monacoKey;
    }
    createEditor();
});

function detectLanguage(code) {
    const result = hljs.highlightAuto(code, ['javascript', 'sql']);
    return result.language;
}

function createEditor() {
    language = detectLanguage(content);
    originalModel = monaco.editor.createModel(content, language);
    modifiedModel = monaco.editor.createModel(content, language);

    editor = monaco.editor.createDiffEditor(document.getElementById('container'), {
        theme: 'vs-dark',
        enableSplitViewResizing: true,
        renderSideBySide: false,
        automaticLayout: true
    }).setModel({
        original: originalModel,
        modified: modifiedModel
    });
}

document.getElementById('save-button').addEventListener('click', function () {
    saveContent();
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveContent();
    }
});

function saveContent() {
    chrome.tabs.query({ active: true, currentWindow: false }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "save", content: modifiedModel.getValue() });
        originalModel.setValue(modifiedModel.getValue());
    });
}

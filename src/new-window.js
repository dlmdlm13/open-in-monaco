import monaco from 'monaco-editor';

var editor;
var originalModel;
var modifiedModel;
var language = 'sql';
var content = "";

chrome.storage.local.get(['monacoKey'], function (result) {
    if (result.monacoKey) {
        content = result.monacoKey;
    }
    createEditor();
});

function createEditor() {
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
        editor.setModel({
            original: originalModel
        });
    });
}

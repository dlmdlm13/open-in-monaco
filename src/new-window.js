import monaco from 'monaco-editor';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

var editor;
var originalModel;
var modifiedModel;
var language = "";
var content = "";
var diff;

/**
 * TOOLBAR
 */

function restoreOptions() {
    chrome.storage.sync.get('diff', function(items) {
        document.getElementById('diff-option').checked = items.diff
        diff = items.diff;
        createEditor();
    });
}
function saveOptions() {
    diff = document.getElementById('diff-option').checked;
    chrome.storage.sync.set({diff: diff}, function() {
    });
}
document.getElementById('diff-option').addEventListener('click', function() {
    saveOptions();
    editor.dispose();
    createEditor();
});

document.getElementById('language-option').addEventListener('change', function() {
    monaco.editor.setModelLanguage(modifiedModel, document.getElementById('language-option').value);
});

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

/**
 * EDITOR
 */

chrome.storage.local.get(['monacoKey'], function (result) {
    if (result.monacoKey) {
        content = result.monacoKey;
    }
    restoreOptions();
});

function detectLanguage(code) {
    const result = hljs.highlightAuto(code, ['javascript', 'sql', 'xml']);
    if (result.language) {
        document.getElementById('language-option').value = result.language;
    }
    return result.language;
}

function createEditor() {
    if (!modifiedModel) {
        language = detectLanguage(content);
        modifiedModel = monaco.editor.createModel(content, language);
    }
    if (diff) {
        originalModel = monaco.editor.createModel(content, language);
    
        editor = monaco.editor.createDiffEditor(document.getElementById('container'), {
            theme: 'vs-dark',
            enableSplitViewResizing: true,
            renderSideBySide: false,
            automaticLayout: true
        });
        editor.setModel({
            original: originalModel,
            modified: modifiedModel
        });
    } else {
        editor = monaco.editor.create(document.getElementById('container'), {
            model: modifiedModel,
            theme: 'vs-dark',
            automaticLayout: true
        });
    }
}

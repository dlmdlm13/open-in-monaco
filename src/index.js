import monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('container'), {
    value: 'console.log("Hello, world!")',

});

console.log("OK");
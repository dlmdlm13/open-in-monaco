import monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('container'), {
    value: 'console.log("Hello, world!")',
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
});

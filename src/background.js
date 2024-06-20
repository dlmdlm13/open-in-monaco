function newWindow(content = "") {
    try {
        chrome.storage.local.set({ monacoKey: content });
    } catch (error) {}
    var url = chrome.runtime.getURL('new-window.html');
    var newWindow = window.open(url, '', 'width=' + window.innerWidth + ',height=' + window.innerHeight);
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'q' && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        // event.preventDefault();
        newWindow(document.activeElement.value);
    }
});

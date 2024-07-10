var currentTextField;

function newWindow(content = "") {
    try {
        chrome.storage.local.set({ monacoKey: content });
    } catch (error) { }
    var url = chrome.runtime.getURL('new-window.html');
    var newWindow = window.open(url, '', 'width=' + window.innerWidth + ',height=' + window.innerHeight);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "open_in_monaco") {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            currentTextField = document.activeElement;
            newWindow(document.activeElement.value);
        }
        else {
            newWindow(document.getSelection().focusNode.valueOf().wholeText);
        }
    }

    if (request.action === "save") {
        setContent(request.content);
    }
});

function setContent(content) {
    currentTextField.value = content;
}
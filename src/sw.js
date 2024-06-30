chrome.commands.onCommand.addListener(function(command) {
    if (command === "open_in_monaco") {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "open_in_monaco"});
        });
    }
});
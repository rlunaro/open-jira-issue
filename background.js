chrome.commands.onCommand.addListener((command) => {
  if (command === "open-issue") {
    chrome.action.openPopup();
  }
});



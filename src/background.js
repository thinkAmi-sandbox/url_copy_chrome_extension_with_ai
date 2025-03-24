// Listen for the keyboard shortcut command
chrome.commands.onCommand.addListener((command) => {
	if (command === "copy-url-to-markdown") {
		// Get the active tab
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const activeTab = tabs[0];

			// Send a message to the content script to get the page title
			chrome.tabs.sendMessage(
				activeTab.id,
				{ action: "getPageTitle" },
				(response) => {
					if (chrome.runtime.lastError) {
						// If there's an error (e.g., content script not loaded), use the tab title
						copyToClipboard(activeTab.title, activeTab.url);
					} else if (response && response.title) {
						// Use the title from the content script
						copyToClipboard(response.title, activeTab.url);
					} else {
						// Fallback to the tab title
						copyToClipboard(activeTab.title, activeTab.url);
					}
				},
			);
		});
	}
});

// Function to copy the formatted text to the clipboard
function copyToClipboard(title, url) {
	// Format the text in Markdown format: [title](url)
	const markdownText = `[${title}](${url})`;

	// Send a message to the content script to copy the text to the clipboard
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {
			action: "copyToClipboard",
			text: markdownText,
		});
	});
}

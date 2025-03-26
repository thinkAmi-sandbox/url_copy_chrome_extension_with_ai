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
		chrome.tabs.sendMessage(
			activeTab.id,
			{
				action: "copyToClipboard",
				text: markdownText,
			},
			(response) => {
				// Check if there was an error (e.g., content script not loaded)
				if (chrome.runtime.lastError) {
					console.log(
						"Error sending message to content script:",
						chrome.runtime.lastError,
					);

					// Show a notification
					chrome.notifications.create({
						type: "basic",
						iconUrl: chrome.runtime.getURL("icons/icon.png"),
						title: "URL Copy Extension",
						message:
							"このタブでは拡張機能が正常に動作していません。タブをリロードしてください。",
					});
				}
			},
		);
	});
}

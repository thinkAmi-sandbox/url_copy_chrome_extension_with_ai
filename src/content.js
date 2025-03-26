// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "getPageTitle") {
		// Get the page title from the document
		const title = document.title;

		// Send the title back to the background script
		sendResponse({ title: title });
	} else if (message.action === "copyToClipboard") {
		// Copy the text to the clipboard
		copyToClipboard(message.text);
	} else if (message.action === "showFlashMessage") {
		// Display a flash message with the copied content
		showFlashMessage(message.message);
	}

	// Return true to indicate that we will send a response asynchronously
	return true;
});

// Function to copy text to the clipboard
function copyToClipboard(text) {
	// Try to use the Clipboard API first
	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				// Show a flash message when the copy is successful
				showFlashMessage(text);
			})
			.catch((err) => {
				console.error("Clipboard API failed:", err);
				// Fall back to the execCommand method
				fallbackCopyToClipboard(text);
			});
	} else {
		// Fall back to the execCommand method if Clipboard API is not available
		fallbackCopyToClipboard(text);
	}
}

// Fallback method to copy text to the clipboard using execCommand
function fallbackCopyToClipboard(text) {
	// Create a temporary textarea element
	const textarea = document.createElement("textarea");
	textarea.value = text;

	// Make the textarea out of viewport
	textarea.style.position = "fixed";
	textarea.style.left = "-999999px";
	textarea.style.top = "-999999px";

	document.body.appendChild(textarea);
	textarea.focus();
	textarea.select();

	let success = false;
	try {
		// Execute the copy command
		success = document.execCommand("copy");
	} catch (err) {
		console.error("execCommand error:", err);
	}

	// Clean up
	document.body.removeChild(textarea);

	// Show a flash message if the copy was successful
	if (success) {
		showFlashMessage(text);
	}
}

// Function to display a flash message
function showFlashMessage(message) {
	// Create a div element for the flash message
	const flashDiv = document.createElement("div");

	// Set the content of the flash message
	flashDiv.textContent = "Copied: " + message;

	// Style the flash message
	Object.assign(flashDiv.style, {
		position: "fixed",
		top: "20px",
		left: "50%",
		transform: "translateX(-50%)",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		color: "white",
		padding: "10px 20px",
		borderRadius: "5px",
		zIndex: "9999",
		boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
		transition: "opacity 0.5s ease-in-out",
		opacity: "0",
		maxWidth: "80%",
		wordBreak: "break-word",
		textAlign: "center",
		fontSize: "14px",
		fontFamily: "Arial, sans-serif",
	});

	// Add the flash message to the document
	document.body.appendChild(flashDiv);

	// Show the flash message
	setTimeout(() => {
		flashDiv.style.opacity = "1";
	}, 10);

	// Hide and remove the flash message after 3 seconds
	setTimeout(() => {
		flashDiv.style.opacity = "0";
		setTimeout(() => {
			document.body.removeChild(flashDiv);
		}, 500);
	}, 3000);
}

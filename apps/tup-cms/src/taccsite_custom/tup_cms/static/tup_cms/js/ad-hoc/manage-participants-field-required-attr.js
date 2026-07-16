document.addEventListener('DOMContentLoaded', function () {
	var textArea = document.getElementById('participants');
	var fileUpload = document.getElementById('participants_via_file_upload');

	if (!textArea || !fileUpload) {
		return;
	}

	function updateRequired() {
		const hasText = textArea.value.trim() !== '';
		const hasFile = fileUpload.value !== '';

		textArea.required = !hasFile;
		fileUpload.required = !hasText;
	}

	textArea.addEventListener('input', updateRequired);
	fileUpload.addEventListener('change', updateRequired);

	updateRequired();
});

/* Do not let both "Participants" fields of any form be required at once */
document.addEventListener('DOMContentLoaded', function () {
  var textArea = document.getElementById('participants');
  var fileUpload = document.getElementById('participants_via_file_upload');

  if (!textArea || !fileUpload) {
    return;
  }

  var textAreaWrapper = textArea.closest('.field-wrapper');
  var fileUploadWrapper = fileUpload.closest('.field-wrapper');

  function updateRequired() {
    const hasText = textArea.value.trim() !== '';
    const hasFile = fileUpload.value !== '';

    textArea.required = !hasFile;
    fileUpload.required = !hasText;

    textAreaWrapper.classList.toggle('required', !hasFile);
    fileUploadWrapper.classList.toggle('required', !hasText);
  }

  textArea.addEventListener('input', updateRequired);
  fileUpload.addEventListener('change', updateRequired);

  updateRequired();
});

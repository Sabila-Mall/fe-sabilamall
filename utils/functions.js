const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
  } catch (err) {
    console.error("Unable to copy", err);
  }

  document.body.removeChild(textArea);
};

export const copyToClipboard = (text, onSuccess, onFail) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(onSuccess ? onSuccess : () => {})
    .catch(() => console.error("Unable to copy", err));
};
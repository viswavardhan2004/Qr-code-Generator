const form = document.querySelector('form');
const urlInput = document.querySelector('#url');
const qrCodeDiv = document.querySelector('#qr-code');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const url = urlInput.value;

  try {
    const response = await fetch(`/qr-code?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error('Error generating QR code');
    }

    const qrCodeBlob = await response.blob();
    const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
    const qrCodeImage = new Image();

    qrCodeImage.src = qrCodeUrl;
    qrCodeDiv.innerHTML = '';
    qrCodeDiv.appendChild(qrCodeImage);
  } catch (error) {
    console.error(error);
    alert('Error generating QR code');
  }
});
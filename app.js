const express = require('express');
const QRCode = require('qr-image');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/qr-code-generator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define QR code schema
const qrCodeSchema = new mongoose.Schema({
  url: String,
  qrCode: Buffer,
});

// Create QR code model
const QRCodeModel = mongoose.model('QRCode', qrCodeSchema);

app.use(express.static('public'));

app.get('/qr-code', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(400).send('URL is required');
    return;
  }

  try {
    // Generate QR code image
    const qrCode = QRCode.imageSync(url);

    // Save QR code to MongoDB
    const qrCodeDoc = new QRCodeModel({ url, qrCode });
    await qrCodeDoc.save();

    // Send QR code image as response
    res.set('Content-Type', 'image/png');
    res.send(qrCode);
  } catch (error) {
    res.status(500).send('Error generating QR code');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// to import all packages we need to add these packages into this folder
//npm init
//npm -y
//npm i
//npm mongoose
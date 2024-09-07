const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serving static files

app.post('/generate', async (req, res) => {
  const { text, size, color, logo } = req.body;
  const options = {
    width: size || 200,
    color: {
      dark: color || '#000000', 
      light: '#ffffff' 
    }
  };

  try {
    const qrImage = await QRCode.toDataURL(text, options);
    
    let finalImage = qrImage;
    if (logo) {
      finalImage = await integrateLogo(qrImage, logo);
    }

    res.json({ qrImage: finalImage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

async function integrateLogo(qrImage, logo) {
  return qrImage;
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

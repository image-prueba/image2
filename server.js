const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuración multer para guardar archivos en uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Servir carpeta uploads como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir el index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para subir archivos
app.post('/upload', upload.fields([{ name: 'image' }, { name: 'audio' }]), (req, res) => {
  try {
    if (!req.files || !req.files.image || !req.files.audio) {
      return res.status(400).send('Falta imagen o audio');
    }
    const imageUrl = `/uploads/${req.files.image[0].filename}`;
    const audioUrl = `/uploads/${req.files.audio[0].filename}`;

    res.json({ imageUrl, audioUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

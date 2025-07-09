const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const app = express();
app.use(express.json());

cloudinary.config({
  cloud_name: 'dwkdbhys0',       // REEMPLAZA
  api_key: '712815761927256',             // REEMPLAZA
  api_secret: 'tXTFIReWuBcyk0go-KgzHfhTF7Q'        // REEMPLAZA
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => path.extname(file.originalname).slice(1),
    public_id: (req, file) => file.originalname
  }
});

const upload = multer({ storage: storage });

// Servir index.html en la raíz
app.post('/uploads', upload.fields([{ name: 'image' }, { name: 'audio' }]), (req, res) => {
  try {
    const image = req.files['image']?.[0]?.path;
    const audio = req.files['audio']?.[0]?.path;

    if (!image || !audio) {
      return res.status(400).send('Faltan imagen o audio');
    }

    res.send({ image, audio });
  } catch (error) {
    console.error('Error en /upload:', error);
    res.status(500).send('Error interno del servidor');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

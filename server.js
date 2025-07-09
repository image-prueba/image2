const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());

cloudinary.config({
  cloud_name: 'dwkdbhys0',       // ← REEMPLAZA esto
  api_key: '712815761927256',             // ← REEMPLAZA esto
  api_secret: 'tXTFIReWuBcyk0go-KgzHfhTF7Q'        // ← REEMPLAZA esto
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

app.post('/upload', upload.fields([{ name: 'image' }, { name: 'audio' }]), (req, res) => {
  const image = req.files['image']?.[0]?.path;
  const audio = req.files['audio']?.[0]?.path;
  res.send({ image, audio });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

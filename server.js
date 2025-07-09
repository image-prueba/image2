const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Crear carpeta 'uploads' si no existe
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use(express.static('.'));
app.use('/uploads', express.static('uploads'));

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Subida de imagen y audio
app.post('/upload', upload.fields([{ name: 'image' }, { name: 'audio' }]), (req, res) => {
  res.sendStatus(200);
});

// Obtener la lista de publicaciones
app.get('/posts', (req, res) => {
  const files = fs.readdirSync('uploads');
  const images = files.filter(f => f.match(/\.(jpg|jpeg|png|gif)$/));
  const audios = files.filter(f => f.match(/\.(mp3|wav|ogg)$/));

  // Combinar imagenes y audios por orden de subida
  const posts = [];
  const minLength = Math.min(images.length, audios.length);

  for (let i = 0; i < minLength; i++) {
    posts.push({
      image: images[i],
      audio: audios[i]
    });
  }

  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

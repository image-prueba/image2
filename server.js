
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload', upload.fields([{ name: 'image' }, { name: 'audio' }]), (req, res) => {
  res.sendStatus(200);
});

app.get('/files', (req, res) => {
  const files = fs.readdirSync('./uploads');
  const images = files.filter(f => f.match(/\.(png|jpg|jpeg|gif)$/i));
  const audios = files.filter(f => f.match(/\.(mp3|wav|ogg)$/i));
  res.json({ images, audios });
});

app.listen(PORT, () => console.log('Servidor activo en puerto ' + PORT));

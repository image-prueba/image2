
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  e.target.reset();
  loadGallery();
});

async function loadGallery() {
  const res = await fetch("/files");
  const data = await res.json();
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  data.images.forEach(img => {
    const container = document.createElement("div");
    const imageEl = document.createElement("img");
    imageEl.src = "/uploads/" + img;
    container.appendChild(imageEl);
    gallery.appendChild(container);
  });

  data.audios.forEach(audio => {
    const container = document.createElement("div");
    const audioEl = document.createElement("audio");
    audioEl.controls = true;
    audioEl.src = "/uploads/" + audio;
    container.appendChild(audioEl);
    gallery.appendChild(container);
  });
}

loadGallery();

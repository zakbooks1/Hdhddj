const API_URL = "https://YOUR-WORKER.yourname.workers.dev/generate";

const ideas = [
  "a futuristic city at night",
  "a dragon flying over mountains",
  "a robot cooking food",
  "a neon cyberpunk street",
  "a floating island in the sky"
];

// load ideas
const box = document.getElementById("ideas");
ideas.forEach(i => {
  const div = document.createElement("div");
  div.className = "idea";
  div.innerText = i;
  div.onclick = () => document.getElementById("prompt").value = i;
  box.appendChild(div);
});

async function generate() {
  const prompt = document.getElementById("prompt").value;
  const style = document.getElementById("style").value;
  const file = document.getElementById("imgUpload").files[0];

  const status = document.getElementById("status");
  const img = document.getElementById("result");

  if (!prompt && !file) {
    status.innerText = "Enter prompt or upload image";
    return;
  }

  status.innerText = "Generating...";

  let base64 = null;

  if (file) {
    base64 = await toBase64(file);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: prompt + " " + style,
      image: base64
    })
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  img.src = url;
  status.innerText = "Done!";
}

function toBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

let history = [];

const prompts = [
  "a futuristic city at sunset",
  "a dragon made of ice flying over mountains",
  "a robot cooking in a kitchen",
  "a cat wearing armor in battle",
  "a floating island with waterfalls",
  "a haunted house in the forest",
  "a spaceship landing on mars",
  "a neon cyberpunk street at night"
];

// Load suggestions
function loadSuggestions() {
  const container = document.getElementById("suggestions");

  prompts.forEach(p => {
    const div = document.createElement("div");
    div.className = "suggestion";
    div.innerText = p;

    div.onclick = () => {
      document.getElementById("prompt").value = p;
    };

    container.appendChild(div);
  });
}

loadSuggestions();

// Generate image
function generateImage() {
  const promptInput = document.getElementById("prompt").value;
  const style = document.getElementById("style").value;
  const file = document.getElementById("imgUpload").files[0];

  const img = document.getElementById("result");
  const status = document.getElementById("status");

  if (!promptInput && !file) {
    status.innerText = "Enter prompt or upload image!";
    return;
  }

  status.innerText = "Generating...";

  let url;

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptInput + " " + style)}?image=${encodeURIComponent(imageUrl)}`;
  } else {
    url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptInput + " " + style)}`;
  }

  img.src = url;

  img.onload = () => {
    status.innerText = "Done!";
    addToHistory(url);
  };
}

// Download
function downloadImage() {
  const img = document.getElementById("result");

  if (!img.src) return;

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "ai-image.png";
  link.click();
}

// History
function addToHistory(url) {
  history.unshift(url);

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  history.slice(0, 10).forEach(src => {
    const img = document.createElement("img");
    img.src = src;

    img.onclick = () => {
      document.getElementById("result").src = src;
    };

    gallery.appendChild(img);
  });
}

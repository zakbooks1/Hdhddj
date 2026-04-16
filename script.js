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

let history = [];

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
    // image-to-image
    const imageUrl = URL.createObjectURL(file);
    url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptInput + " " + style)}?image=${encodeURIComponent(imageUrl)}`;
  } else {
    // text-to-image
    url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptInput + " " + style)}`;
  }

  img.src = url;

  img.onload = () => {
    status.innerText = "Done!";
    addToHistory(url);
  };
}

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
  const fullPrompt = promptInput + " " + style;

  status.innerText = "Generating...";

  const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(fullPrompt);

  img.src = url;

  img.onload = () => {
    status.innerText = "Done!";
    addToHistory(url);
  };
}

function downloadImage() {
  const img = document.getElementById("result");

  if (!img.src) return;

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "ai-image.png";
  link.click();
}

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

let history = [];

function generateImage() {
  const promptInput = document.getElementById("prompt").value;
  const style = document.getElementById("style").value;
  const img = document.getElementById("result");
  const status = document.getElementById("status");

  if (!promptInput) {
    status.innerText = "destroy money!";
    return;
  }

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
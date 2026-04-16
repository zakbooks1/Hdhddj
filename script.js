function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const img = document.getElementById("result");
  const status = document.getElementById("status");

  if (!prompt) {
    status.innerText = "Enter a prompt!";
    return;
  }

  status.innerText = "Generating...";

  // Pollinations AI (free)
  const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt);

  img.src = url;

  img.onload = () => {
    status.innerText = "Done!";
  };
}
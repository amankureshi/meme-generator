const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottamText");
const generateButton = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("download-btn");
const templateSelect = document.getElementById("tamplateSelect");

window.onload = () => {
  fetchMemeTamplate();
};

function fetchMemeTamplate() {
  const apiUrl = "https://api.imgflip.com/get_memes";
  fetch(apiUrl)
    .then((Response) => Response.json())
    .then((data) => {
      const memes = data.data.memes;
      populateTemplateSelect(memes);
    })
    .catch((error) => console.error("Error fetching meme templates:", error));
}
function populateTemplateSelect(memes) {
  memes.forEach((meme) => {
    const option = document.createElement("option");
    option.value = meme.url;
    option.textContent = meme.name;
    templateSelect.appendChild(option);
  });
}
function generateMeme() {
  const selectedTemplateUrl = templateSelect.value;
  if (selectedTemplateUrl) {
    drawMemeFromUrl(selectedTemplateUrl);
  } else {
    const apiUrl = "https://meme-api.com/gimme";
    fetch(apiUrl)
      .then((Response) => Response.json())
      .then((data) => {
        drawMemeFromUrl(data.url);
      })
      .catch((error) => console.error("Erro fetching", error));
  }
}
function drawMemeFromUrl(imageUrl) {
  const img = new Image();
  img.src = imageUrl;
  img.crossOrigin = "anonymous";

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawText();
  };
}
function drawText() {
  ctx.font = "40px Impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";

  //Top-text
  ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 50);
  ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 50);

  //Bottom-text
  ctx.fillText(
    bottomTextInput.value.toUpperCase(),
    canvas.width / 2,
    canvas.height - 20
  );
  ctx.strokeText(
    bottomTextInput.value.toUpperCase(),
    canvas.width / 2,
    canvas.height - 20
  );
}
function downloadMeme() {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
}
generateButton.addEventListener("click", generateMeme);
topTextInput.addEventListener("input", drawText);
bottomTextInput.addEventListener("input", drawText);
downloadBtn.addEventListener("click", downloadMeme);

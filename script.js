// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
const input = document.getElementById('image-input');
const form = document.getElementById('generate-meme');
const topText = document.getElementById('text-top');
const bottomText = document.getElementById('text-bottom');
const generateButton = document.querySelector("[type='submit']");
const clearButton = document.querySelector("[type='reset']");
const readTextbutton = document.querySelector("[type='button']");
const readVolumeSlider = document.querySelector("[type='range']");

input.addEventListener('change', () => {
  img.src = URL.createObjectURL(input.files[0]);
});

img.addEventListener('load', () => {
  var canvas = document.getElementById('user-image');
  var context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
  var imgWidth = img.width;
  var imgHeight = img.height;
  var dimensions = getDimensions(canvas.getAttribute('width'), canvas.getAttribute('height'), imgWidth, imgHeight);
  context.drawImage(img, dimensions.startX, dimensions.startY, dimensions.width, dimensions.height);

  // enable generate, disable clear and read text
  generateButton.disabled = false;
  clearButton.disabled = true;
  readTextbutton.disabled = true;
});

form.addEventListener('submit', () => {
  event.preventDefault();

  var canvas = document.getElementById('user-image');
  var context = canvas.getContext('2d');
  context.textAlign = 'center';
  context.font = '50px impact';
  context.fillStyle = 'white';
  context.fillText(topText.value, 200, 60);
  context.fillText(bottomText.value, 200, 380);

  generateButton.disabled = true;
  clearButton.disabled = false;
  readTextbutton.disabled = false;
});

clearButton.addEventListener('click', () => {
  var canvas = document.getElementById('user-image');
  var context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
  generateButton.disabled = false;
  clearButton.disabled = true;
  readTextbutton.disabled = true;
});

readTextbutton.addEventListener('click', () => {
 
});

readVolumeSlider.addEventListener('change', () => {
 
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}

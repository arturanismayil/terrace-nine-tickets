// Zoom and move buttons for the map.
// The whole map (screen and seats) sits inside #map-content, and we zoom and
// move it with a CSS transform.

const mapWindow = document.querySelector('.map-window');
const mapContent = document.getElementById('map-content');

const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const resetButton = document.getElementById('reset-view');
const zoomLevel = document.getElementById('zoom-level');

const moveUpButton = document.getElementById('move-up');
const moveDownButton = document.getElementById('move-down');
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');

const minZoom = 0.5;
const maxZoom = 2;
const zoomStep = 0.25;

// how many pixels the map moves with one click
const moveStep = 60;

// 1 means normal size, 2 means twice as big
let zoom = 1;

// how far the map is moved from its starting corner, in pixels
let moveX = 0;
let moveY = 0;

// keeps one number between a smallest and a biggest value
function keepBetween(value, smallest, biggest) {
  return Math.min(Math.max(value, smallest), biggest);
}

// stops the map from being moved out of the window
function limitMovement() {
  // size of the map after zooming
  const mapWidth = mapContent.offsetWidth * zoom;
  const mapHeight = mapContent.offsetHeight * zoom;

  // space left over (negative when the map is bigger than the window)
  const spaceX = mapWindow.clientWidth - mapWidth;
  const spaceY = mapWindow.clientHeight - mapHeight;

  moveX = keepBetween(moveX, Math.min(0, spaceX), Math.max(0, spaceX));
  moveY = keepBetween(moveY, Math.min(0, spaceY), Math.max(0, spaceY));
}

// applies zoom and movement to the map and updates the buttons
function updateMap() {
  limitMovement();

  mapContent.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
  zoomLevel.textContent = Math.round(zoom * 100) + '%';

  // grey out a zoom button when we hit its limit
  zoomInButton.disabled = zoom >= maxZoom;
  zoomOutButton.disabled = zoom <= minZoom;
}

function zoomIn() {
  zoom = Math.min(zoom + zoomStep, maxZoom);
  updateMap();
}

function zoomOut() {
  zoom = Math.max(zoom - zoomStep, minZoom);
  updateMap();
}

// the map moves in the direction of the button
function moveMap(changeX, changeY) {
  moveX = moveX + changeX;
  moveY = moveY + changeY;
  updateMap();
}

// back to normal size, with the map in the middle of the window
function resetView() {
  zoom = 1;
  moveX = (mapWindow.clientWidth - mapContent.offsetWidth) / 2;
  moveY = (mapWindow.clientHeight - mapContent.offsetHeight) / 2;
  updateMap();
}

zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);
resetButton.addEventListener('click', resetView);

moveUpButton.addEventListener('click', function () {
  moveMap(0, -moveStep);
});
moveDownButton.addEventListener('click', function () {
  moveMap(0, moveStep);
});
moveLeftButton.addEventListener('click', function () {
  moveMap(-moveStep, 0);
});
moveRightButton.addEventListener('click', function () {
  moveMap(moveStep, 0);
});

// if the browser window changes size, make sure the map is still inside it
window.addEventListener('resize', updateMap);

resetView();

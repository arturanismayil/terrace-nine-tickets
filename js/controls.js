// Zoom buttons for the map.
// The whole map (screen and seats) sits inside #map-content, and we zoom it
// with a CSS transform.

const mapContent = document.getElementById('map-content');
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const resetButton = document.getElementById('reset-view');
const zoomLevel = document.getElementById('zoom-level');

const minZoom = 0.5;
const maxZoom = 2;
const zoomStep = 0.25;

// 1 means normal size, 2 means twice as big
let zoom = 1;

// applies the current zoom to the map and updates the buttons
function updateMap() {
  mapContent.style.transform = `scale(${zoom})`;
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

function resetView() {
  zoom = 1;
  updateMap();
}

zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);
resetButton.addEventListener('click', resetView);

updateMap();

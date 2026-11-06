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

const minZoom = 0.25;
const maxZoom = 2;
const zoomStep = 0.25;

// how fast the mouse wheel zooms (a smaller number is slower)
const wheelSpeed = 0.0005;

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

// changes the zoom, but keeps the spot at (pointX, pointY) where it is on the screen
// pointX and pointY are measured from the top-left corner of the map window
function zoomAround(newZoom, pointX, pointY) {
  const limitedZoom = keepBetween(newZoom, minZoom, maxZoom);

  // which spot of the map is under that point (in map units, before zooming)
  const mapX = (pointX - moveX) / zoom;
  const mapY = (pointY - moveY) / zoom;

  zoom = limitedZoom;

  // move the map so the same spot is under that point again
  moveX = pointX - mapX * zoom;
  moveY = pointY - mapY * zoom;
  updateMap();
}

// the zoom buttons zoom around the middle of the window
function zoomIn() {
  zoomAround(zoom + zoomStep, mapWindow.clientWidth / 2, mapWindow.clientHeight / 2);
}

function zoomOut() {
  zoomAround(zoom - zoomStep, mapWindow.clientWidth / 2, mapWindow.clientHeight / 2);
}

// the map moves in the direction of the button
function moveMap(changeX, changeY) {
  moveX = moveX + changeX;
  moveY = moveY + changeY;
  updateMap();
}

// the zoom where the whole width of the map fits in the window
// on a big screen this is 1 (normal size), on a phone it is smaller
function fitZoom() {
  const fit = mapWindow.clientWidth / mapContent.offsetWidth;
  return keepBetween(fit, minZoom, 1);
}

// back to the starting view: the whole map visible, in the middle of the window
function resetView() {
  zoom = fitZoom();
  moveX = (mapWindow.clientWidth - mapContent.offsetWidth * zoom) / 2;
  moveY = (mapWindow.clientHeight - mapContent.offsetHeight * zoom) / 2;
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

// zoom with the mouse wheel, around the place where the mouse is
mapWindow.addEventListener('wheel', function (event) {
  // stop the whole page from scrolling while the mouse is over the map
  event.preventDefault();

  const box = mapWindow.getBoundingClientRect();
  const pointX = event.clientX - box.left;
  const pointY = event.clientY - box.top;

  // the harder you scroll, the more it zooms
  // we cap the amount, so one fast flick cannot jump the whole way
  const amount = keepBetween(event.deltaY, -100, 100);

  // wheel up (negative) zooms in, wheel down zooms out
  zoomAround(zoom * (1 - amount * wheelSpeed), pointX, pointY);
}, { passive: false });

// drag the map with the mouse
let mouseIsDown = false;  // is the left mouse button held down on the map?
let dragMoved = false;    // has the mouse moved far enough to count as a drag?
let startMouseX = 0;      // where the mouse button went down
let startMouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

mapWindow.addEventListener('mousedown', function (event) {
  // only the left mouse button
  if (event.button !== 0) {
    return;
  }

  mouseIsDown = true;
  dragMoved = false;
  startMouseX = event.clientX;
  startMouseY = event.clientY;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;

  // stops the browser from selecting text while we drag
  event.preventDefault();
});

// we listen on the whole page, so the drag keeps working if the mouse leaves the window
document.addEventListener('mousemove', function (event) {
  if (!mouseIsDown) {
    return;
  }

  // moving less than 5 pixels is still a click, not a drag
  const farX = Math.abs(event.clientX - startMouseX);
  const farY = Math.abs(event.clientY - startMouseY);
  if (!dragMoved && farX < 5 && farY < 5) {
    return;
  }

  if (!dragMoved) {
    dragMoved = true;
    mapWindow.classList.add('dragging');
  }

  moveMap(event.clientX - lastMouseX, event.clientY - lastMouseY);
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
});

document.addEventListener('mouseup', function () {
  mouseIsDown = false;
  mapWindow.classList.remove('dragging');
});

// after a drag, the browser also sends a click to the seat under the mouse.
// We catch that click first and throw it away, so dragging never selects a seat.
mapWindow.addEventListener('click', function (event) {
  if (dragMoved) {
    event.stopPropagation();
    event.preventDefault();
    dragMoved = false;
  }
}, true);

// if you tab to a seat that is out of view, the browser scrolls the window to it
// and the map jumps, so we put the scroll back to 0 (the buttons do the moving)
mapWindow.addEventListener('scroll', function () {
  mapWindow.scrollLeft = 0;
  mapWindow.scrollTop = 0;
});

// if the browser window changes size, make sure the map is still inside it
window.addEventListener('resize', updateMap);

resetView();

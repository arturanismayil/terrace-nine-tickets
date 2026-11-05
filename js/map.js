// Draws every seat on the map, using the zones from venue-data.js.
// Clicking a seat shows its details, it does not add anything to the cart.

const venueMap = document.getElementById('venue-map');

// the seat details box on the right
const seatMessage = document.getElementById('seat-message');
const seatInfo = document.getElementById('seat-info');
const infoSeat = document.getElementById('info-seat');
const infoZone = document.getElementById('info-zone');
const infoRow = document.getElementById('info-row');
const infoNumber = document.getElementById('info-number');
const infoPrice = document.getElementById('info-price');

// row letters, so row 0 is A, row 1 is B and so on
const rowLetters = 'ABCDEFGH';

// the seat button that is being looked at right now (none at the start)
let inspectedSeat = null;

// the details of that seat, like { id: 'B-D-07', zone: 'Deck centre', price: 14 }
// this is what "Add to cart" puts in the cart
let inspectedTicket = null;

// builds the id for one seat, for example B-D-07
function makeSeatId(zone, rowNumber, seatNumber) {
  let number = seatNumber;
  if (number < 10) {
    number = '0' + number;
  }
  return zone.id + '-' + rowLetters[rowNumber] + '-' + number;
}

// shows the details of one seat in the box on the right
function showSeatDetails(seatId, zone, rowNumber, seatNumber) {
  seatMessage.hidden = true;
  seatInfo.hidden = false;

  infoSeat.textContent = seatId;
  infoZone.textContent = zone.name;
  infoRow.textContent = rowLetters[rowNumber];
  infoNumber.textContent = seatNumber;
  infoPrice.textContent = zone.price;
}

// marks a seat as the one being looked at, and un-marks the one before it
function inspectSeat(seat, seatId, zone, rowNumber, seatNumber) {
  const previousSeat = inspectedSeat;

  inspectedSeat = seat;
  inspectedTicket = { id: seatId, zone: zone.name, price: zone.price };

  // refreshSeat and updateAddButton are in cart.js
  // refreshSeat sets the colour and label of a seat (amber, or pink if it is in the cart)
  if (previousSeat !== null) {
    previousSeat.classList.remove('inspected');
    refreshSeat(previousSeat.id);
  }
  refreshSeat(seatId);
  showSeatDetails(seatId, zone, rowNumber, seatNumber);
  updateAddButton();

  // move the keyboard focus to the Add to cart button, so a keyboard user does
  // not have to tab through all the other seats to reach it
  // (this does nothing if the button is greyed out because the seat is in the cart)
  addButton.focus({ preventScroll: true });
}

// makes one seat button and puts it on the map
function drawSeat(zone, rowNumber, seatNumber) {
  const seat = document.createElement('button');
  const seatId = makeSeatId(zone, rowNumber, seatNumber);

  seat.className = 'seat';
  seat.id = seatId;
  seat.type = 'button';

  // work out where the seat goes inside the map
  seat.style.left = zone.x + (seatNumber - 1) * seatSpace + 'px';
  seat.style.top = zone.y + rowNumber * seatSpace + 'px';

  if (unavailableSeats.includes(seatId)) {
    // sold seat: grey, and it cannot be clicked
    seat.classList.add('unavailable');
    seat.disabled = true;
    seat.textContent = '\u00d7';
    seat.setAttribute('aria-label', `Seat ${seatId}, already sold`);
  } else {
    // the label is kept in data-label, so cart.js can add ", in your cart" to it
    seat.dataset.label = `Seat ${seatId}, ${zone.name}, ${zone.price} AZN`;
    seat.setAttribute('aria-label', seat.dataset.label);
    seat.addEventListener('click', function () {
      inspectSeat(seat, seatId, zone, rowNumber, seatNumber);
    });
  }

  venueMap.appendChild(seat);
}

// goes through every zone, every row and every seat
function drawVenue() {
  for (const zone of zones) {
    for (let row = 0; row < zone.rows; row++) {
      for (let seatNumber = 1; seatNumber <= zone.seatsPerRow; seatNumber++) {
        drawSeat(zone, row, seatNumber);
      }
    }
  }
}

drawVenue();

// Draws every seat on the map, using the zones from venue-data.js

const venueMap = document.getElementById('venue-map');

// row letters, so row 0 is A, row 1 is B and so on
const rowLetters = 'ABCDEFGH';

// builds the id for one seat, for example B-D-07
function makeSeatId(zone, rowNumber, seatNumber) {
  let number = seatNumber;
  if (number < 10) {
    number = '0' + number;
  }
  return zone.id + '-' + rowLetters[rowNumber] + '-' + number;
}

// makes one seat button and puts it on the map
function drawSeat(zone, rowNumber, seatNumber) {
  const seat = document.createElement('button');
  const seatId = makeSeatId(zone, rowNumber, seatNumber);

  seat.className = 'seat';
  seat.id = seatId;
  seat.type = 'button';
  seat.setAttribute('aria-label', `Seat ${seatId}, ${zone.name}, ${zone.price} AZN`);

  // work out where the seat goes inside the map
  seat.style.left = zone.x + (seatNumber - 1) * seatSpace + 'px';
  seat.style.top = zone.y + rowNumber * seatSpace + 'px';

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

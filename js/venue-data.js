// Seating data for Terrace Nine.
// Each zone is one block of seats. The map gets drawn from this list.
// x and y are where the top-left corner of the block sits on the map.

// every seat takes up 30 units on the map (24 for the seat, 6 for the gap)
const seatSpace = 30;

const zones = [
  {
    id: 'A',
    name: 'Beanbags',
    price: 9,
    rows: 3,
    seatsPerRow: 10,
    x: 250,
    y: 20
  },
  {
    id: 'B',
    name: 'Deck centre',
    price: 14,
    rows: 8,
    seatsPerRow: 14,
    x: 190,
    y: 150
  },
  {
    id: 'C1',
    name: 'Deck left',
    price: 11,
    rows: 8,
    seatsPerRow: 5,
    x: 10,
    y: 150
  },
  {
    id: 'C2',
    name: 'Deck right',
    price: 11,
    rows: 8,
    seatsPerRow: 5,
    x: 640,
    y: 150
  },
  {
    id: 'D',
    name: 'Sofa lounge',
    price: 22,
    rows: 2,
    seatsPerRow: 8,
    x: 280,
    y: 430
  }
];

// seats that are already sold, written like 'B-D-07' (zone, row letter, seat number)
// we fill this in when the map exists
const unavailableSeats = [];

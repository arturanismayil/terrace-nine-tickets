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
const unavailableSeats = [
  'A-A-03', 'A-B-07', 'A-B-08', 'A-C-02', 'A-C-09',
  'B-A-05', 'B-A-06', 'B-B-10', 'B-C-03', 'B-C-04',
  'B-D-09', 'B-D-10', 'B-E-12', 'B-E-13', 'B-F-02',
  'B-F-09', 'B-G-06', 'B-G-07', 'B-H-04', 'B-H-11',
  'C1-B-02', 'C1-D-04', 'C1-D-05', 'C1-F-01', 'C1-G-03',
  'C2-A-04', 'C2-C-01', 'C2-E-03', 'C2-E-04', 'C2-H-05',
  'D-A-03', 'D-A-04', 'D-B-06'
];

// The cart: add a seat, remove a seat, show the list and the total.
// It also keeps the colours of the seats on the map in step with the cart.

const addButton = document.getElementById('add-to-cart');
const cartMessage = document.getElementById('cart-message');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

// the name the cart is saved under in localStorage
const storageKey = 'terraceNineCart';

// every ticket in the cart looks like { id: 'B-D-07', zone: 'Deck centre', price: 14 }
let cart = [];

// is this seat already in the cart?
function isInCart(seatId) {
  const ticket = cart.find(ticket => ticket.id === seatId);
  return ticket !== undefined;
}

// gives one seat on the map the right colour
// pink if it is in the cart, amber if it is the seat being looked at
function refreshSeat(seatId) {
  const seat = document.getElementById(seatId);

  if (isInCart(seatId)) {
    seat.classList.add('in-cart');
    seat.classList.remove('inspected');
  } else {
    seat.classList.remove('in-cart');
    if (inspectedTicket !== null && inspectedTicket.id === seatId) {
      seat.classList.add('inspected');
    }
  }
}

// shows or hides the Add to cart button for the seat being looked at
function updateAddButton() {
  if (inspectedTicket === null) {
    addButton.hidden = true;
    return;
  }

  addButton.hidden = false;

  if (isInCart(inspectedTicket.id)) {
    addButton.disabled = true;
    addButton.textContent = 'Already in your cart';
  } else {
    addButton.disabled = false;
    addButton.textContent = 'Add to cart';
  }
}

// draws the cart list and the total
function updateCart() {
  cartList.innerHTML = '';

  for (const ticket of cart) {
    const item = document.createElement('li');
    const text = document.createElement('span');
    const removeButton = document.createElement('button');

    text.textContent = `${ticket.id} (${ticket.zone}) ${ticket.price} AZN`;
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
      removeFromCart(ticket.id);
    });

    item.appendChild(text);
    item.appendChild(removeButton);
    cartList.appendChild(item);
  }

  // add up all the prices
  const total = cart.reduce((sum, ticket) => sum + ticket.price, 0);
  cartTotal.textContent = total;

  // the "No tickets yet" text only shows when the cart is empty
  cartMessage.hidden = cart.length > 0;

  updateAddButton();
  saveCart();
}

// saves the cart in the browser, so it is still there after a refresh
function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

// gets the saved seat ids back out of localStorage
// returns an empty list if nothing was saved or the saved text is broken
function readSavedIds() {
  const savedText = localStorage.getItem(storageKey);
  if (savedText === null) {
    return [];
  }

  try {
    const saved = JSON.parse(savedText);
    if (!Array.isArray(saved)) {
      return [];
    }
    return saved.map(ticket => ticket.id);
  } catch (error) {
    return [];
  }
}

// builds a ticket for a saved seat id, using the venue data
// returns null if the seat is not good any more (it does not exist or it was sold)
function makeTicketFromId(seatId) {
  const seat = document.getElementById(seatId);
  if (seat === null || unavailableSeats.includes(seatId)) {
    return null;
  }

  // the zone is the first part of the id, for example 'B' in 'B-D-07'
  const zoneId = seatId.split('-')[0];
  const zone = zones.find(zone => zone.id === zoneId);
  if (zone === undefined) {
    return null;
  }

  return { id: seatId, zone: zone.name, price: zone.price };
}

// puts the saved seats back in the cart and on the map
function loadCart() {
  for (const seatId of readSavedIds()) {
    const ticket = makeTicketFromId(seatId);

    // skip bad seats and seats that are already in the cart twice
    if (ticket !== null && !isInCart(seatId)) {
      cart.push(ticket);
      refreshSeat(seatId);
    }
  }
}

// puts the seat being looked at into the cart
function addToCart() {
  if (inspectedTicket === null) {
    return;
  }

  // the same seat cannot be added twice
  if (isInCart(inspectedTicket.id)) {
    return;
  }

  cart.push(inspectedTicket);
  refreshSeat(inspectedTicket.id);
  updateCart();
}

// takes a seat out of the cart and changes its colour on the map
function removeFromCart(seatId) {
  cart = cart.filter(ticket => ticket.id !== seatId);
  refreshSeat(seatId);
  updateCart();
}

addButton.addEventListener('click', addToCart);

loadCart();
updateCart();

// The cart: add a seat, remove a seat, show the list and the total.
// It also keeps the colours of the seats on the map in step with the cart.

const addButton = document.getElementById('add-to-cart');
const cartMessage = document.getElementById('cart-message');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

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

updateCart();
